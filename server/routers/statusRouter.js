const express = require('express');

const statusController = require('../controllers/statusController');

const router = express.Router();

router.get('/', statusController.getAll, 
(req, res, next) => {
  return res.status(200).json(res.locals.allJobs);
})

router.get('/', statusController.getAll, 
(req, res, next) => {
  return res.status(200).json(res.locals.allJobs);
})

router.post('/update', statusController.updateStatus,
  (req, res) => {
  return res.status(200).json(res.locals.job)
  })

module.exports = router;

