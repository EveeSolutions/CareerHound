// TODO Add logic to access postgreSQL db
const db = require('../models/sqlConnection');

const statusController = {};


// Get all status
statusController.getAll = async (req, res, next) => {
  // return an object of status w/id - this needs to be merged with the jobs
  // in middleware downstream
  const querStr = 'SELECT * FROM public.jobs';
  try {
    const queryRes = await db.query(querStr);
    res.locals.allStatus = queryRes.rows;
    return next();
  } catch (error) {
    return next({
      log: `Error caught in statusController.getAll ${error}`,
      status: 404,
      message: 'No Jobs found!',
    });
  }
};
// Gets archived status
statusController.getArchived = (req, res, next) => {
  // return an object of status archieved w/id - this needs to be merged with jobs
  // in middleware downstream
  const querStr = '';

  try {
    return next();
  } catch (error) {
    return next({
      log: `Error caught in statusController.getArchived ${error}`,
      status: 404,
      message: 'No Archived Jobs found!',
    });
  }
};

statusController.updateStatus = (req, res, next) => {
  // updates the status of job based on id in req.
  // returns the job object with the new status on res.locals.job
  // I don't think there's any necessity in accessing mongoDB
  const querStr = '';

  try {
    return next();
  } catch (error) {
    return next({
      log: `Error caught in statusController.updateStatus ${error}`,
      status: 400,
      message: 'Bad Request, enter valid update status',
    });
  }
};

// Deletes status
statusController.deleteStatus = (req, res, next) => {
  // Locate job to be deleted on res.locals.job
  // Delete status from DB
  // Return res.locals.job w/ the ID of the deleted status (I think)
  const querStr = '';

  try {
    return next();
  } catch (error) {
    return next({
      log: `Error caught in statusController.deleteStatus ${error}`,
      status: 404,
      message: 'Job does not exist',
    });
  }
};

// I had an option to get just specific status, but don't know if that's really necessary

module.exports = statusController;
