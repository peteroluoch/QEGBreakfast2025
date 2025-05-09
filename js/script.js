// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation and submission
    if (registrationForm) {
        // Add input event listeners for real-time validation
        const inputs = registrationForm.querySelectorAll('input[required], select[required]');

        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateInput(this);
                }
            });
        });

        // Form submission handler
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get form values
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email')?.value.trim() || '';
            const phoneNumber = document.getElementById('phoneNumber').value.trim();
            const organization = document.getElementById('organization')?.value.trim() || '';
            const paymentOption = document.getElementById('paymentOption').value;
            const termsCheck = document.getElementById('termsCheck').checked;

            // Validate all inputs
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                showAlert('Please correct the errors in the form', 'danger');
                return;
            }

            // If validation passes, show success message and redirect
            showAlert('Registration successful! Redirecting to confirmation page...', 'success');

            // In a real application, you would send this data to a server
            console.log('Form submitted with:', {
                firstName,
                lastName,
                email,
                phoneNumber,
                organization,
                paymentOption,
                termsAgreed: termsCheck
            });

            // Redirect to success page after a short delay
            setTimeout(() => {
                window.location.href = 'success.html';
            }, 2000);
        });
    }
});

// Function to validate individual input
function validateInput(input) {
    let isValid = true;
    const value = input.value.trim();

    // Remove any existing validation classes
    input.classList.remove('is-invalid', 'is-valid');

    // Check if the input is required and empty
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        setInvalidFeedback(input, 'This field is required');
    }
    // Validate email format
    else if (input.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        setInvalidFeedback(input, 'Please enter a valid email address');
    }
    // Validate phone number
    else if (input.id === 'phoneNumber' && value) {
        const phoneRegex = /^\d{10,12}$/;
        if (!phoneRegex.test(value.replace(/[\s-]/g, ''))) {
            isValid = false;
            setInvalidFeedback(input, 'Please enter a valid phone number');
        }
    }
    // Validate checkbox
    else if (input.type === 'checkbox' && input.hasAttribute('required') && !input.checked) {
        isValid = false;
        setInvalidFeedback(input, 'You must agree to the terms and conditions');
    }

    // Add valid class if valid
    if (isValid && value) {
        input.classList.add('is-valid');
    }

    return isValid;
}

// Helper function to set invalid feedback
function setInvalidFeedback(input, message) {
    input.classList.add('is-invalid');

    // Remove any existing feedback
    const parent = input.parentElement;
    const existingFeedback = parent.querySelector('.invalid-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    // Create and append new feedback
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = message;

    // If input is in an input group, append to the parent
    if (parent.classList.contains('input-group')) {
        parent.parentElement.appendChild(feedback);
    } else {
        parent.appendChild(feedback);
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to show alert messages
function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Find the form and insert alert before it
    const form = document.getElementById('registrationForm');
    const formCard = form.closest('.card-body');
    formCard.insertBefore(alertDiv, form);

    // Scroll to the alert
    alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Auto dismiss after 5 seconds
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alertDiv);
        bsAlert.close();
    }, 5000);
}

// Function to handle navigation bar transparency
document.addEventListener('DOMContentLoaded', function() {
    // Handle navbar transparency on scroll
    const navbar = document.querySelector('.navbar');

    function handleNavbarTransparency() {
        if (window.scrollY > 100) {
            navbar.classList.remove('nav-transparent');
            navbar.classList.add('bg-primary');
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.classList.add('nav-transparent');
            navbar.classList.remove('bg-primary');
            navbar.style.padding = '1rem 0';
        }
    }

    // Initial check
    handleNavbarTransparency();

    // Add scroll event listener
    window.addEventListener('scroll', handleNavbarTransparency);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

// Function to add animation effects
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .section-header, .btn-register');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    const elementsToAnimate = document.querySelectorAll('.card, .section-header, .btn-register');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Trigger once on page load
    setTimeout(animateOnScroll, 100);
});
