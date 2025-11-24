import React, { useState } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data - in real app, this would come from API
  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Learning Progress',
        data: [20, 45, 60, 75, 85, 95],
        borderColor: '#4ECDC4',
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const courseDistributionData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [3, 5, 2],
        backgroundColor: ['#27AE60', '#F39C12', '#E74C3C'],
        hoverBackgroundColor: ['#2ECC71', '#F1C40F', '#EC7063'],
      },
    ],
  };

  const weeklyActivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Study Hours',
        data: [2, 3, 1.5, 4, 2.5, 1, 0.5],
        backgroundColor: '#2A4B7C',
        borderRadius: 4,
      },
    ],
  };

  const enrolledCourses = [
    {
      id: 1,
      title: "AI-Powered Digital Marketing",
      progress: 75,
      nextLesson: "Module 4: AI Content Creation",
      dueDate: "2024-02-15"
    },
    {
      id: 2,
      title: "Traditional Woodworking",
      progress: 30,
      nextLesson: "Module 2: Joinery Techniques",
      dueDate: "2024-03-01"
    },
    {
      id: 3,
      title: "Blockchain Fundamentals",
      progress: 100,
      nextLesson: "Course Completed",
      dueDate: "Completed"
    }
  ];

  const achievements = [
    { name: "Fast Learner", icon: "fas fa-bolt", earned: true },
    { name: "Consistent Student", icon: "fas fa-calendar-check", earned: true },
    { name: "Course Completer", icon: "fas fa-trophy", earned: false },
    { name: "Discussion Leader", icon: "fas fa-comments", earned: false },
  ];

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>My Learning Dashboard</h1>
          <p>Track your progress and continue your learning journey</p>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fas fa-chart-line"></i>
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <i className="fas fa-book"></i>
            My Courses
          </button>
          <button 
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <i className="fas fa-chart-bar"></i>
            Analytics
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: 'rgba(42, 75, 124, 0.1)' }}>
                  <i className="fas fa-book" style={{ color: '#2A4B7C' }}></i>
                </div>
                <div className="stat-info">
                  <h3>10</h3>
                  <p>Courses Enrolled</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: 'rgba(78, 205, 196, 0.1)' }}>
                  <i className="fas fa-check-circle" style={{ color: '#4ECDC4' }}></i>
                </div>
                <div className="stat-info">
                  <h3>3</h3>
                  <p>Courses Completed</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: 'rgba(241, 90, 41, 0.1)' }}>
                  <i className="fas fa-clock" style={{ color: '#F15A29' }}></i>
                </div>
                <div className="stat-info">
                  <h3>24</h3>
                  <p>Study Hours</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: 'rgba(39, 174, 96, 0.1)' }}>
                  <i className="fas fa-trophy" style={{ color: '#27AE60' }}></i>
                </div>
                <div className="stat-info">
                  <h3>5</h3>
                  <p>Achievements</p>
                </div>
              </div>
            </div>

            <div className="charts-grid">
              <div className="chart-card">
                <h3>Learning Progress</h3>
                <Line 
                  data={progressData} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }} 
                />
              </div>
              <div className="chart-card">
                <h3>Course Distribution</h3>
                <Doughnut 
                  data={courseDistributionData}
                  options={{
                    responsive: true,
                    cutout: '70%',
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="dashboard-sections">
              <div className="section-card">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon completed">
                      <i className="fas fa-check"></i>
                    </div>
                    <div className="activity-content">
                      <p>Completed <strong>Blockchain Fundamentals</strong></p>
                      <span className="activity-time">2 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon progress">
                      <i className="fas fa-play"></i>
                    </div>
                    <div className="activity-content">
                      <p>Started <strong>Module 4</strong> in AI Marketing</p>
                      <span className="activity-time">1 day ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon achievement">
                      <i className="fas fa-trophy"></i>
                    </div>
                    <div className="activity-content">
                      <p>Earned <strong>Fast Learner</strong> achievement</p>
                      <span className="activity-time">3 days ago</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-card">
                <h3>My Achievements</h3>
                <div className="achievements-grid">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}>
                      <div className="achievement-icon">
                        <i className={achievement.icon}></i>
                      </div>
                      <span className="achievement-name">{achievement.name}</span>
                      {!achievement.earned && <i className="fas fa-lock lock-icon"></i>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="courses-tab">
            <div className="enrolled-courses">
              <h2>My Courses</h2>
              <div className="course-list">
                {enrolledCourses.map(course => (
                  <div key={course.id} className="enrolled-course-card">
                    <div className="course-header">
                      <h4>{course.title}</h4>
                      <span className={`progress-badge ${course.progress === 100 ? 'completed' : 'in-progress'}`}>
                        {course.progress}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="course-details">
                      <div className="detail">
                        <i className="fas fa-play-circle"></i>
                        <span>Next: {course.nextLesson}</span>
                      </div>
                      <div className="detail">
                        <i className="fas fa-calendar"></i>
                        <span>Due: {course.dueDate}</span>
                      </div>
                    </div>
                    <button className="btn btn-primary continue-btn">
                      {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-tab">
            <div className="chart-card large">
              <h3>Weekly Study Activity</h3>
              <Bar 
                data={weeklyActivityData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            </div>
            
            <div className="analytics-stats">
              <div className="analytics-card">
                <h4>Average Daily Study Time</h4>
                <div className="analytics-value">2.1 hours</div>
              </div>
              <div className="analytics-card">
                <h4>Most Productive Day</h4>
                <div className="analytics-value">Thursday</div>
              </div>
              <div className="analytics-card">
                <h4>Completion Rate</h4>
                <div className="analytics-value">85%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
