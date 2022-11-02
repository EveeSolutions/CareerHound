import React, { useState, useEffect } from 'react'
import '../assets/styles.css';
import { useSelector, useDispatch } from 'react-redux';

import { addJob } from '../reducers/jobsReducer.js';

    // Custom hook for handling input boxes
    // saves us from creating onChange handlers for them individually
const useInput = init => {
    const [ value, setValue ] = useState(init);
    const onChange = e => {
      setValue(e.target.value);

    };
    // return the value with the onChange function instead of setValue function
    return [ value, onChange ];
  };

function JobCardForm() {

    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);

        // *a stand in for actual API call to BE
        setTimeout(() => {
            setSubmitting(false);
        }, 3000)
    };

    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const [title, titleOnChange] = useInput('');
    const [company, companyOnChange] = useInput('');
    const [location, locationOnChange] = useInput('');
    const [link, linkOnChange] = useInput('');
    const [skills, skillsOnChange] = useInput('');
    const [salary, salaryOnChange] = useInput('');
    const [benefits, benefitsOnChange] = useInput('');
    const [contactName, contactNameOnChange] = useInput('');
    const [email, emailOnChange] = useInput('');
    const [lastContacted, lastContactedOnChange] = useInput('');
    const [interviewDate, interviewDateOnChange] = useInput('');
    const [interviewType, interviewTypeOnChange] = useInput('phone');
    const [interviewNotes, interviewNotesOnChange] = useInput('');
    const [interviewStatus, interviewStatusOnChange] = useInput('');
    const [generalNotes, generalNotesOnChange] = useInput('');

    useEffect(() => {
        console.log('jobForm jobs', state.jobs);
    }, {});


   return (
    <div className='jobCardForm'>
        <h3>Job Card</h3>
        {submitting &&
          <div>Good work, keep it up! </div>
        }
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Job Basics</legend>
                <label>
                    <p>Job Title:</p>
                    <input name='job_title' value={title} onChange={titleOnChange} required/>
                </label>
                <label>
                    <p>Company:</p>
                    <input name ='company' value={company} onChange={companyOnChange} required/>
                </label>
                 <label>
                    <p>Location:</p>
                    <input name ='location' value={location} onChange={locationOnChange} />
                </label>
                <label>
                    <p>Link:</p>
                    <input name ='link' value={link} onChange={linkOnChange}/>
                </label>
                <label>
                    <p>Skills:</p>
                    <input name ='skills' value={skills} onChange={skillsOnChange} />
                </label>
                <label>
                    <p>Salary:</p>
                    <input name ='salary' value={salary} onChange={salaryOnChange}/>
                </label>
                <label>
                    <p>Benefits:</p>
                    <input name ='benefits' value={benefits} onChange={benefitsOnChange}/>
                </label> 
            </fieldset>
            <fieldset>
                <legend>Contacts</legend>
                <label>
                    <p>Contact Name:</p>
                    <input name ='contact name' value={contactName} onChange={contactNameOnChange} />
                </label>
                <label>
                    <p>Email:</p>
                    <input name ='email' value={email} onChange={emailOnChange}/>
                </label>
                <label>
                    <p>Last Contacted:</p>
                    <input name ='Last Contacted' value={lastContacted} onChange={lastContactedOnChange}/>
                </label>
                <p><label for="contactNotes">Contact Notes:</label></p>
                <textarea id="contactNotes" name="contactNotes" rows="4" cols="50"></textarea>
            </fieldset>
            <fieldset>
                <legend>Interview</legend>
                <label>
                    <p>Interview Date:</p>
                    <input name ='interviewDate' value={interviewDate} onChange={interviewDateOnChange} />
                </label>
                <label>
                    <p>Interview Type:</p>
                    <select className = 'dropdown' list name='interviewType' id='select list' value={interviewType} onChange={interviewTypeOnChange} >
                        <option value = 'phone'>Phone</option>
                        <option value = 'technical'>Technical</option>
                        <option value = 'behavioral'>Behavioral</option>
                        <option value = 'takeHome'>Take Home</option>
                     </select>
                </label>
                <p><label for="interviewNotes">Interview Notes:</label></p>
                <textarea id="interviewNotes" name="interviewNotes" rows="4" cols="50" value={interviewNotes} onChange={interviewNotesOnChange}></textarea>
            </fieldset>
            <fieldset>
                <legend>Notes</legend>
                <textarea id="generalNotes" name="generalNotes" rows="4" cols="50" value={generalNotes} onChange={generalNotesOnChange}></textarea>
            </fieldset>
            <button type='submit'
            onClick={() => {
                dispatch(addJob({
                    mongoId: 2,
                    status: status,
                    timestamp: null,
                    jobInfo: {
                      title: title,
                      company: company,
                      salary: salary,
                      benefits: benefits,
                      location: location,
                      skills: skills,
                      link: link,
                      contact:
                      {
                        name: 'John Smith',
                        phone: '7738675309',
                        email: 'johnsmith@spotify.com',
                        notes: 'balding',
                        lastContact: 'Nov 1 2022, 09:52:32'
                      },
                      notes: generalNotes,
                      interview:
                      {
                        date: interviewDate,
                        notes: interviewNotes,
                        type: interviewType,
                        status: 'pass'
                      },
                    }
                  }))}
            }>
            Submit
            </button>
        </form>
    </div> 
   )
    
} 


export default JobCardForm;