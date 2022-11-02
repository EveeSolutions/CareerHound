import { createSlice } from '@reduxjs/toolkit';
// fetch on load will pull all jobs the current user is involved in- that have foreign key that is their primary key/userID
// each job will look like:
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
  // jobs is an object with keys of jobprimarykey
  nextId: 2,
  jobs: {
    // testjob is the job's primary key "_id"
    1: {
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
        contact: {
          name: 'John Smith',
          phone: '7738675309',
          email: 'johnsmith@spotify.com',
          notes: 'balding',
          lastContact: 'Nov 1 2022, 09:52:32',
        },
        notes: 'Likes cheese',
        interview: {
          date: 'Nov 11 2022',
          notes: 'at office',
          type: 'behavioral',
          status: 'pass',
        },
      },
    },
  },
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    // updates full job state
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },

    addJob: (state, action) => {
      state.jobs[state.nextId] = action.payload;
      state.nextId += 1;
    },

    /*     //to set full job info, need primary key of job being changes and the entire new job info - probably won't be used
    //for testing purposes only
    setJobInfo: (state, action) => {
      state.jobs[action.payload._id].jobInfo = action.payload.jobInfo;
    }, */

    // action payload status should always be a string
    setJobStatus: (state, action) => {
      state.jobs[action.payload._id].status = action.payload.status;
      // state.jobs[action.payload._id].timestamp = action.payload.timestamp;
    },

    setJobTitle: (state, action) => {
      state.jobs[action.payload._id].jobInfo.title = action.payload.title;
    },

    setJobCompany: (state, action) => {
      state.jobs[action.payload._id].jobInfo.company = action.payload.company;
    },

    // to set salary, need the primary key of the job being changed and the new salary (integer) from the form input in action.payload.salary
    setJobSalary: (state, action) => {
      state.jobs[action.payload._id].jobInfo.salary = action.payload.salary;
    },

    // to add benefits, need primary key of job being changed and array of added benefits in action.payload.benefits
    // also should work when benefits array starts off empty
    addJobBenefits: (state, action) => {
      state.jobs[action.payload._id].jobInfo.benefits = [
        ...state.jobs[action.payload._id].jobInfo.benefits,
        ...action.payload.benefits,
      ];
    },

    // to clear benefits in case you want to remove a previously added benefit
    clearJobBenefits: (state, action) => {
      state.jobs[action.payload._id].jobInfo.benefits = [];
    },

    setJobLocation: (state, action) => {
      state.jobs[action.payload._id].jobInfo.location = action.payload.location;
    },

    setJobSkills: (state, action) => {
      state.jobs[action.payload._id].jobInfo.skills = action.payload.skills;
    },

    setJobLink: (state, action) => {
      state.jobs[action.payload._id].jobInfo.link = action.payload.link;
    },

    // can set contact by having primary key and full new contact object.
    setJobContact: (state, action) => {
      state.jobs[action.payload._id].jobInfo.contact = action.payload.contact;
    },

    // modular reducer, will change the state contact property specified in payload property key, and change it to payload.value
    editJobContact: (state, action) => {
      state.jobs[action.payload._id].jobInfo.contact[action.payload.property] =
        action.payload.value;
    },

    setJobNotes: (state, action) => {
      state.jobs[action.payload._id].jobInfo.notes = action.payload.notes;
    },

    editJobInterview: (state, action) => {
      state.jobs[action.payload._id].jobInfo.interview[
        action.payload.property
      ] = action.payload.value;
    },
  },
});

export const {
  setJobs,
  addJob,
  setJobStatus,
  setJobTitle,
  setJobCompany,
  setJobSalary,
  addJobBenefits,
  setJobLocation,
  setJobSkills,
  setJobLink,
  clearJobBenefits,
  setJobContact,
  editJobContact,
  setJobNotes,
  editJobInterview,
} = jobsSlice.actions;

export default jobsSlice.reducer;
