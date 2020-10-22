import { createSlice } from '@reduxjs/toolkit';

export const clockSlice = createSlice({
  name: 'clock',
  initialState: {
    sessionLegnth: 25,
    breakLegnth: 5,
    currentInterval: 'session',
    timer: 0,
    display: 'All ready chief!',
  },
  reducers: {
    incrementSession: state => {
      if (state.sessionLegnth < 60) {
        state.sessionLegnth += 1;
      }  
    },
    decrementSession: state => {
      if (state.sessionLegnth > 0) {
        state.sessionLegnth -= 1;
      }
    },
    incrementBreak: state => {
      if (state.breakLegnth < 60) {
        state.breakLegnth += 1;
      }
    },
    decrementBreak: state => {
      if (state.breakLegnth > 0) {
        state.breakLegnth -= 1;
      }
    },
    reset: state => {
      state.sessionLegnth = 25;
      state.breakLegnth = 5;
      state.currentInterval = 'session';
      state.timer = 25;
    },
    startTimer: state => {
      state.timer = state.sessionLegnth * 60;
    },
    runTimer: state => {
      if (state.currentInterval === 'session') {
        state.timer -= 1;
        state.display = 'Work!  ' + timeFormatter(state.timer);
        if (state.timer === 0) {
          state.currentInterval = 'break';
          state.timer = state.breakLegnth * 60;
        }
      } else if (state.currentInterval === 'break') {
        state.timer -= 1;
        state.display = 'Take a break!  ' + timeFormatter(state.timer);
        if (state.timer === 0) {
          state.currentInterval = 'session';
          state.timer = state.sessionLegnth * 60;
        }
      }
    },
  },
});

export const { incrementSession, decrementSession, incrementBreak, decrementBreak, reset, runTimer, startTimer } = clockSlice.actions;

function timeFormatter(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds - minutes * 60;
  seconds < 10 ? seconds = '0' + seconds.toString() : seconds = seconds;
  return minutes + ':' + seconds;
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const countdown = () => dispatch => {
  dispatch(startTimer());
  setInterval(() => {
    dispatch(runTimer());
  }, 1000);
};

export const stop = () => {
  clearInterval(countdown);
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
//export const selectCount = state => state.counter.value;
export const selectSessionLegnth = state => state.clock.sessionLegnth;
export const selectBreakLegnth = state => state.clock.breakLegnth;
export const selectDisplay = state => state.clock.display;

export default clockSlice.reducer;
