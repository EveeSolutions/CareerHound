import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StatusContainer from './component/StatusContainer';
import Modal from './component/Modal';
// import { setJobSalary, setJobStatus, setJobBenefits } from './reducers/jobsReducer';

function App() {
  const [show, setShow] = useState(false);
  const jobs = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  console.log(jobs);

  useEffect(() => {
    // make fetch request here to fill initial redux store at app render and update whenever state is changed
    // console.log('app jobs', jobs);
  }, {});

  return (
    <div>
      <h1>CareerHound</h1>
      {/*       <button onClick={() => dispatch(setJobInfo({_id: 'testjob', jobInfo: {
        title: 'Test',
        company: 'Test',
        salary: 1000000,
        benefits: ['Test', 'dental insurance', 'unlimited PTO'],
        location: 'Test',
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
      }}))}>Set Job Info</button> */}
      {/*       <button onClick={() => dispatch(setJobSalary({_id: 'testjob', salary: 99999, timestamp: Date.now()}))}>Set Salary</button>
      <button onClick={() => dispatch(setJobStatus({_id: 'testjob', status: 'interviewing', timestamp: Date.now()}))}>Set Status</button>
      <button onClick={() => dispatch(addJobBenefits({_id: 'testjob', benefits: ['test benefit 1', 'test benefit 2'], timestamp: Date.now()}))}>Add Benefits</button> */}
      <StatusContainer />
      <button type="button" onClick={() => setShow(true)}>
        Add New Job
      </button>
      <Modal onClose={() => setShow(false)} show={show} />
    </div>
  );
}

export default App;
