// Application state
let cart = [];
let currentUser = null;

// DOM elements
const sections = {
    home: document.getElementById('home'),
    products: document.getElementById('products'),
    contact: document.getElementById('contact')
};

const loginModal = document.getElementById('login-modal');
const toastContainer = document.getElementById('toast-container');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeLoginModal();
    initializeProductActions();
    initializeContactForm();
    initializeLoginForm();
    
    // Show home section by default
    showSection('home');
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const getStartedBtn = document.querySelector('[data-qa-id="get-started-button"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
        });
    });
    
    getStartedBtn.addEventListener('click', function() {
        showSection('products');
    });
}

// Show/hide sections
function showSection(sectionName) {
    Object.keys(sections).forEach(key => {
        sections[key].classList.add('hidden');
    });
    
    if (sections[sectionName]) {
        sections[sectionName].classList.remove('hidden');
    }
    
    // Update active navigation
    updateActiveNavigation(sectionName);
}

function updateActiveNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSection}`) {
            link.classList.add('active');
        }
    });
}

// Login modal functionality
function initializeLoginModal() {
    const loginBtn = document.querySelector('[data-qa-id="login-button"]');
    const closeBtn = document.querySelector('[data-qa-id="modal-close"]');
    
    loginBtn.addEventListener('click', function() {
        loginModal.classList.remove('hidden');
    });
    
    closeBtn.addEventListener('click', function() {
        loginModal.classList.add('hidden');
    });
    
    // Close modal when clicking outside
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.add('hidden');
        }
    });
}

// Login form functionality
function initializeLoginForm() {
    const loginForm = document.querySelector('[data-qa-id="login-form"]');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.querySelector('[data-qa-id="username-input"]').value;
        const password = document.querySelector('[data-qa-id="password-input"]').value;
        
        // Simple validation (for testing purposes)
        if (username && password) {
            if (username === 'admin' && password === 'password') {
                currentUser = { username: username };
                showToast('Login successful!', 'success');
                loginModal.classList.add('hidden');
                updateLoginButton();
                loginForm.reset();
            } else {
                showToast('Invalid credentials. Try admin/password', 'error');
            }
        } else {
            showToast('Please fill in all fields', 'error');
        }
    });
}

function updateLoginButton() {
    const loginBtn = document.querySelector('[data-qa-id="login-button"]');
    if (currentUser) {
        loginBtn.textContent = `Welcome, ${currentUser.username}`;
        loginBtn.style.backgroundColor = '#27ae60';
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.style.backgroundColor = '#3498db';
    }
}

// Product functionality
function initializeProductActions() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutBtn = document.querySelector('[data-qa-id="checkout-button"]');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('p').textContent;
            const productId = productCard.getAttribute('data-qa-id');
            
            addToCart({
                id: productId,
                name: productName,
                price: productPrice
            });
        });
    });
    
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            if (currentUser) {
                processCheckout();
            } else {
                showToast('Please login to checkout', 'info');
                loginModal.classList.remove('hidden');
            }
        }
    });
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showToast(`${product.name} added to cart!`, 'success');
}

function updateCartDisplay() {
    const cartItems = document.querySelector('[data-qa-id="cart-items"]');
    const cartTotal = document.querySelector('[data-qa-id="cart-total"]');
    const checkoutBtn = document.querySelector('[data-qa-id="checkout-button"]');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('$', ''));
        const itemTotal = price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-qa-id', `cart-item-${item.id}`);
        cartItem.innerHTML = `
            <span data-qa-id="cart-item-name">${item.name}</span>
            <span data-qa-id="cart-item-quantity">Qty: ${item.quantity}</span>
            <span data-qa-id="cart-item-price">$${itemTotal.toFixed(2)}</span>
            <button data-qa-id="remove-item-${item.id}" class="remove-item" onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    checkoutBtn.disabled = cart.length === 0;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    showToast('Item removed from cart', 'info');
}

function processCheckout() {
    // Simulate checkout process
    showToast('Processing checkout...', 'info');
    
    setTimeout(() => {
        cart = [];
        updateCartDisplay();
        showToast('Checkout completed successfully!', 'success');
    }, 2000);
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.querySelector('[data-qa-id="contact-form"]');
    const successMessage = document.querySelector('[data-qa-id="form-success"]');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (validateContactForm(data)) {
            // Simulate form submission
            showToast('Sending message...', 'info');
            
            setTimeout(() => {
                contactForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
                showToast('Message sent successfully!', 'success');
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.classList.remove('hidden');
                    successMessage.classList.add('hidden');
                }, 3000);
            }, 1500);
        }
    });
}

function validateContactForm(data) {
    const requiredFields = ['name', 'email', 'subject', 'message'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showToast(`Please fill in the ${field} field`, 'error');
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showToast('Please enter a valid email address', 'error');
        return false;
    }
    
    return true;
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('data-qa-id', 'toast-message');
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        if (!loginModal.classList.contains('hidden')) {
            loginModal.classList.add('hidden');
        }
    }
    
    // Quick navigation with Alt + number keys
    if (e.altKey) {
        switch(e.key) {
            case '1':
                showSection('home');
                break;
            case '2':
                showSection('products');
                break;
            case '3':
                showSection('contact');
                break;
        }
    }
});

// Utility functions for testing
window.testHelpers = {
    getCurrentSection: function() {
        return Object.keys(sections).find(key => !sections[key].classList.contains('hidden'));
    },
    
    getCartItems: function() {
        return cart;
    },
    
    getCurrentUser: function() {
        return currentUser;
    },
    
    clearCart: function() {
        cart = [];
        updateCartDisplay();
    },
    
    logout: function() {
        currentUser = null;
        updateLoginButton();
    }
};