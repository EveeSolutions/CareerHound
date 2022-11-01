import React from 'react'
import StatusContainer from './component/StatusContainer.jsx'

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    //make fetch request here to fill initial redux store at app render and update whenever state is changed
  }, [])

  return (
    <div>
      <h1>CareerHound</h1>
      <StatusContainer />
    </div>  
  )
}

export default App;

