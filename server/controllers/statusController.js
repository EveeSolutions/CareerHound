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
    res.locals.allJobs = queryRes.rows;
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
statusController.getArchived = async (req, res, next) => {
  // return an object of status archieved w/id - this needs to be merged with jobs
  // in middleware downstream
  const querStr = "SELECT * FROM public.jobs WHERE status = 'archived';";
  try {
    const queryRes = await db.query(querStr);
    res.locals.archivedJobs = queryRes.rows;
    return next();
  } catch (error) {
    return next({
      log: `Error caught in statusController.getArchived ${error}`,
      status: 404,
      message: 'No Archived Jobs found!',
    });
  }
};

statusController.CreateJobStatus = async (req, res, next) => {
  const querStr =
    'INSERT INTO jobs (jobId, status, user_id) VALUES($1, $2, $3)';
  const userId = 1; // until we implement auth
  const status = 'interested'; // unless we want user to be able to change on creation
  try {
    const { _id } = res.locals.jobs;
    const values = [_id, status, userId];

    const queryRes = await db.query(querStr, values);

    console.log('statusController.CreateJobStatus= => queryRes', queryRes.rows);

    res.locals.sqlJob = queryRes.rows;
    return next();
  } catch (error) {
    return next({
      log: `Error caught in statusController.updateStatus ${error}`,
      status: 400,
      message: 'Bad Request, enter valid update status',
    });
  }
};

statusController.updateStatus = async (req, res, next) => {
  // updates the status of job based on id in req.
  // returns the job object with the new status on res.locals.job
  // I don't think there's any necessity in accessing mongoDB

  const { status, id } = req.body;

  try {
    if (!status || !id) {
      return next({
        log: null,
        status: 400,
        message: 'Bad Request, request needs status and/or job id',
      });
    }
    const querStr = `UPDATE public.jobs SET status = '${status}' WHERE jobid= '${id}' RETURNING *`;

    const queryRes = await db.query(querStr);

    res.locals.updatedJob = queryRes.rows;

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
statusController.deleteStatus = async (req, res, next) => {
  // Locate job to be deleted on res.locals.job
  // Delete status from DB
  // Return res.locals.job w/ the ID of the deleted status (I think)
  try {
    const { id } = req.body;
    const querStr = `DELETE FROM public.jobs WHERE jobid = '${id}' RETURNING *;`;

    const queryRes = await db.query(querStr);

    console.log('statusController.deleteStatus => queryRes', queryRes.rows);

    res.locals.deletedJob = queryRes.rows;
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
