/* This is the slice of the store dealing with the state for the clock functionality. In this case it is the only slice for the app. */
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const defaultTimes = {session: 25, break: 5};


export const clockSlice = createSlice({
  name: 'clock',
  initialState: {
    sessionLegnth: defaultTimes.session,
    breakLegnth: defaultTimes.break,
    currentInterval: 'session',
    timer: 0,
    display: timeFormatter(defaultTimes.session * 60),
    running: false,
    started: false,
    setIntervalRunning: false,
    reset: false,
  },
  reducers: {
    incrementSession: state => {
      if (state.sessionLegnth < 60) {
        state.sessionLegnth += 1;
        state.display = timeFormatter(state.sessionLegnth * 60);
      }  
    },
    decrementSession: state => {
      if (state.sessionLegnth > 1) {
        state.sessionLegnth -= 1;
        state.display = timeFormatter(state.sessionLegnth * 60);
      }
    },
    incrementBreak: state => {
      if (state.breakLegnth < 60) {
        state.breakLegnth += 1;
      }
    },
    decrementBreak: state => {
      if (state.breakLegnth > 1) {
        state.breakLegnth -= 1;
      }
    },
    reset: state => {
      state.sessionLegnth = defaultTimes.session;
      state.breakLegnth = defaultTimes.break;
      state.currentInterval = 'session';
      state.timer = 0;
      state.display = timeFormatter(defaultTimes.session * 60);
      state.running = false;
      state.reset = true;
    },
    startTimer: state => {
      state.timer = state.sessionLegnth * 60;
      state.running = true;
      state.started = true;
      state.setIntervalRunning = true;
    },
    restart: state => {
      if (state.reset === true) {
        state.timer = state.sessionLegnth * 60;
        state.running = true;
      } else {
      state.running = true;
      }
    },
    runTimer: state => {
      if (state.running === true) {
        if (state.currentInterval === 'session') {
          state.timer -= 1;
          state.display = timeFormatter(state.timer);
          if (state.timer === 0) {
            state.currentInterval = 'break';
            state.timer = state.breakLegnth * 60;
          }
        } else if (state.currentInterval === 'break') {
          state.timer -= 1;
          state.display = timeFormatter(state.timer);
          if (state.timer === 0) {
            state.currentInterval = 'session';
            state.timer = state.sessionLegnth * 60;
          }
        }
      }
    },
    stopTimer: state => {
      state.running = false;
    }
  },
});



export const { incrementSession, decrementSession, incrementBreak, decrementBreak, reset, runTimer, startTimer, stopTimer, restart } = clockSlice.actions;



function timeFormatter(timeInSeconds) {
  //converts total seconds to minutes + seconds for display.
  const minutes = Math.floor(timeInSeconds / 60);
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
    dispatch(startTimer());
    setInterval(() => {
      dispatch(runTimer());
    }, 1000);
};


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
//export const selectCount = state => state.counter.value;
export const selectSessionLegnth = state => state.clock.sessionLegnth;
export const selectBreakLegnth = state => state.clock.breakLegnth;
export const selectDisplay = state => state.clock.display;
export const selectRunning = state => state.clock.running;
export const selectStarted = state => state.clock.started;
export const selectSetIntervalRunning = state => state.clock.setIntervalRunning;
export const selectCurrentInterval = state => state.clock.currentInterval;

export default clockSlice.reducer;
