//TODO Add logic to access mongoDB
//const db = require(...database stuff)

const jobController = {};

//Get all jobs -> will be passed a req.body.status that has an array of all status
    //Need to merge the status with the job before returning to front end
jobController.getAll = () => {
  //req.body will have an object of status objects
  //add all jobs to res.locals.jobs
}

//Merge status and jobs
jobController.merge = () => {
  //merge res.locals.jobs and res.locals.status so
  //a status is added to each job object in the array
  //based on ID. Note that both are nested objects
}

//Update a job
jobController.updateJob = () => {
  //Locates a specific job in mongoDB and updates it
  //returns updated job on res.locals.job (note - not plural)
}

//Delete a job
jobController.deleteJob = () => {
  //Locates and deletes job from MongoDB
  //Return deleted job to res.locals.job (note - not plural)
}

module.exports = jobController;