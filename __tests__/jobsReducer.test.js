
import subject from '../client/reducers/jobsReducer';

describe('Jobs reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      nextId: 1,
      jobs: {},
    };
  });

  describe('unrecognized action types', () => {
    it('should return the original without any duplication', () => {
      const action = { type: 'aajdkfjhsldf' };
      expect(subject(state, action)).toBe(state);
    });
  });

});