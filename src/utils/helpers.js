// Utility functions for the application

// Format display names
export const formatName = (firstName, lastName) => {
  return `${firstName} ${lastName}`.trim()
}

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Generate a random ID
export const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Debounce function for input handling
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Authentication helpers
export const authHelpers = {
  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('authToken') !== null
  },

  // Get current user data
  getCurrentUser: () => {
    try {
      const userData = localStorage.getItem('userData')
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error('Error parsing user data:', error)
      return null
    }
  },

  // Clear authentication data
  clearAuth: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
  },

  // Validate password strength
  validatePassword: (password) => {
    const errors = []
    if (password.length < 6) {
      errors.push('Password must be at least 6 characters long')
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number')
    }
    return errors
  },

  // Format authentication error messages
  formatAuthError: (error) => {
    if (typeof error === 'string') return error
    if (error?.message) return error.message
    return 'An unexpected error occurred'
  }
}

// Format date to readable string
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error getting from localStorage:', error)
      return null
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error setting to localStorage:', error)
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  }
}
