//TODO Add logic to access postgreSQL db
//const db = require(....database access)

const statusController = {};

//Get all status
statusController.getAll = () => {
  //return an object of status w/id - this needs to be merged with the jobs
  //in middleware downstream
}
//Gets archived status
statusController.getArchived = () => {
  //return an object of status archieved w/id - this needs to be merged with jobs
  //in middleware downstream
}

statusController.updateStatus = () => {
  //updates the status of job based on id in req.
  //returns the job object with the new status on res.locals.job
  //I don't think there's any necessity in accessing mongoDB
}

//Deletes status
statusController.deleteStatus = () => {
  //Locate job to be deleted on res.locals.job
  //Delete status from DB
  //Return res.locals.job w/ the ID of the deleted status (I think)
}

//I had an option to get just specific status, but don't know if that's really necessary

module.exports = statusController;