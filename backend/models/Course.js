const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['trending', 'traditional', 'business', 'technology'], required: true },
  subcategory: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  originalPrice: Number,
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  duration: String,
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  description: String,
  learningObjectives: [String],
  modules: [{
    title: String,
    content: String,
    duration: Number,
    resources: [String]
  }],
  addictiveScore: { type: Number, default: 0 },
  completionRate: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
