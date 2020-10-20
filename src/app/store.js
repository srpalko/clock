import { configureStore } from '@reduxjs/toolkit';
import clockReducer from '../features/counter/clockSlice';

export default configureStore({
  reducer: {
    clock: clockReducer,
  },
});
