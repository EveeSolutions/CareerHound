const mongoConnection = require('../models/mongoConnection');
const { Job, Interview, Contact } = require('../models/jobSchemaMongo'); // Mongo DB

const jobController = {};

// Create Job
jobController.createJob = (req, res, next) => {
  // destructure req.body
  const { title, company, salary, benefits, location, skills, link, contact, jobNotes, interview } = req.body;
  // create mongo document based off of req.body
  Job.create({ title: title, company: company, salary: salary, benefits: benefits, location: location, skills: skills, link: link, contact: contact, notes: jobNotes, interview: interview},
    (err, jobs) => {
      if (err) {
        return next({
          log: 'Job document creation failure',
          status: 400,
          message: { err: 'Job document not created' },
        });
      } else {
        const { interviewNotes, type, status, resumeVersion } = interview;
        Interview.create({ notes: interviewNotes, type: type, status: status, resumeVersion: resumeVersion }, 
          (err, interviews) => {
            if (err) {
              return next({
                log: 'Interview document creation failure',
                status: 400,
                message: { err: 'Interview document not created' },
              });
            } else {
              res.locals.interviews = interviews;
            }
        })
        const { name, phone, email, contactNotes, lastContact } = contact;
        Contact.create({ name: name, phone: phone, email: email, notes: contactNotes, lastContact: lastContact }, 
          (err, contacts) => {
            if (err) {
              return next({
                log: 'Contact document creation failure',
                status: 400,
                message: { err: 'Contact document not created' },
              });
            } else {
              res.locals.contacts = contacts;
            }
        })
        res.locals.jobs = jobs;
        console.log('at end of createJob: jobs, interviews, contacts => ', res.locals.jobs, res.locals.interviews, res.locals.contacts);
        return next();
      }
  })
};

//Get all jobs -> will be passed a req.body.status that has an array of all status
    //Need to merge the status with the job before returning to front end
jobController.getAll = async (req, res, next) => {
await Jobs.find()
.then((data) => {
  res.locals.jobs = data; //I don't recall what the returned data will look like so we may need to add a property to access it
  return next()
})
  .catch((err) => {
    return next({
      log: `Error occurred in jobController getAll: ${err}`,
      message: {err: `An error occurred when retreiving all jobs from database. See jobController.getAll`}
    })
    }
  )
}

// //Merge status and jobs
// jobController.merge = (req, res, next) => {
//   //merge res.locals.jobs and res.locals.status so
//   for(job in res.locals.jobs) {
//     //Match status record with jobs record and add the status to jobs before returning
//   }
//   //a status is added to each job object in the array
//   //based on ID. Note that both are nested objects
// }

// //Update a job
// jobController.updateJob = () => {
//   //Locates a specific job in mongoDB and updates it
//   //returns updated job on res.locals.job (note - not plural)
// }

// //Delete a job
// jobController.deleteJob = () => {
//   //Locates and deletes job from MongoDB
//   //Return deleted job to res.locals.job (note - not plural)
// }

module.exports = jobController;
