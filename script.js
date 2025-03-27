document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const profileBtn = document.getElementById('profileBtn');
    const listingsBtn = document.getElementById('listingsBtn');
    const profileSection = document.getElementById('profileSection');
    const listingsSection = document.getElementById('listingsSection');
    const actionCards = document.querySelector('.action-cards');
    const sellBtn = document.getElementById('sellBtn');
    const sellFormSection = document.getElementById('sellFormSection');
    const sellForm = document.getElementById('sellForm');
    const cancelSellBtn = document.getElementById('cancelSellBtn');
    const searchInput = document.getElementById('searchInput');
    const productFilter = document.getElementById('productFilter');
    const priceFilter = document.getElementById('priceFilter');
    const productCards = document.querySelectorAll('.product-card');

    // Toggle sidebar on mobile
    menuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Handle navigation
    profileBtn.addEventListener('click', function(e) {
        e.preventDefault();
        hideAllSections();
        profileSection.style.display = 'block';
        updateActiveLink(this);
    });

    listingsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        hideAllSections();
        listingsSection.style.display = 'block';
        updateActiveLink(this);
    });

    // Handle sell button click
    sellBtn.addEventListener('click', function() {
        hideAllSections();
        sellFormSection.style.display = 'block';
        actionCards.style.display = 'none';
    });

    // Handle cancel button click
    cancelSellBtn.addEventListener('click', function() {
        sellFormSection.style.display = 'none';
        actionCards.style.display = 'grid';
        sellForm.reset();
    });

    // Handle form submission if on sell page
    if (sellForm) {
        sellForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                product: document.getElementById('product').value,
                quantity: document.getElementById('quantity').value,
                price: document.getElementById('price').value
            };

            // Here you would typically send this data to your backend
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Product listed successfully!');
            
            // Redirect to listings page
            window.location.href = 'listings.html';
        });
    }

    // Handle action buttons
    document.querySelectorAll('.action-btn').forEach(button => {
        if (!button.id) { // Only for non-sell buttons
            button.addEventListener('click', function() {
                const action = this.closest('.card').classList.contains('sell-card') ? 'selling' : 'buying';
                alert(`Starting ${action} process...`);
                // Add your action handling logic here
            });
        }
    });

    // Handle search and filter functionality
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedProduct = productFilter.value.toLowerCase();
        const selectedPrice = priceFilter.value;

        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const sellerName = card.querySelector('.seller').textContent.toLowerCase();
            const price = parseInt(card.querySelector('.price').textContent.replace(/[^0-9]/g, ''));
            
            let matchesSearch = productName.includes(searchTerm) || sellerName.includes(searchTerm);
            let matchesProduct = !selectedProduct || productName === selectedProduct;
            let matchesPrice = true;

            if (selectedPrice) {
                const [min, max] = selectedPrice.split('-').map(Number);
                if (max) {
                    matchesPrice = price >= min && price <= max;
                } else {
                    matchesPrice = price >= min;
                }
            }

            if (matchesSearch && matchesProduct && matchesPrice) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add event listeners for search and filters
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    if (productFilter) {
        productFilter.addEventListener('change', filterProducts);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }

    // Handle buy button clicks
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const sellerName = productCard.querySelector('.seller').textContent;
            const price = productCard.querySelector('.price').textContent;
            
            alert(`Contacting seller for ${productName}\nSeller: ${sellerName}\nPrice: ${price}`);
            // Here you would typically implement the contact functionality
        });
    });

    // Helper functions
    function hideAllSections() {
        profileSection.style.display = 'none';
        listingsSection.style.display = 'none';
        sellFormSection.style.display = 'none';
    }

    function updateActiveLink(clickedLink) {
        // Remove active class from all links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        // Add active class to clicked link
        clickedLink.classList.add('active');
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}); 