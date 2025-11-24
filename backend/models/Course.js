const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Module title is required'],
    maxlength: [200, 'Module title cannot exceed 200 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Module description cannot exceed 1000 characters']
  },
  content: {
    type: String,
    required: [true, 'Module content is required']
  },
  videoUrl: String,
  duration: {
    type: Number, // in minutes
    required: [true, 'Module duration is required'],
    min: [1, 'Duration must be at least 1 minute']
  },
  resources: [{
    name: String,
    url: String,
    type: {
      type: String,
      enum: ['pdf', 'video', 'audio', 'document', 'link']
    }
  }],
  order: {
    type: Number,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  }
});

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: [1000, 'Review comment cannot exceed 1000 characters']
  },
  helpful: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [200, 'Course title cannot exceed 200 characters']
  },
  subtitle: {
    type: String,
    maxlength: [300, 'Course subtitle cannot exceed 300 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: [2000, 'Course description cannot exceed 2000 characters']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    enum: {
      values: ['trending', 'traditional', 'business', 'technology', 'creative', 'personal-development'],
      message: 'Category must be trending, traditional, business, technology, creative, or personal-development'
    }
  },
  subcategory: String,
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'all-levels'],
    default: 'all-levels'
  },
  price: {
    type: Number,
    required: [true, 'Course price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    validate: {
      validator: function(value) {
        return value === null || value >= this.price;
      },
      message: 'Original price must be greater than or equal to current price'
    }
  },
  currency: {
    type: String,
    default: 'ZAR'
  },
  image: {
    url: String,
    alt: String,
    color: {
      type: String,
      default: '#4ECDC4'
    }
  },
  badge: {
    text: String,
    type: {
      type: String,
      enum: ['bestseller', 'new', 'hot', 'limited', 'popular', 'trending']
    }
  },
  modules: [moduleSchema],
  learningObjectives: [{
    type: String,
    maxlength: [200, 'Learning objective cannot exceed 200 characters']
  }],
  requirements: [{
    type: String,
    maxlength: [200, 'Requirement cannot exceed 200 characters']
  }],
  targetAudience: [{
    type: String,
    maxlength: [200, 'Target audience cannot exceed 200 characters']
  }],
  duration: {
    total: {
      type: Number, // in hours
      required: true
    },
    weeks: {
      type: Number,
      required: true
    }
  },
  language: {
    type: String,
    default: 'English'
  },
  captions: [{
    language: String,
    url: String
  }],
  reviews: [reviewSchema],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    },
    distribution: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 }
    }
  },
  studentsEnrolled: {
    type: Number,
    default: 0
  },
  completionRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  addictiveScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  engagement: {
    averageProgress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    averageTimeSpent: {
      type: Number,
      default: 0 // in minutes
    },
    retentionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived', 'under-review'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  metadata: {
    seo: {
      title: String,
      description: String,
      keywords: [String]
    },
    promotional: {
      discountEnds: Date,
      featuredUntil: Date
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
courseSchema.index({ instructor: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ status: 1 });
courseSchema.index({ 'rating.average': -1 });
courseSchema.index({ studentsEnrolled: -1 });
courseSchema.index({ createdAt: -1 });
courseSchema.index({ isFeatured: 1 });
courseSchema.index({ price: 1 });

// Virtual for discount percentage
courseSchema.virtual('discountPercentage').get(function() {
  if (!this.originalPrice || this.originalPrice <= this.price) return 0;
  return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
});

// Virtual for total modules
courseSchema.virtual('totalModules').get(function() {
  return this.modules.length;
});

// Update rating when new review is added
courseSchema.methods.updateRating = function(newRating, oldRating = null) {
  if (oldRating) {
    // Update existing rating
    this.rating.distribution[oldRating]--;
  }
  
  this.rating.distribution[newRating]++;
  
  // Calculate new average
  const totalRatings = Object.values(this.rating.distribution).reduce((sum, count) => sum + count, 0);
  const weightedSum = Object.entries(this.rating.distribution).reduce((sum, [rating, count]) => {
    return sum + (parseInt(rating) * count);
  }, 0);
  
  this.rating.average = totalRatings > 0 ? weightedSum / totalRatings : 0;
  this.rating.count = totalRatings;
  
  return this.save();
};

// Add review to course
courseSchema.methods.addReview = async function(userId, rating, comment) {
  const Review = mongoose.model('Review');
  
  // Check if user already reviewed
  const existingReview = this.reviews.find(review => 
    review.user.toString() === userId.toString()
  );
  
  if (existingReview) {
    const oldRating = existingReview.rating;
    existingReview.rating = rating;
    existingReview.comment = comment;
    await this.updateRating(rating, oldRating);
  } else {
    const review = new Review({
      user: userId,
      rating,
      comment
    });
    
    this.reviews.push(review);
    await this.updateRating(rating);
  }
  
  return this.save();
};

// Increment student enrollment
courseSchema.methods.incrementEnrollment = function() {
  this.studentsEnrolled += 1;
  return this.save();
};

// Update completion rate
courseSchema.methods.updateCompletionRate = function(completed, total) {
  this.completionRate = total > 0 ? (completed / total) * 100 : 0;
  return this.save();
};

// Calculate addictive score based on engagement metrics
courseSchema.methods.calculateAddictiveScore = function() {
  const progressWeight = 0.4;
  const timeWeight = 0.3;
  const retentionWeight = 0.3;
  
  this.addictiveScore = (
    (this.engagement.averageProgress * progressWeight) +
    (Math.min(this.engagement.averageTimeSpent / 60, 1) * 100 * timeWeight) +
    (this.engagement.retentionRate * retentionWeight)
  );
  
  return this.save();
};

// Static method to find courses by category
courseSchema.statics.findByCategory = function(category) {
  return this.find({ category, status: 'published' });
};

// Static method to get featured courses
courseSchema.statics.getFeaturedCourses = function(limit = 10) {
  return this.find({ 
    isFeatured: true, 
    status: 'published' 
  })
  .limit(limit)
  .populate('instructor', 'name profile.avatar');
};

// Static method to get trending courses
courseSchema.statics.getTrendingCourses = function(limit = 10) {
  return this.find({ 
    status: 'published' 
  })
  .sort({ 
    'rating.average': -1, 
    studentsEnrolled: -1 
  })
  .limit(limit)
  .populate('instructor', 'name profile.avatar');
};

// Static method to get course statistics
courseSchema.statics.getCourseStats = function() {
  return this.aggregate([
    {
      $match: { status: 'published' }
    },
    {
      $group: {
        _id: '$category',
        totalCourses: { $sum: 1 },
        totalStudents: { $sum: '$studentsEnrolled' },
        avgRating: { $avg: '$rating.average' },
        avgPrice: { $avg: '$price' },
        totalRevenue: { $sum: { $multiply: ['$price', '$studentsEnrolled'] } }
      }
    }
  ]);
};

// Pre-save middleware to update engagement metrics
courseSchema.pre('save', function(next) {
  if (this.isModified('engagement')) {
    this.calculateAddictiveScore();
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema);
