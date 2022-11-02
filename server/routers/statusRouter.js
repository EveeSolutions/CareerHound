const express = require('express');

const statusController = require('../controllers/statusController');

const router = express.Router();

router.get('/', statusController.getAll, (req, res, next) => {
  return res.status(200).json(res.locals.allJobs);
});

// router.get('/archived', statusController.getArchived, (req, res, next) => {
//   return res.status(200).json(res.locals.archivedJobs);
// });
//
// router.put('/', statusController.updateStatus, (req, res) => {
//   return res.status(200).json(res.locals.updatedJob);
// });
//
// router.delete('/', statusController.deleteStatus, (req, res) => {
//   return res.status(200).json(res.locals.deletedJob);
// });

module.exports = router;
