require('dotenv').config;
const mongoose = require('mongoose');

const mongoConnection = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: job_info
})
.then(() => {console.log('connected to Mongo DB')})
.catch((err) => {console.log(`Error: ${err}`)});

module.exports = { mongoConnection };