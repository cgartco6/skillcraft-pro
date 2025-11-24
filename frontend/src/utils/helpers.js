// Format currency for South African Rand
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
  }).format(amount);
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice, currentPrice) => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Format date
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Generate course progress text
export const getProgressText = (progress) => {
  if (progress === 0) return 'Not Started';
  if (progress === 100) return 'Completed';
  return `${progress}% Complete`;
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Get user initials for avatar
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Calculate time remaining
export const getTimeRemaining = (endDate) => {
  const total = Date.parse(endDate) - Date.parse(new Date());
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  
  if (total <= 0) return 'Expired';
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h`;
};

// Generate random color for course images
export const generateCourseColor = (index) => {
  const colors = [
    '#4ECDC4', '#F15A29', '#2A4B7C', '#E74C3C', '#27AE60',
    '#F39C12', '#9B59B6', '#34495E', '#1ABC9C', '#D35400'
  ];
  return colors[index % colors.length];
};

// Check if user qualifies for age tax benefits
export const qualifiesForAgeBenefits = (dateOfBirth) => {
  if (!dateOfBirth) return false;
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age >= 62;
};
