import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard/CourseCard';
import './Home.css';

// Sample data - in real app, this would come from API
const featuredCourses = [
  {
    id: 1,
    title: "AI-Powered Digital Marketing",
    category: "Trending",
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
    category: "Traditional Trades",
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
    category: "Trending",
    instructor: "Alex Rodriguez",
    students: 2103,
    duration: "4 weeks",
    price: 999,
    originalPrice: 1499,
    badge: "Hot & New",
    imageColor: "#2A4B7C"
  }
];

const features = [
  {
    icon: "fas fa-brain",
    title: "Addictive Learning",
    description: "Our courses are designed using neuroscience principles to keep you engaged and motivated."
  },
  {
    icon: "fas fa-briefcase",
    title: "Real-World Application",
    description: "Learn skills that directly apply to your career with practical projects and case studies."
  },
  {
    icon: "fas fa-globe",
    title: "International Community",
    description: "Connect with learners and instructors from around the world."
  },
  {
    icon: "fas fa-shield-alt",
    title: "Trusted & Secure",
    description: "Your data and payments are protected with enterprise-level security."
  }
];

const testimonials = [
  {
    text: "The traditional woodworking course completely changed my perspective. I started my own furniture business within 6 months!",
    author: "James Wilson",
    role: "Furniture Business Owner"
  },
  {
    text: "The AI marketing course was incredibly addictive! I implemented strategies that doubled our company's leads.",
    author: "Sarah Johnson",
    role: "Marketing Director"
  },
  {
    text: "As a 62-year-old retiree, I appreciated the tax-free benefits and found the blacksmithing course both engaging and profitable.",
    author: "Robert Davies",
    role: "Retired Engineer"
  }
];

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Master Trending Skills & Rare Traditional Trades</h1>
            <p>Learn from industry experts with our highly addictive, practical courses designed for real-world success. Join our community of 3,000+ students today!</p>
            <div className="hero-buttons">
              <Link to="/courses" className="btn btn-secondary">Explore Courses</Link>
              <a href="#creators" className="btn btn-outline">Become a Creator</a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Courses</h2>
            <p>Discover our handpicked selection of trending and traditional courses</p>
          </div>
          <div className="course-grid">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link to="/courses" className="btn btn-primary">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose SkillCraft Pro?</h2>
            <p>We're revolutionizing online learning with our unique approach</p>
          </div>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p>Hear from our students who transformed their careers</p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-text">
                  {testimonial.text}
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <h4>{testimonial.author}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Career?</h2>
            <p>Join 3,000+ students mastering in-demand skills today</p>
            <div className="cta-buttons">
              <Link to="/courses" className="btn btn-secondary">Start Learning</Link>
              <Link to="/dashboard" className="btn btn-outline">View Dashboard</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
