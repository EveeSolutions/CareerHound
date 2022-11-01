import React, { useState } from 'react'
import '../assets/styles.css'

function JobCardForm() {

    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);

        // *a stand in for actual API call to BE
        setTimeout(() => {
            setSubmitting(false);
        }, 3000)
    }
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
                    <input name ='job title' required/>
                </label>
                <label>
                    <p>Company:</p>
                    <input name ='company' required/>
                </label>
                {/* <label>
                    <p>Location:</p>
                    <input name ='location' />
                </label>
                <label>
                    <p>Link:</p>
                    <input name ='link' />
                </label>
                <label>
                    <p>Skills:</p>
                    <input name ='skills' />
                </label>
                <label>
                    <p>Salary:</p>
                    <input name ='salary' />
                </label>
                <label>
                    <p>Benefits:</p>
                    <input name ='benefits' />
                </label> */}
            </fieldset>
            {/* <fieldset>
                <legend>Contacts</legend>
                <label>
                    <p>Contact Name:</p>
                    <input name ='contact name' />
                </label>
                <label>
                    <p>Email:</p>
                    <input name ='email' />
                </label>
                <label>
                    <p>Last Contacted:</p>
                    <input name ='Last Contacted' />
                </label>
                <p><label for="contactNotes">Contact Notes:</label></p>
                <textarea id="contactNotes" name="contactNotes" rows="4" cols="50"></textarea>
            </fieldset> */}
            {/* <fieldset>
                <legend>Interview</legend>
                <label>
                    <p>Interview Date:</p>
                    <input name ='Interview Date' />
                </label>
                <label>
                    <p>Interview Type:</p>
                    <select className = 'dropdown' list name= 'select list' id='select list'>
                        <option value = 'option 1'>Phone</option>
                        <option value = 'option 2'>Technical</option>
                        <option value = 'option 3'>Behavioral</option>
                        <option value = 'option 4'>Take Home</option>
                     </select>
                </label>
                <p><label for="interviewNotes">Interview Notes:</label></p>
                <textarea id="interviewNotes" name="interviewNotes" rows="4" cols="50"></textarea>
            </fieldset>
            <fieldset>
                <legend>Notes</legend>
                <textarea id="generalNotes" name="generalNotes" rows="4" cols="50"></textarea>
            </fieldset> */}
            <button type='submit'>Submit</button>
        </form>
    </div> 
   )
    
} 


export default JobCardForm;