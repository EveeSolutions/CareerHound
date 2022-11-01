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
  try {
    const jobs = await Job.find({});
    res.locals.jobs = jobs;
    return next();
  } catch (err) {
    return next({
      log: `Error occurred in jobController getAll: ${err}`,
      message: {err: `An error occurred when retreiving all jobs from database. See jobController.getAll`}
    })
  }
}

// //Merge status and jobs
jobController.merge = (req, res, next) => {
  try {
    //merge res.locals.jobs and res.locals.status to add status to corresponding job in res.locals.job
    for(let job in res.locals.jobs) {
      // find corresponding job in res.locals.status
      const matching = res.locals.status.filter(el => el.jobid === job._id)
      // add status from res.locals.status to job in res.locals.jobs
      job.status = matching.status;
    }
    console.log('res.locals.jobs in merge - should have statuses', res.locals.jobs);
    return next();
  } catch (err) {
    return next({
      log: `Error occurred in jobController merge: ${err}`,
      message: {err: `An error occurred when merging jobs and statuses. See jobController.merge`}
    })
  }
}

// //Update a job
jobController.updateJob = (req, res, next) => {
  // destructure req.body
  const { title, company, salary, benefits, location, skills, link, contact, jobNotes, interview } = req.body;
  // Locates a specific job in mongoDB and updates it
  Job.findOneAndUpdate({_id: req.params._id}, { title: title, company: company, salary: salary, benefits: benefits, location: location, skills: skills, link: link, contact: contact, notes: jobNotes, interview: interview}, { new: true},
    (err, job) => {
      if (err) {
        return next({
          log: 'Job document change failure',
          status: 400,
          message: { err: 'Job document not changed' },
        });
      } else {
        const { interviewNotes, type, status, resumeVersion } = interview;
        // probably not right yet - how do I access the interview doc?
        Interview.findOneAndUpdate({_id: req.params.interview._id}, { notes: interviewNotes, type: type, status: status, resumeVersion: resumeVersion }, { new: true},
          (err, interview) => {
            if (err) {
              return next({
                log: 'Interview document change failure',
                status: 400,
                message: { err: 'Interview document not changed' },
              });
            } else {
              res.locals.interview = interview;
            }
        });
      const { name, phone, email, contactNotes, lastContact } = contact;
      // probably not right yet - how do I access the contact doc?
      Contact.findOneAndUpdate({_id: req.params.contact._id}, { name: name, phone: phone, email: email, notes: contactNotes, lastContact: lastContact }, { new: true},
        (err, contact) => {
          if (err) {
            return next({
              log: 'Contact document change failure',
              status: 400,
              message: { err: 'Contact document not changed' },
            });
          } else {
            res.locals.contact = contact;
          }
        });
      //returns updated job on res.locals.job (note - not plural)
      res.locals.job = job;
      console.log('at end of updateJob: jobs, interviews, contacts => ', res.locals.job, res.locals.interview, res.locals.contact);
      return next();
    };
  });
};

// //Delete a job
jobController.deleteJob = (req, res, next) => {
  //Locates and deletes job from MongoDB
  // Locates a specific job in mongoDB and updates it
  Job.findOneAndDelete({ _id: req.params._id},
    (err, job) => {
      if (err) {
        return next({
          log: 'Job document deletion failure',
          status: 400,
          message: { err: 'Job document not deleted' },
        });
      } else {
        Interview.findOneAndDelete({ /** How do I access this? */ }, 
          (err, interview) => {
            if (err) {
              return next({
                log: 'Interview document deletion failure',
                status: 400,
                message: { err: 'Interview document not deleted' },
              });
            } else {
              res.locals.interview = interview;
            }
        });
      Contact.findOneAndUpdate({ /** How do I access this? */ }, 
        (err, contact) => {
          if (err) {
            return next({
              log: 'Contact document deletion failure',
              status: 400,
              message: { err: 'Contact document not deleted' },
            });
          } else {
            res.locals.contact = contact;
          }
        });
      return next();
    };
  });
}

module.exports = jobController;
