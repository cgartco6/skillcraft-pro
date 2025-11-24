import React from 'react';
import { useCart } from '../Cart/CartContext';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(course);
  };

  return (
    <div className="course-card">
      <div 
        className="course-image" 
        style={{ 
          backgroundImage: course.image ? `url(${course.image})` : 'none',
          backgroundColor: course.imageColor || '#4ECDC4'
        }}
      >
        <div className="course-badge">{course.badge}</div>
      </div>
      <div className="course-content">
        <div className="course-category">{course.category}</div>
        <h3 className="course-title">{course.title}</h3>
        <div className="course-instructor">
          <div className="instructor-avatar"></div>
          <span>{course.instructor}</span>
        </div>
        <div className="course-stats">
          <span><i className="fas fa-users"></i> {course.students} students</span>
          <span><i className="far fa-clock"></i> {course.duration}</span>
        </div>
        <div className="course-price">
          <div>
            <span className="price">R {course.price}</span>
            {course.originalPrice && (
              <span className="original-price">R {course.originalPrice}</span>
            )}
          </div>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            <i className="fas fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
