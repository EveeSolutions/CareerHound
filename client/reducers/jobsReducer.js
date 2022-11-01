import { createSlice } from "@reduxjs/toolkit";
//fetch on load will pull all jobs the current user is involved in- that have foreign key that is their primary key/userID
//each job will look like: 
/* 
primary job key: {
  mongoID: integer/char,
  info: {
    title:
    company:
    salary:
    benefits: []
    location:
    skills:
    etc.
  }
  status: string,
  timestamp: time/date
  userID: integer
}
 */
const initialState = { 
  //jobs is an object with keys of jobprimarykey 
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