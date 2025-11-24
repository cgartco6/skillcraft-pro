import React, { useState } from 'react';
import CourseCard from '../components/CourseCard/CourseCard';
import './Courses.css';

// Sample courses data
const allCourses = [
  {
    id: 1,
    title: "AI-Powered Digital Marketing",
    category: "trending",
    instructor: "Dr. Emily Chen",
    students: 1247,
    duration: "6 weeks",
    price: 1299,
    originalPrice: 1999,
    badge: "Bestseller",
    imageColor: "#4ECDC4"
  },
  {
    id: 2,
    title: "Traditional Woodworking Mastery",
    category: "traditional",
    instructor: "Master Craftsman John Peters",
    students: 587,
    duration: "8 weeks",
    price: 1599,
    originalPrice: 2299,
    badge: "Limited Spots",
    imageColor: "#F15A29"
  },
  {
    id: 3,
    title: "Blockchain & Cryptocurrency Fundamentals",
    category: "trending",
    instructor: "Alex Rodriguez",
    students: 2103,
    duration: "4 weeks",
    price: 999,
    originalPrice: 1499,
    badge: "Hot & New",
    imageColor: "#2A4B7C"
  },
  {
    id: 4,
    title: "Artisan Blacksmithing: From Beginner to Pro",
    category: "traditional",
    instructor: "Michael O'Connell",
    students: 342,
    duration: "10 weeks",
    price: 1899,
    originalPrice: 2599,
    badge: "Rare Skill",
    imageColor: "#E74C3C"
  },
  {
    id: 5,
    title: "Data Science for Business Leaders",
    category: "trending",
    instructor: "Dr. Sarah Williams",
    students: 876,
    duration: "5 weeks",
    price: 1499,
    originalPrice: 1999,
    badge: "Executive",
    imageColor: "#27AE60"
  },
  {
    id: 6,
    title: "Traditional Stone Masonry",
    category: "traditional",
    instructor: "Richard Gallagher",
    students: 198,
    duration: "12 weeks",
    price: 2199,
    originalPrice: 2999,
    badge: "Heritage Skill",
    imageColor: "#F39C12"
  },
  {
    id: 7,
    title: "UX/UI Design Masterclass",
    category: "trending",
    instructor: "Lisa Thompson",
    students: 1567,
    duration: "7 weeks",
    price: 1399,
    originalPrice: 1899,
    badge: "Popular",
    imageColor: "#9B59B6"
  },
  {
    id: 8,
    title: "Traditional Leather Crafting",
    category: "traditional",
    instructor: "David Wilson",
    students: 278,
    duration: "6 weeks",
    price: 1199,
    originalPrice: 1699,
    badge: "Handmade",
    imageColor: "#8B4513"
  }
];

const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'trending', name: 'Trending Skills' },
  { id: 'traditional', name: 'Traditional Trades' },
  { id: 'business', name: 'Business' },
  { id: 'technology', name: 'Technology' }
];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = allCourses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="courses-page">
      <section className="courses-hero">
        <div className="container">
          <h1>Explore Our Courses</h1>
          <p>Discover trending skills and rare traditional trades taught by industry experts</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="courses-controls">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search courses or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="categories">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="courses-stats">
            <div className="stat-card">
              <h3>{allCourses.length}</h3>
              <p>Total Courses</p>
            </div>
            <div className="stat-card">
              <h3>3,000+</h3>
              <p>Active Students</p>
            </div>
            <div className="stat-card">
              <h3>98%</h3>
              <p>Success Rate</p>
            </div>
          </div>

          <div className="course-grid">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="no-courses">
              <i className="fas fa-search fa-3x"></i>
              <h3>No courses found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
