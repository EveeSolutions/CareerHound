import { createSlice } from "@reduxjs/toolkit";
//fetch on load will pull all jobs the current user is involved in- that have foreign key that is their primary key/userID
//each job will look like: 
/* 
{
  primaryKey: integer,
  info: object containing mongo document
  status: string,
  timestamp: time/date
  userID: integer
}
 */
const initialState = { 
  //jobs is an object with keys of job 
  jobs: {}
}

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setJobInfo: (state, action) => {
      state.jobs
    }
  }
})