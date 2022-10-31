import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    //make fetch request here to fill initial redux store at app render and update whenever state is changed
  }, [])

  return (
    <div>App</div>
  )
}

export default App;