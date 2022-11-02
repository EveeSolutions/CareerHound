const express = require('express');

console.log('in job router');
const statusController = require('../controllers/statusController');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.get(
  '/all',
  statusController.getAll,
  jobController.getAll,
  jobController.merge,
  (req, res) => {
    return res.status(200).json(res.locals.jobs);
  }
);

// router.get('/archived',
//   statusController.getArchived, jobController.getArchived, jobController.merge,
//   (req, res) => {
//   return res.status(200).json(res.locals.jobs)
// })

router.post(
  '/create',
  jobController.createJob,
  statusController.CreateJobStatus,
  (req, res) => {
    return res.status(200).json(res.locals.jobs);
  }
);

// router.post('/update', jobController.updateJob,
//   (req, res) => {
//   return res.status(200).json(res.locals.job)
//   })

// router.post('/delete', jobController.deleteJob, statusController.deleteStatus,
//   (req, res) => {
//   return res.status(200).json(res.locals.job)
//   })

module.exports = router;
