/* This is the slice of the store dealing with the state for the clock functionality. In this case it is the only slice for the app. */
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const defaultTimes = {session: 25, break: 5};


export const clockSlice = createSlice({
  name: 'clock',
  initialState: {
    sessionLength: defaultTimes.session,
    breakLength: defaultTimes.break,
    currentInterval: 'session',
    timer: defaultTimes.session,
    display: timeFormatter(defaultTimes.session * 60),
    running: false,
    started: false,
    reset: true,
    alarmPlaying: false,
    alarmPosition: 0,
    alarmStatus: '',
  },
  reducers: {
    incrementSession: state => {
      if (state.sessionLength < 60) {
        state.sessionLength += 1;
        state.display = timeFormatter(state.sessionLength * 60);
      }  
    },
    decrementSession: state => {
      if (state.sessionLength > 1) {
        state.sessionLength -= 1;
        state.display = timeFormatter(state.sessionLength * 60);
      }
    },
    incrementBreak: state => {
      if (state.breakLength < 60) {
        state.breakLength += 1;
      }
    },
    decrementBreak: state => {
      if (state.breakLength > 1) {
        state.breakLength -= 1;
      }
    },
    reset: state => {
      state.alarmPosition = 0;
      state.alarmStatus = 'stop';
      state.alarmPlaying = false;
      state.running = false;
      state.reset = true;
      state.sessionLength = defaultTimes.session;
      state.breakLength = defaultTimes.break;
      state.currentInterval = 'session';
      state.timer = defaultTimes.session;
      state.display = timeFormatter(defaultTimes.session * 60);
      
    },
    startTimer: state => {
      state.timer = state.sessionLength * 60;
      state.running = true;
    },
    nextStart: state => {
      state.reset = false;
      state.timer = state.sessionLength * 60;
      state.running = true;
    },
    startNextInterval: state => {
      state.running = true; 
      state.alarmStatus = 'stop';
    },
    runTimer: state => {
      if (state.running === true && state.reset === false) {
        if (state.currentInterval === 'session') {
          state.timer -= 1;
          state.display = timeFormatter(state.timer);
          if (state.timer === 0) {
            state.alarmStatus = 'play';
            state.running = false;
            state.alarmPlaying = true;
            state.currentInterval = 'break';
          }
        } else if (state.currentInterval === 'break') {
            state.timer -= 1;
            state.display = timeFormatter(state.timer);
            if (state.timer === 0) {
              state.running = false;
              state.alarmPlaying = true;
              state.alarmStatus = 'play';
              state.currentInterval = 'session';
            }
        }
      }
    },
    stopTimer: state => {
      state.running = false;
    },
    setNextInterval: state => {
        state.alarmPlaying = false;
        if (state.currentInterval === 'break') {
          state.timer = state.breakLength * 60;
          state.display = timeFormatter(state.timer);
        } else {
          state.timer = state.sessionLength * 60;
          state.display = timeFormatter(state.timer);
        }
    },
    setStart: state => {
      state.started = true;
    },
    restart: state => {
      state.running = true;
    }
  }
});

export const { incrementSession, decrementSession, incrementBreak, 
              decrementBreak, reset, runTimer, startTimer, stopTimer,
               startNextInterval, playAlarm, setNextInterval, nextStart, setStart, restart } = clockSlice.actions;



function timeFormatter(timeInSeconds) {
  //converts total seconds to minutes + seconds for display.
  let minutes = Math.floor(timeInSeconds / 60);
  if (minutes < 10) {
    minutes = '0' + minutes.toString();
  }
  let seconds = timeInSeconds - minutes * 60;
  if (seconds < 10) {
    seconds = '0' + seconds.toString();
  }
  return minutes + ':' + seconds;
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

//acts as the actual timer, changing the value in state.
export const countdown = () => dispatch => {
    setInterval(() => {
      dispatch(runTimer()); 
    }, 1000);
};

export const zeroAlarm = () => dispatch => {
  setTimeout(() => {
    dispatch(setNextInterval());
  }, 2000);
  setTimeout(() => {
    dispatch(startNextInterval());
  }, 5000);
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
//export const selectCount = state => state.counter.value;
export const selectSessionLength = state => state.clock.sessionLength;
export const selectBreakLength = state => state.clock.breakLength;
export const selectDisplay = state => state.clock.display;
export const selectRunning = state => state.clock.running;
export const selectStarted = state => state.clock.started;
export const selectSetIntervalRunning = state => state.clock.setIntervalRunning;
export const selectCurrentInterval = state => state.clock.currentInterval;
export const selectAlarmPlaying = state => state.clock.alarmPlaying;
export const selectReset = state => state.clock.reset;
export const selectAlarmStatus = state => state.clock.alarmStatus;
export const selectAlarmPosition = state => state.clock.alarmPosition;
export const selectTimer = state => state.clock.timer;

export default clockSlice.reducer;
