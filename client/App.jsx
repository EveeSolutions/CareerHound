import React, { useEffect } from 'react'
import StatusContainer from './component/StatusContainer.jsx'
import { useSelector, useDispatch } from 'react-redux'

function App() { 
  const jobs = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  console.log(jobs)
  
/* 
  useEffect(() => {
    //make fetch request here to fill initial redux store at app render and update whenever state is changed
  }, [])
 */
  return (
    <div>
      <h1>CareerHound</h1>
      <StatusContainer />
    </div>  
  )
}

export default App;

