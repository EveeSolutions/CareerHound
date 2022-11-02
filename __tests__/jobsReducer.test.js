import subject, {
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
  editJobInterview
} from '../client/reducers/jobsReducer';

import store from '../client/store';

describe('Jobs reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      nextId: 0,
      jobs: {},
    };
  });

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(subject(state, { type: undefined })).toEqual(state);
    });
  });

  describe('unrecognized action types', () => {
    it('should return the original without any duplication', () => {
      const action = { type: 'aajdkfjhsldf' };
      expect(subject(state, action)).toBe(state);
    });
  });

  describe('addJob', () => {
    const action = {
      type: 'addJob',
      payload: {
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
    };

    it('adds a job to state', () => {
      const result = addJob(state, action);
      console.log('result', result);
      expect(result).toEqual({
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
      });
    });

  });

});