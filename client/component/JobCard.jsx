import React from 'react'

// function expandedJobCard(props) {
//     if (!props.expand) {
//         return null
//     }
// }

function JobCard() {

  return (

    <div className='JobCard'>
        <ul className='miniCard'>
            <li className='miniDetail'>Job Title: {}</li>
            <li className='miniDetail'>Company: {}</li>
        </ul>
        <button>+</button>
    </div>

  )

}


export default JobCard;