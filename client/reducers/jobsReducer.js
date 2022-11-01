import { createSlice } from "@reduxjs/toolkit";
//fetch on load will pull all jobs the current user is involved in- that have foreign key that is their primary key/userID
//each job will look like: 
/* 
_id: {
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
  jobs: {
    //testjob is the job's primary key "_id"
    'testjob': {
      mongoId: 1,
      status: 'applied',
      timestamp: null,
      jobInfo: {
        title: 'Software Engineer',
        company: 'Spotify',
        salary: 1000000,
        benefits: ['health insurance', 'dental insurance', 'unlimited PTO'],
        location: 'Remote',
        skills: ['JavaScript', 'HTML', 'CSS'],
        link: 'spotify.com',
        contact: [
          {
            name: 'John Smith',
            phone: '7738675309',
            email: 'johnsmith@spotify.com',
            notes: 'balding',
            last_contacted: 'Nov 1 2022, 09:52:32'
          }
        ],
        notes: 'Likes cheese',
        interview: [
          {
            notes: 'at office',
            type: 'behavioral',
            status: 'pass'
          }
        ]
      }
    }
  }
}

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    //updates full job state
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },

/*     //to set full job info, need primary key of job being changes and the entire new job info - probably won't be used
    //for testing purposes only
    setJobInfo: (state, action) => {
      state.jobs[action.payload._id].jobInfo = action.payload.jobInfo;
    }, */

    //action payload status should always be a string
    setJobStatus: (state, action) => {
      state.jobs[action.payload._id].status = action.payload.status;
      state.jobs[action.payload._id].timestamp = action.payload.timestamp;
    },

    //to set salary, need the primary key of the job being changed and the new salary (integer) from the form input
    setJobSalary: (state, action) => {
      state.jobs[action.payload._id].jobInfo.salary = action.payload.salary;
      state.jobs[action.payload._id].timestamp = action.payload.timestamp;
    },

    //to set benefits, need primary key of job being changed and array of added benefits
    setJobBenefits: (state, action) => {
      state.jobs[action.payload._id].jobInfo.benefits = [...state.jobs[action.payload._id].jobInfo.benefits, ...action.payload.benefits]
    }
  }
});

export const { setJobs, setJobStatus, setJobSalary, setJobBenefits } = jobsSlice.actions;

export default jobsSlice.reducer;