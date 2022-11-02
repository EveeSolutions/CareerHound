const mongoose = require('mongoose');
require('dotenv').config();
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: { type: String, required: false },
    phone: { type: Number, required: false },
    email: { type: String, required: false },
    notes: { type: String, required: false},
    lastContact: { type: String, required: false}
}, { minimize: false });

const Contact = mongoose.model('Contact', contactSchema);

const interviewSchema = new Schema({
    notes: { type: String, required: false },
    type: { type: String, required: true }, // Phone screen, Behavioral, Technical
    status: { type: String, required: true}, // Pass, Fail, Waiting
    resumeVersion: { type: String, required: true }
}, { minimize: false })

const Interview = mongoose.model('Interview', interviewSchema);

const jobSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    salary: { type: Number, required: false },
    benefits: { type: Array, required: false, default: [] },
    location: { type: String, required: true },
    skills: { type: Array, required: false, default: [] },
    link: { type: String, required: true },
    contact: { type: contactSchema, required: false, default: {} },
    notes: { type: String, required: false },
    interview: { type: interviewSchema, required: false, default: {} }
}, { minimize: false });

const Job = mongoose.model('Job', jobSchema);

module.exports = {
    Job,
    // Contact,
    // Interview
};
