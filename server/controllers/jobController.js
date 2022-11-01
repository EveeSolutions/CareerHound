// const Jobs = require('/.'); //TODO Add DB access

// const jobController = {};

// //Get all jobs -> will be passed a req.body.status that has an array of all status
//     //Need to merge the status with the job before returning to front end
// jobController.getAll = async (req, res, next) => {
// await Jobs.find()
// .then((data) => {
//   res.locals.jobs = data; //I don't recall what the returned data will look like so we may need to add a property to access it
//   return next()
// })
//   .catch((err) => {
//     return next({
//       log: `Error occurred in jobController getAll: ${err}`,
//       message: {err: `An error occurred when retreiving all jobs from database. See jobController.getAll`}
//     })
//     }
//   )
// }

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

// module.exports = jobController;