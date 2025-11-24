import React, { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import './Admin.css';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('overview');

  // Sample data for charts
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (ZAR)',
        data: [45000, 52000, 68000, 75000, 82000, 95000],
        borderColor: '#4ECDC4',
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const studentGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Students',
        data: [150, 220, 180, 300, 250, 400],
        backgroundColor: '#2A4B7C',
        borderRadius: 4,
      },
    ],
  };

  const coursePerformanceData = {
    labels: ['AI Marketing', 'Woodworking', 'Blockchain', 'Blacksmithing', 'Data Science'],
    datasets: [
      {
        label: 'Enrollments',
        data: [1247, 587, 2103, 342, 876],
        backgroundColor: [
          '#4ECDC4',
          '#F15A29',
          '#2A4B7C',
          '#E74C3C',
          '#27AE60'
        ],
      },
    ],
  };

  const payoutDistributionData = {
    labels: ['Owner FNB', 'African Bank', 'Reserve FNB', 'AI Account', 'Remaining FNB'],
    datasets: [
      {
        data: [40, 15, 20, 20, 5],
        backgroundColor: [
          '#2A4B7C',
          '#F15A29',
          '#4ECDC4',
          '#9B59B6',
          '#34495E'
        ],
      },
    ],
  };

  const recentTransactions = [
    { id: 1, student: 'John Doe', course: 'AI Marketing', amount: 1299, date: '2024-01-15', status: 'Completed' },
    { id: 2, student: 'Sarah Smith', course: 'Woodworking', amount: 1599, date: '2024-01-14', status: 'Completed' },
    { id: 3, student: 'Mike Johnson', course: 'Blockchain', amount: 999, date: '2024-01-14', status: 'Pending' },
    { id: 4, student: 'Emily Chen', course: 'Data Science', amount: 1499, date: '2024-01-13', status: 'Completed' },
    { id: 5, student: 'David Wilson', course: 'Blacksmithing', amount: 1899, date: '2024-01-13', status: 'Completed' },
  ];

  const taxReminders = [
    { type: 'VAT201', dueDate: '2024-01-25', amount: 12500, status: 'Pending' },
    { type: 'EMP201', dueDate: '2024-01-07', amount: 8500, status: 'Paid' },
    { type: 'ITR12', dueDate: '2024-09-30', amount: 0, status: 'Upcoming' },
  ];

  const marketingStats = {
    viralContent: 15,
    engagementRate: '4.2%',
    newLeads: 324,
    conversionRate: '8.7%'
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your platform and track performance</p>
        </div>

        <div className="admin-nav">
          <button 
            className={`nav-btn ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            <i className="fas fa-tachometer-alt"></i>
            Overview
          </button>
          <button 
            className={`nav-btn ${activeSection === 'financial' ? 'active' : ''}`}
            onClick={() => setActiveSection('financial')}
          >
            <i className="fas fa-chart-line"></i>
            Financial
          </button>
          <button 
            className={`nav-btn ${activeSection === 'students' ? 'active' : ''}`}
            onClick={() => setActiveSection('students')}
          >
            <i className="fas fa-users"></i>
            Students
          </button>
          <button 
            className={`nav-btn ${activeSection === 'tax' ? 'active' : ''}`}
            onClick={() => setActiveSection('tax')}
          >
            <i className="fas fa-file-invoice-dollar"></i>
            Tax & Compliance
          </button>
          <button 
            className={`nav-btn ${activeSection === 'marketing' ? 'active' : ''}`}
            onClick={() => setActiveSection('marketing')}
          >
            <i className="fas fa-bullhorn"></i>
            Marketing
          </button>
        </div>

        {activeSection === 'overview' && (
          <div className="admin-overview">
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-header">
                  <h3>Total Revenue</h3>
                  <i className="fas fa-rand-sign"></i>
                </div>
                <div className="kpi-value">R 417,000</div>
                <div className="kpi-change positive">+12.5%</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-header">
                  <h3>Active Students</h3>
                  <i className="fas fa-users"></i>
                </div>
                <div className="kpi-value">3,247</div>
                <div className="kpi-change positive">+8.2%</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-header">
                  <h3>Course Completion</h3>
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="kpi-value">78%</div>
                <div className="kpi-change positive">+5.3%</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-header">
                  <h3>Avg. Rating</h3>
                  <i className="fas fa-star"></i>
                </div>
                <div className="kpi-value">4.8/5</div>
                <div className="kpi-change positive">+0.2</div>
              </div>
            </div>

            <div className="charts-row">
              <div className="chart-container">
                <h3>Revenue Growth</h3>
                <Line data={revenueData} options={{ responsive: true }} />
              </div>
              <div className="chart-container">
                <h3>Student Growth</h3>
                <Bar data={studentGrowthData} options={{ responsive: true }} />
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Transactions</h3>
              <div className="activity-table">
                <table>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map(transaction => (
                      <tr key={transaction.id}>
                        <td>{transaction.student}</td>
                        <td>{transaction.course}</td>
                        <td>R {transaction.amount}</td>
                        <td>{transaction.date}</td>
                        <td>
                          <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'financial' && (
          <div className="financial-section">
            <div className="financial-overview">
              <div className="revenue-breakdown">
                <h3>Revenue Breakdown</h3>
                <div className="breakdown-grid">
                  <div className="breakdown-item">
                    <span className="label">Trending Courses</span>
                    <span className="value">R 285,000</span>
                    <span className="percentage">68%</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Traditional Trades</span>
                    <span className="value">R 132,000</span>
                    <span className="percentage">32%</span>
                  </div>
                </div>
              </div>

              <div className="payout-distribution">
                <h3>Payout Distribution</h3>
                <Doughnut 
                  data={payoutDistributionData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="payment-methods">
              <h3>Payment Method Distribution</h3>
              <div className="method-stats">
                <div className="method-stat">
                  <span className="method-name">FNB EFT</span>
                  <div className="method-bar">
                    <div className="method-fill" style={{ width: '35%' }}></div>
                  </div>
                  <span className="method-percentage">35%</span>
                </div>
                <div className="method-stat">
                  <span className="method-name">PayFast</span>
                  <div className="method-bar">
                    <div className="method-fill" style={{ width: '25%' }}></div>
                  </div>
                  <span className="method-percentage">25%</span>
                </div>
                <div className="method-stat">
                  <span className="method-name">PayPal</span>
                  <div className="method-bar">
                    <div className="method-fill" style={{ width: '20%' }}></div>
                  </div>
                  <span className="method-percentage">20%</span>
                </div>
                <div className="method-stat">
                  <span className="method-name">Stripe</span>
                  <div className="method-bar">
                    <div className="method-fill" style={{ width: '15%' }}></div>
                  </div>
                  <span className="method-percentage">15%</span>
                </div>
                <div className="method-stat">
                  <span className="method-name">PayShap</span>
                  <div className="method-bar">
                    <div className="method-fill" style={{ width: '5%' }}></div>
                  </div>
                  <span className="method-percentage">5%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'students' && (
          <div className="students-section">
            <div className="student-metrics">
              <div className="metric-card">
                <h4>Total Students</h4>
                <div className="metric-value">3,247</div>
              </div>
              <div className="metric-card">
                <h4>Active This Month</h4>
                <div className="metric-value">1,856</div>
              </div>
              <div className="metric-card">
                <h4>Completion Rate</h4>
                <div className="metric-value">78%</div>
              </div>
              <div className="metric-card">
                <h4>Avg. Progress</h4>
                <div className="metric-value">64%</div>
              </div>
            </div>

            <div className="course-performance">
              <h3>Course Performance</h3>
              <Bar 
                data={coursePerformanceData}
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
          </div>
        )}

        {activeSection === 'tax' && (
          <div className="tax-section">
            <div className="tax-overview">
              <h3>SARS Compliance Dashboard</h3>
              
              <div className="tax-reminders">
                <h4>Upcoming Tax Deadlines</h4>
                <div className="reminders-list">
                  {taxReminders.map((reminder, index) => (
                    <div key={index} className="reminder-card">
                      <div className="reminder-header">
                        <span className="reminder-type">{reminder.type}</span>
                        <span className={`reminder-status ${reminder.status.toLowerCase()}`}>
                          {reminder.status}
                        </span>
                      </div>
                      <div className="reminder-details">
                        <span>Due: {reminder.dueDate}</span>
                        {reminder.amount > 0 && <span>Amount: R {reminder.amount}</span>}
                      </div>
                      <button className="btn btn-primary btn-sm">
                        {reminder.status === 'Pending' ? 'Pay Now' : 'View Details'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tax-benefits">
                <h4>Age-Based Tax Benefits</h4>
                <div className="benefits-info">
                  <div className="benefit-item">
                    <i className="fas fa-check-circle"></i>
                    <span>62+ years: Additional tax-free threshold available</span>
                  </div>
                  <div className="benefit-item">
                    <i className="fas fa-check-circle"></i>
                    <span>65+ years: Higher rebates and medical tax credits</span>
                  </div>
                  <div className="benefit-item">
                    <i className="fas fa-check-circle"></i>
                    <span>Automatic detection and application for eligible students</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="document-generator">
              <h4>SARS Document Generator</h4>
              <div className="document-options">
                <button className="btn btn-outline">
                  <i className="fas fa-file-pdf"></i>
                  Generate ITR12
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-file-invoice"></i>
                  Generate Proof of Income
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-certificate"></i>
                  Generate Tax Certificate
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'marketing' && (
          <div className="marketing-section">
            <div className="marketing-stats">
              <h3>AI Marketing Performance</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{marketingStats.viralContent}</div>
                  <div className="stat-label">Viral Content Pieces</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{marketingStats.engagementRate}</div>
                  <div className="stat-label">Avg. Engagement Rate</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{marketingStats.newLeads}</div>
                  <div className="stat-label">New Leads This Month</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{marketingStats.conversionRate}</div>
                  <div className="stat-label">Conversion Rate</div>
                </div>
              </div>
            </div>

            <div className="campaign-controls">
              <h4>AI Marketing Controls</h4>
              <div className="control-buttons">
                <button className="btn btn-primary">
                  <i className="fas fa-robot"></i>
                  Generate Viral Content
                </button>
                <button className="btn btn-secondary">
                  <i className="fas fa-bullseye"></i>
                  Launch Targeted Campaign
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-chart-line"></i>
                  Analyze Performance
                </button>
              </div>
            </div>

            <div className="student-acquisition">
              <h4>Student Acquisition Progress</h4>
              <div className="acquisition-progress">
                <div className="progress-info">
                  <span className="current">3,247</span>
                  <span className="target">/ 3,000 target students</span>
                </div>
                <div className="progress-bar large">
                  <div 
                    className="progress-fill" 
                    style={{ width: '108%' }}
                  ></div>
                </div>
                <div className="progress-message success">
                  <i className="fas fa-trophy"></i>
                  Target exceeded! Ready for next milestone: 10,000 students
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
