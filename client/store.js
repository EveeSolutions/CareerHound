import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './reducers/jobsReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    jobs: jobsReducer,
  },
});
