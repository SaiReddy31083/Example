// Authentication service with predefined user credentials
const users = [
  // Admin users
  { email: 'admin@heritage.com', password: 'admin123', role: 'admin', dashboard: '/admin/enthusiast-dashboard' },
  { email: 'super.admin@heritage.com', password: 'superadmin123', role: 'admin', dashboard: '/admin/enthusiast-dashboard' },
  
  // Regular users
  { email: 'user@heritage.com', password: 'user123', role: 'user', dashboard: '/admin/user-dashboard' },
  { email: 'heritage.user@gmail.com', password: 'user456', role: 'user', dashboard: '/admin/user-dashboard' },
  
  // Content creators
  { email: 'creator@heritage.com', password: 'creator123', role: 'content-creator', dashboard: '/admin/content-creator-dashboard' },
  { email: 'content.creator@gmail.com', password: 'creator456', role: 'content-creator', dashboard: '/admin/content-creator-dashboard' },
  
  // Tour guides
  { email: 'guide@heritage.com', password: 'guide123', role: 'tour-guide', dashboard: '/admin/tour-guide-dashboard' },
  { email: 'tour.guide@gmail.com', password: 'guide456', role: 'tour-guide', dashboard: '/admin/tour-guide-dashboard' },
];

export const authenticateUser = (email, password) => {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  
  if (user) {
    // Store user info in localStorage (in a real app, use more secure methods like JWT)
    localStorage.setItem('currentUser', JSON.stringify({
      email: user.email,
      role: user.role,
      dashboard: user.dashboard
    }));
    
    return {
      success: true,
      user: {
        email: user.email,
        role: user.role,
        dashboard: user.dashboard
      }
    };
  }
  
  return {
    success: false,
    message: 'Invalid email or password'
  };
};

// Register a new user
export const registerUser = (email, password, name, role) => {
  // Check if user already exists
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (existingUser) {
    return {
      success: false,
      message: 'User with this email already exists'
    };
  }

  // Validate inputs
  if (!email || !password || !name || !role) {
    return {
      success: false,
      message: 'All fields are required'
    };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: 'Please enter a valid email address'
    };
  }

  // Password validation
  if (password.length < 6) {
    return {
      success: false,
      message: 'Password must be at least 6 characters long'
    };
  }

  // Get dashboard path based on role
  const getDashboardPath = (userRole) => {
    switch (userRole) {
      case 'admin': return '/admin/enthusiast-dashboard';
      case 'user': return '/admin/user-dashboard';
      case 'content-creator': return '/admin/content-creator-dashboard';
      case 'tour-guide': return '/admin/tour-guide-dashboard';
      default: return '/admin/user-dashboard';
    }
  };

  // Create new user
  const newUser = {
    email: email.toLowerCase(),
    password: password,
    name: name,
    role: role,
    dashboard: getDashboardPath(role),
    createdAt: new Date().toISOString()
  };

  // Add to users array (in a real app, this would be saved to a database)
  users.push(newUser);

  // Store in localStorage for persistence during the session
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  registeredUsers.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

  return {
    success: true,
    message: 'Registration successful! You can now login.',
    user: {
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      dashboard: newUser.dashboard
    }
  };
};

// Load registered users from localStorage on app start
export const loadRegisteredUsers = () => {
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  registeredUsers.forEach(user => {
    const exists = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (!exists) {
      users.push(user);
    }
  });
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

// Get predefined users for reference (for testing purposes)
export const getPredefinedUsers = () => {
  return users.map(user => ({
    email: user.email,
    role: user.role,
    dashboard: user.dashboard
  }));
};