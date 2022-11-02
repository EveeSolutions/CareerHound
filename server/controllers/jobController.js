const mongoConnection = require('../models/mongoConnection');
const { Job, Interview, Contact } = require('../models/jobSchemaMongo'); // Mongo DB

const jobController = {};

// Create Job
jobController.createJob = (req, res, next) => {
  // destructure req.body
  const {
    title,
    company,
    salary,
    benefits,
    location,
    skills,
    link,
    contact,
    jobNotes,
    interview,
  } = req.body;
  // create mongo document based off of req.body
  Job.create(
    {
      title,
      company,
      salary,
      benefits,
      location,
      skills,
      link,
      contact,
      notes: jobNotes,
      interview,
    },
    (err, job) => {
      if (err) {
        console.log(job, err)
        return next({
          log: 'Job document creation failure',
          status: 400,
          message: { err: 'Job document not created' },
        });
      } else {
        // handle edge case that there is no interview information
        if (interview !== undefined) {
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
        }
        // handle edge case that there is no contact information
        if (contact !== undefined) {
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
        }
        res.locals.job = job;
        return next();
      }
    }
  );
};

jobController.getAll = async (req, res, next) => {
    return await Job.find({})
      .then((data) => {
        res.locals.jobs = data;
        // console.log(res.locals.jobs)
        return next()
      })
   .catch ((err)=> {
    return next({
      log: `Error occurred in jobController getAll: ${err}`,
      message: {
        err: `An error occurred when retreiving all jobs from database. See jobController.getAll`,
      },
    });
  })
};

// //Merge status and jobs
jobController.merge = async (req, res, next) => {
  console.log('in merge: ', res.locals.allStatus)
    for (const status in res.locals.allStatus) {
      if (res.locals.allStatus.jobid in res.locals.jobs) {
        res.locals.jobs[status.jobid].status = res.locals.allStatus.status;
      }
    }
    // console.log('after merge', res.locals.jobs)
  return next()
    .catch ((err)=> {
      return next({
        log: `Error occurred in jobController merge: ${err}`,
        message: {
          err: `An error occurred when merging jobs and status. See jobController.merge`,
        },
      });
    })

};

// //Update a job
jobController.updateJob = (req, res, next) => {
  // destructure req.body
  const {
    title,
    company,
    salary,
    benefits,
    location,
    skills,
    link,
    contact,
    jobNotes,
    interview,
  } = req.body;
  // Locates a specific job in mongoDB and updates it
  Job.findOneAndUpdate(
    { _id: req.params._id },
    {
      title,
      company,
      salary,
      benefits,
      location,
      skills,
      link,
      contact,
      notes: jobNotes,
      interview,
    },
    { new: true },
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
        Interview.findOneAndUpdate(
          { _id: req.params.interview._id },
          {
            notes: interviewNotes,
            type,
            status,
            resumeVersion,
          },
          { new: true },
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
          }
        );
        const { name, phone, email, contactNotes, lastContact } = contact;
        // probably not right yet - how do I access the contact doc?
        Contact.findOneAndUpdate(
          { _id: req.params.contact._id },
          {
            name,
            phone,
            email,
            notes: contactNotes,
            lastContact,
          },
          { new: true },
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
          }
        );
        // returns updated job on res.locals.job (note - not plural)
        res.locals.job = job;
        console.log(
          'at end of updateJob: jobs, interviews, contacts => ',
          res.locals.job,
          res.locals.interview,
          res.locals.contact
        );
        return next();
      }
    }
  );
};

jobController.findJob = async (req, res, next) => {
  // locate a single job
  try {
    const jobDoc = await Job.findOne({_id: req.params._id});
    console.log('jobDoc', jobDoc);
    res.locals.job = jobDoc._id;
    res.locals.contact = jobDoc.contact._id;
    res.locals.interview = jobDoc.interview._id;
    console.log('job', res.locals.job)
    console.log('contact', res.locals.contact)
    console.log('interview', res.locals.interview);
  } catch (err) {
    return next({
      log: `Error occurred in jobController findJob: ${err}`,
      message: {err: `An error occurred when finding a job from database. See jobController.findJob`}
    })
  }
}

// //Delete a job

jobController.deleteJob = async (req, res, next) => {
  // Locates and deletes job from MongoDB
  try {
    // find job doc
    const jobDoc = await Job.findOne({_id: req.params._id});
    res.locals.job = jobDoc;
    // delete all documents
    Job.findOneAndDelete({ _id: req.params._id},
      (err, job) => {
        if (err) {
          return next({
            log: 'Job document deletion failure',
            status: 400,
            message: { err: 'Job document not deleted' },
          });
        } else {
          Interview.findOneAndDelete({ _id: jobDoc.interview._id },
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
          Contact.findOneAndDelete({ _id: jobDoc.contact._id },
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
  } catch (err) {
    return next({
      log: `Error occurred in jobController deleteJob: ${err}`,
      message: {err: `An error occurred when deleting a job from database. See jobController.deleteJob`}
    })
  }

}

module.exports = jobController;
