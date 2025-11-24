const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: Date,
  age: Number,
  role: { type: String, enum: ['student', 'creator', 'admin'], default: 'student' },
  coursesEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  coursesCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  taxInfo: {
    taxNumber: String,
    ageBenefits: Boolean,
    taxRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaxRecord' }]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
