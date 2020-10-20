import { createSlice } from '@reduxjs/toolkit';

export const clockSlice = createSlice({
  name: 'clock',
  initialState: {
    sessionLegnth: 25,
    breakLegnth: 5,
    currentInterval: 'session',
    timer: 25,
  },
  reducers: {
    incrementSession: state => {
      state.sessionLegnth += 1;
    },
    decrementSession: state => {
      state.sessionLegnth -= 1;
    },
    incrementBreak: state => {
      state.breakLegnth += 1;
    },
    decrementBreak: state => {
      state.breakLegnth -= 1;
    },
    reset: state => {
      state.sessionLegnth = 25;
      state.breakLegnth = 5;
      state.currentInterval = 'session';
      state.timer = 25;
    },
    runTimer: state => {
      state.timer -= 1;
    },
  },
});

export const { incrementSession, decrementSession, incrementBreak, decrementBreak, reset, runTimer } = clockSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const countdown = () => dispatch => {
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
export const selectTimer = state => state.clock.timer;

export default clockSlice.reducer;
