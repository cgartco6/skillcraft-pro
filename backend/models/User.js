const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  profile: {
    avatar: String,
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    location: String,
    website: String,
    social: {
      twitter: String,
      linkedin: String,
      github: String
    }
  },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: function(date) {
        return date < new Date();
      },
      message: 'Date of birth must be in the past'
    }
  },
  taxInfo: {
    taxNumber: String,
    ageBenefits: {
      type: Boolean,
      default: false
    },
    taxRecords: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TaxRecord'
    }]
  },
  coursesEnrolled: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    completed: {
      type: Boolean,
      default: false
    },
    lastAccessed: Date
  }],
  coursesCreated: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    marketingEmails: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'en'
    },
    timezone: {
      type: String,
      default: 'Africa/Johannesburg'
    }
  },
  achievements: [{
    name: String,
    icon: String,
    earnedAt: {
      type: Date,
      default: Date.now
    },
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  emailVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'coursesEnrolled.course': 1 });
userSchema.index({ createdAt: -1 });

// Virtual for user's age
userSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
});

// Check if user qualifies for age benefits
userSchema.methods.qualifiesForAgeBenefits = function() {
  return this.age >= 62;
};

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    
    // Update age benefits if date of birth is set
    if (this.isModified('dateOfBirth') && this.dateOfBirth) {
      this.taxInfo.ageBenefits = this.qualifiesForAgeBenefits();
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update last login method
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

// Get enrolled courses with progress
userSchema.methods.getEnrolledCourses = function() {
  return this.populate('coursesEnrolled.course');
};

// Check if user is enrolled in a course
userSchema.methods.isEnrolled = function(courseId) {
  return this.coursesEnrolled.some(enrollment => 
    enrollment.course.toString() === courseId.toString()
  );
};

// Update course progress
userSchema.methods.updateCourseProgress = function(courseId, progress) {
  const enrollment = this.coursesEnrolled.find(e => 
    e.course.toString() === courseId.toString()
  );
  
  if (enrollment) {
    enrollment.progress = Math.min(100, Math.max(0, progress));
    enrollment.lastAccessed = new Date();
    
    if (progress >= 100) {
      enrollment.completed = true;
    }
  }
  
  return this.save();
};

// Static method to find users by role
userSchema.statics.findByRole = function(role) {
  return this.find({ role });
};

// Static method to get user statistics
userSchema.statics.getUserStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        active: {
          $sum: { $cond: ['$isActive', 1, 0] }
        }
      }
    }
  ]);
};

module.exports = mongoose.model('User', userSchema);
