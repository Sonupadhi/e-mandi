// Add loading state to button
const loginButton = document.querySelector('.login-btn');
const originalButtonText = loginButton.textContent;

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    loginButton.textContent = 'Logging in...';
    loginButton.disabled = true;
    
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    
    // Get stored user data from registration
    const storedUserData = localStorage.getItem('userData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    
    // Basic validation with friendly messages
    if (!phone || !password) {
        showError('Please fill in all fields to continue');
        resetButton();
        return;
    }
    
    // Phone number validation with helpful message
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        showError('Please enter a valid 10-digit Indian mobile number');
        resetButton();
        return;
    }
    
    // Simulate network delay for better UX
    setTimeout(() => {
        // Check if user exists and password matches
        if (userData && userData.phone === phone) {
            // Store login status
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            // Show success message with user's name
            showSuccess(`Welcome back, ${userData.name}! Redirecting to dashboard...`);
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showError('Invalid phone number or password. Please try again.');
            resetButton();
        }
    }, 1000);
});

// Helper functions for better user experience
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Remove any existing error message
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Insert error message before the form
    const form = document.getElementById('loginForm');
    form.parentNode.insertBefore(errorDiv, form);
    
    // Remove error message after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    // Remove any existing success message
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Insert success message before the form
    const form = document.getElementById('loginForm');
    form.parentNode.insertBefore(successDiv, form);
}

function resetButton() {
    loginButton.textContent = originalButtonText;
    loginButton.disabled = false;
} 