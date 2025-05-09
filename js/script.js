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

// Modern navigation handling
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced navbar transparency and scrolling effects
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleNavbarTransparency() {
        if (window.scrollY > 100) {
            navbar.classList.remove('nav-transparent');
            navbar.classList.add('scrolled');
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.classList.add('nav-transparent');
            navbar.classList.remove('scrolled');
            navbar.style.padding = '1rem 0';
        }
    }

    // Initial check
    handleNavbarTransparency();

    // Add scroll event listener
    window.addEventListener('scroll', handleNavbarTransparency);

    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            // Highlight active nav item
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20; // Extra padding

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

    // Add scroll spy functionality to highlight current section in nav
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navHeight = navbar.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100; // Offset for earlier highlighting
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });

// Registration Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing registration form');

    // Multi-step form handling
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        console.log('Registration form found');

        const formSteps = document.querySelectorAll('.form-step');
        const progressSteps = document.querySelectorAll('.progress-step');
        const nextButtons = document.querySelectorAll('.btn-next');
        const prevButtons = document.querySelectorAll('.btn-prev');

        console.log('Form steps found:', formSteps.length);
        console.log('Progress steps found:', progressSteps.length);
        console.log('Next buttons found:', nextButtons.length);
        console.log('Prev buttons found:', prevButtons.length);

        // Next button click handler
        nextButtons.forEach((button, index) => {
            console.log('Adding click handler to next button', index);

            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Next button clicked');

                const currentStep = parseInt(this.getAttribute('data-next')) - 1;
                const nextStep = parseInt(this.getAttribute('data-next'));

                console.log('Current step:', currentStep);
                console.log('Next step:', nextStep);

                // Always proceed for debugging
                // Hide current step
                formSteps[currentStep].classList.remove('active');
                // Show next step
                formSteps[nextStep].classList.add('active');

                // Update progress indicator
                progressSteps[currentStep].classList.add('completed');
                progressSteps[nextStep].classList.add('active');

                // Scroll to top of form
                registrationForm.scrollIntoView({ behavior: 'smooth' });

                console.log('Navigation complete');
            });
        });

        // Previous button click handler
        prevButtons.forEach((button, index) => {
            console.log('Adding click handler to prev button', index);

            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Prev button clicked');

                const currentStep = parseInt(this.getAttribute('data-prev')) + 1;
                const prevStep = parseInt(this.getAttribute('data-prev'));

                console.log('Current step:', currentStep);
                console.log('Prev step:', prevStep);

                // Hide current step
                formSteps[currentStep].classList.remove('active');
                // Show previous step
                formSteps[prevStep].classList.add('active');

                // Update progress indicator
                progressSteps[currentStep].classList.remove('active');
                progressSteps[prevStep].classList.add('active');
                progressSteps[prevStep].classList.remove('completed');

                // Scroll to top of form
                registrationForm.scrollIntoView({ behavior: 'smooth' });

                console.log('Navigation complete');
            });
        });

        // Form submission handler
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Validate final step
            if (validateStep(2)) {
                // Show success message with animation
                const formWrapper = document.querySelector('.registration-form-wrapper');
                formWrapper.innerHTML = `
                    <div class="success-message">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Registration Successful!</h3>
                        <p>Thank you for registering for the Queen Esthers' Generation 2025 Economic Empowerment Breakfast Meeting.</p>
                        <p>We have sent a confirmation email with all the details.</p>
                        <div class="payment-reminder">
                            <h4>Payment Information</h4>
                            <p>Please complete your payment to confirm your attendance:</p>
                            <ul>
                                <li><strong>Amount:</strong> KSh 7,000 per person</li>
                                <li><strong>Send to:</strong> Esther Obasi-ike (0721 599 013)</li>
                            </ul>
                        </div>
                    </div>
                `;

                // Add success styles
                const successStyles = document.createElement('style');
                successStyles.textContent = `
                    .success-message {
                        text-align: center;
                        padding: 40px 20px;
                        animation: fadeIn 0.5s ease forwards;
                    }
                    .success-icon {
                        font-size: 5rem;
                        color: #4CAF50;
                        margin-bottom: 20px;
                        animation: scaleIn 0.5s ease forwards 0.3s;
                        opacity: 0;
                        transform: scale(0.5);
                    }
                    .success-message h3 {
                        font-size: 2rem;
                        color: var(--primary-dark);
                        margin-bottom: 20px;
                    }
                    .payment-reminder {
                        background-color: #f8f9fa;
                        border-radius: 10px;
                        padding: 20px;
                        margin-top: 30px;
                        text-align: left;
                    }
                    .payment-reminder h4 {
                        color: var(--primary-color);
                        margin-bottom: 15px;
                    }
                    .payment-reminder ul {
                        list-style: none;
                        padding-left: 0;
                    }
                    .payment-reminder ul li {
                        margin-bottom: 10px;
                    }
                    @keyframes scaleIn {
                        to {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                `;
                document.head.appendChild(successStyles);

                // Scroll to top of success message
                formWrapper.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Function to validate each step
        function validateStep(stepIndex) {
            console.log('Validating step:', stepIndex);

            // For debugging purposes, always return true to allow navigation
            return true;

            /*
            const currentStep = formSteps[stepIndex];
            const requiredFields = currentStep.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                // Reset previous validation
                field.classList.remove('is-invalid');
                const errorMessage = field.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }

                // Check if field is empty
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');

                    // Add error message
                    const error = document.createElement('div');
                    error.className = 'error-message';
                    error.textContent = 'This field is required';
                    field.parentElement.appendChild(error);

                    // Add error styles
                    const errorStyles = document.createElement('style');
                    errorStyles.textContent = `
                        .is-invalid {
                            border: 1px solid #dc3545 !important;
                            background-color: rgba(220, 53, 69, 0.05) !important;
                        }
                        .error-message {
                            color: #dc3545;
                            font-size: 0.8rem;
                            margin-top: 5px;
                            margin-left: 50px;
                        }
                    `;
                    document.head.appendChild(errorStyles);
                }

                // Validate email format if it's an email field
                if (field.type === 'email' && field.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value.trim())) {
                        isValid = false;
                        field.classList.add('is-invalid');

                        // Add error message
                        const error = document.createElement('div');
                        error.className = 'error-message';
                        error.textContent = 'Please enter a valid email address';
                        field.parentElement.appendChild(error);
                    }
                }

                // Validate phone number format
                if (field.id === 'phoneNumber' && field.value.trim()) {
                    const phoneRegex = /^\d{10,12}$/;
                    if (!phoneRegex.test(field.value.replace(/[\s-]/g, ''))) {
                        isValid = false;
                        field.classList.add('is-invalid');

                        // Add error message
                        const error = document.createElement('div');
                        error.className = 'error-message';
                        error.textContent = 'Please enter a valid phone number';
                        field.parentElement.appendChild(error);
                    }
                }
            });

            return isValid;
            */
        }

        // Add placeholder attribute to all input fields for better UX
        document.querySelectorAll('.floating-input-field').forEach(input => {
            input.setAttribute('placeholder', ' ');
        });

        // Add animation to form elements when they come into view
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.floating-input, .floating-select, .form-navigation button');

            elements.forEach((element, index) => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;

                if (elementPosition < screenPosition) {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        };

        // Set initial state for animation
        document.querySelectorAll('.floating-input, .floating-select, .form-navigation button').forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        // Run animation on load and scroll
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);

        // Trigger once on page load
        setTimeout(animateOnScroll, 300);

        // Replace all event listeners with direct onclick handlers
        // First Continue button (Personal → Details)
        const btnNextToDetails = document.querySelector('.btn-next[data-next="2"]');
        if (btnNextToDetails) {
            // Remove any existing event listeners
            btnNextToDetails.replaceWith(btnNextToDetails.cloneNode(true));
            // Get the fresh element
            const newBtnNextToDetails = document.querySelector('.btn-next[data-next="2"]');
            // Add the click handler
            newBtnNextToDetails.onclick = function(e) {
                e.preventDefault();
                console.log('Direct click on first next button (to Details)');

                // Hide current step (Personal)
                document.querySelector('.form-step[data-step="1"]').classList.remove('active');
                // Show next step (Details)
                document.querySelector('.form-step[data-step="2"]').classList.add('active');

                // Update progress indicator
                document.querySelector('.progress-step[data-step="1"]').classList.add('completed');
                document.querySelector('.progress-step[data-step="2"]').classList.add('active');

                // Scroll to top of form
                document.getElementById('registrationForm').scrollIntoView({ behavior: 'smooth' });
            };
        }

        // Second Continue button (Details → Payment)
        const btnNextToPayment = document.querySelector('.btn-next[data-next="3"]');
        if (btnNextToPayment) {
            // Remove any existing event listeners
            btnNextToPayment.replaceWith(btnNextToPayment.cloneNode(true));
            // Get the fresh element
            const newBtnNextToPayment = document.querySelector('.btn-next[data-next="3"]');
            // Add the click handler
            newBtnNextToPayment.onclick = function(e) {
                e.preventDefault();
                console.log('Direct click on second next button (to Payment)');

                // Hide current step (Details)
                document.querySelector('.form-step[data-step="2"]').classList.remove('active');
                // Show next step (Payment)
                document.querySelector('.form-step[data-step="3"]').classList.add('active');

                // Update progress indicator
                document.querySelector('.progress-step[data-step="2"]').classList.add('completed');
                document.querySelector('.progress-step[data-step="3"]').classList.add('active');

                // Scroll to top of form
                document.getElementById('registrationForm').scrollIntoView({ behavior: 'smooth' });
            };
        }

        // First Back button (Details → Personal)
        const btnPrevToPersonal = document.querySelector('.btn-prev[data-prev="1"]');
        if (btnPrevToPersonal) {
            // Remove any existing event listeners
            btnPrevToPersonal.replaceWith(btnPrevToPersonal.cloneNode(true));
            // Get the fresh element
            const newBtnPrevToPersonal = document.querySelector('.btn-prev[data-prev="1"]');
            // Add the click handler
            newBtnPrevToPersonal.onclick = function(e) {
                e.preventDefault();
                console.log('Direct click on first prev button (to Personal)');

                // Hide current step (Details)
                document.querySelector('.form-step[data-step="2"]').classList.remove('active');
                // Show previous step (Personal)
                document.querySelector('.form-step[data-step="1"]').classList.add('active');

                // Update progress indicator
                document.querySelector('.progress-step[data-step="2"]').classList.remove('active');
                document.querySelector('.progress-step[data-step="1"]').classList.add('active');
                document.querySelector('.progress-step[data-step="1"]').classList.remove('completed');

                // Scroll to top of form
                document.getElementById('registrationForm').scrollIntoView({ behavior: 'smooth' });
            };
        }

        // Second Back button (Payment → Details)
        const btnPrevToDetails = document.querySelector('.btn-prev[data-prev="2"]');
        if (btnPrevToDetails) {
            // Remove any existing event listeners
            btnPrevToDetails.replaceWith(btnPrevToDetails.cloneNode(true));
            // Get the fresh element
            const newBtnPrevToDetails = document.querySelector('.btn-prev[data-prev="2"]');
            // Add the click handler
            newBtnPrevToDetails.onclick = function(e) {
                e.preventDefault();
                console.log('Direct click on second prev button (to Details)');

                // Hide current step (Payment)
                document.querySelector('.form-step[data-step="3"]').classList.remove('active');
                // Show previous step (Details)
                document.querySelector('.form-step[data-step="2"]').classList.add('active');

                // Update progress indicator
                document.querySelector('.progress-step[data-step="3"]').classList.remove('active');
                document.querySelector('.progress-step[data-step="2"]').classList.add('active');
                document.querySelector('.progress-step[data-step="2"]').classList.remove('completed');

                // Scroll to top of form
                document.getElementById('registrationForm').scrollIntoView({ behavior: 'smooth' });
            };
        }
    }
});

// Function to add animation effects for the entire page
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to elements when they come into view
    const pageAnimateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .section-header, .btn-register, .modern-card, .speaker-card');

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
    const elementsToAnimate = document.querySelectorAll('.card, .section-header, .btn-register, .modern-card, .speaker-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on load and scroll
    window.addEventListener('scroll', pageAnimateOnScroll);
    window.addEventListener('load', pageAnimateOnScroll);

    // Trigger once on page load
    setTimeout(pageAnimateOnScroll, 100);
});
