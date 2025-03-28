document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const address = document.getElementById('address').value;
    
    // Basic validation
    if (!name || !phone || !password || !address) {
        alert('Please fill in all fields');
        return;
    }
    
    // Name validation
    if (name.length < 3) {
        alert('Name must be at least 3 characters long');
        return;
    }
    
    // Phone number validation (basic Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid Indian phone number');
        return;
    }
    
    // Password validation
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Address validation
    if (address.length < 10) {
        alert('Please enter a complete address (minimum 10 characters)');
        return;
    }
    
    // Store user data in localStorage (for demo purposes)
    const userData = {
        name: name,
        phone: phone,
        address: address,
        registeredAt: new Date().toISOString()
    };
    
    // Store the user data
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Show success message and redirect
    alert('Registration successful! Redirecting to dashboard...');
    window.location.href = 'index.html';
});