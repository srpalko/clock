/* This is the slice of the store dealing with the state for the clock functionality. In this case it is the only slice for the app. */
import { createSlice } from '@reduxjs/toolkit';

// provide a convenient way of setting defaults
const defaultTimes = { session: 25, break: 5 };

// create state and actions for the clock
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
    // increment and decrement the session and break timers.
    // limit settings between 0 and 60, and don't allow changes while timer is running.
    incrementSession: state => {
      if (state.sessionLength < 60 && state.reset) {
        state.sessionLength += 1;
        state.display = timeFormatter(state.sessionLength * 60);
      }
    },
    decrementSession: state => {
      if (state.sessionLength > 1 && state.reset) {
        state.sessionLength -= 1;
        state.display = timeFormatter(state.sessionLength * 60);
      }
    },
    incrementBreak: state => {
      if (state.breakLength < 60 && state.reset) {
        state.breakLength += 1;
      }
    },
    decrementBreak: state => {
      if (state.breakLength > 1 && state.reset) {
        state.breakLength -= 1;
      }
    },
    // reset to default state
    reset: state => {
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
    // extra reducer, not currently in use
    startTimer: state => {
      state.timer = state.sessionLength * 60;
      state.running = true;
    },
    // starts timer after a reset
    nextStart: state => {
      state.reset = false;
      state.timer = state.sessionLength * 60;
      state.running = true;
    },
    // starts timer after an interval has ended
    startNextInterval: state => {
      state.running = true;
      state.alarmStatus = 'reset'; // this is normally 'stop'.
      state.alarmPlaying = false;
    },
    // called by countdown() at set intervals to run the clock. 
    // when timer reaches 0, start alarm and change interval.
    runTimer: state => {
      if (state.running === true && state.reset === false) {
        if (state.currentInterval === 'session') {
          state.timer -= 1;
          state.display = timeFormatter(state.timer);
          if (state.timer === 0) {
            state.alarmStatus = 'play';
            state.alarmPlaying = true;
            state.currentInterval = 'break';
            state.running = false;
          }
        } else if (state.currentInterval === 'break') {
          state.timer -= 1;
          state.display = timeFormatter(state.timer);
          if (state.timer === 0) {
            state.alarmStatus = 'play';
            state.alarmPlaying = true;
            state.currentInterval = 'session';
            state.running = false;
          }
        }
      }
    },
    stopTimer: state => {
      state.running = false;
    },
    // set up the next interval
    setNextInterval: state => {
      if (state.currentInterval === 'break') {
        state.timer = state.breakLength * 60;
        state.display = timeFormatter(state.timer);
      } else if (state.currentInterval === 'session') {
        state.timer = state.sessionLength * 60;
        state.display = timeFormatter(state.timer);
      }
    },
    // indicate that countdown is running
    setStart: state => {
      state.started = true;
    },
    // start clock after pausing
    restart: state => {
      state.running = true;
    }
  }
});

export const { incrementSession, decrementSession, incrementBreak,
  decrementBreak, reset, runTimer, startTimer, stopTimer,
  startNextInterval, playAlarm, setNextInterval, nextStart, setStart, restart } = clockSlice.actions;


// Takes seconds as integer and returns '00:00' display as string
function timeFormatter(timeInSeconds) {
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

// Make timer run at regular interval (1 second)
// This is currently set to 100ms so that testing doesn't take all day.
export const countdown = () => dispatch => {
  setInterval(() => {
    dispatch(runTimer());
  }, 1000);
};

// Delay and then set up and start the next interval
export const setUpNextInterval = () => dispatch => {
  setTimeout(() => {
    dispatch(setNextInterval());
  }, 500);
  setTimeout(() => {
    dispatch(startNextInterval());
  }, 6000);
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
// prepare reducer for the store
export default clockSlice.reducer;
