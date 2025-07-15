# Cypress Test Application

A basic web application designed for Cypress testing practice, featuring comprehensive `data-qa-id` attributes following Cypress best practices.

## Features

- **Navigation**: Multi-section single-page application (Home, Products, Contact)
- **User Authentication**: Login modal with simple validation
- **E-commerce Elements**: Product catalog, shopping cart, checkout process
- **Forms**: Contact form with validation and different input types
- **Interactive Elements**: Modals, toast notifications, dynamic content
- **Responsive Design**: Mobile-friendly layout

## Cypress Best Practices Implemented

### Data Attributes
- All interactive elements have `data-qa-id` attributes
- Consistent naming convention: `data-qa-id="element-description"`
- Specific selectors for testing different states and actions

### Test-Friendly Features
- Predictable application state
- Clear success/error feedback via toast notifications
- Form validation with specific error messages
- Modal interactions
- Dynamic content updates (cart, user login state)
- Keyboard navigation support

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   This will start the application at `http://localhost:3000` and open it in your browser.

3. **Alternative start command:**
   ```bash
   npm start
   ```
   Starts the server without opening the browser.

## Application Structure

### Sections
- **Home**: Landing page with welcome message and call-to-action
- **Products**: Product catalog with add-to-cart functionality
- **Contact**: Contact form with validation

### Key Interactive Elements

#### Navigation
- `data-qa-id="nav-home"` - Home navigation link
- `data-qa-id="nav-products"` - Products navigation link  
- `data-qa-id="nav-contact"` - Contact navigation link
- `data-qa-id="login-button"` - Login button

#### Products Section
- `data-qa-id="product-1"` - First product card
- `data-qa-id="add-to-cart-1"` - Add to cart button for product 1
- `data-qa-id="cart-summary"` - Shopping cart summary
- `data-qa-id="checkout-button"` - Checkout button

#### Contact Form
- `data-qa-id="contact-form"` - Main contact form
- `data-qa-id="name-input"` - Name input field
- `data-qa-id="email-input"` - Email input field
- `data-qa-id="subject-select"` - Subject dropdown
- `data-qa-id="message-textarea"` - Message textarea
- `data-qa-id="submit-button"` - Form submit button

#### Login Modal
- `data-qa-id="login-modal"` - Login modal container
- `data-qa-id="username-input"` - Username input
- `data-qa-id="password-input"` - Password input
- `data-qa-id="login-submit"` - Login form submit button
- `data-qa-id="modal-close"` - Modal close button

#### Notifications
- `data-qa-id="toast-message"` - Toast notification messages

## Test Credentials

For testing the login functionality:
- **Username**: `admin`
- **Password**: `password`

## Test Scenarios to Implement

### Navigation Testing
- Test navigation between sections
- Verify active section highlighting
- Test keyboard navigation (Alt + 1/2/3)

### User Authentication
- Test login modal open/close
- Test successful login
- Test failed login with invalid credentials
- Test form validation

### E-commerce Flow
- Add products to cart
- Remove products from cart
- Test checkout process (requires login)
- Verify cart total calculations

### Form Testing
- Test contact form validation
- Test different input types (text, email, select, textarea, checkbox)
- Test successful form submission
- Test error handling

### UI Interactions
- Test modal interactions
- Test toast notifications
- Test responsive design elements
- Test loading states

## Test Helpers

The application includes test helper functions accessible via `window.testHelpers`:

```javascript
// Get current visible section
window.testHelpers.getCurrentSection()

// Get cart contents
window.testHelpers.getCartItems()

// Get current user
window.testHelpers.getCurrentUser()

// Clear cart
window.testHelpers.clearCart()

// Logout user
window.testHelpers.logout()
```

## Cypress Configuration

The application works with the existing Cypress setup in this repository. Use:

```bash
npm run cypress:open  # Open Cypress Test Runner
npm run cypress:run   # Run tests headlessly
```

## Browser Support

The application is designed to work in all modern browsers and includes fallbacks for older browsers.