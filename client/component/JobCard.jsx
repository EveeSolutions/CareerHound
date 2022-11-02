import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// function expandedJobCard(props) {
//     if (!props.expand) {
//         return null
//     }
// }

function JobCard() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="JobCard">
      <ul className="miniCard">
        <li className="miniDetail">Job Title: {}</li>
        <li className="miniDetail">Company: {}</li>
      </ul>
      <button>+</button>
    </div>
  );
}

export default JobCard;