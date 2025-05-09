/**
 * Registration Form Functionality
 * This file handles all the functionality for the multi-step registration form
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Registration form script loaded');
    initRegistrationForm();
});

/**
 * Initialize the registration form
 */
function initRegistrationForm() {
    const registrationForm = document.getElementById('registrationForm');
    if (!registrationForm) {
        console.log('Registration form not found on this page');
        return;
    }

    console.log('Initializing registration form');

    // Get all form elements
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');

    console.log(`Found ${formSteps.length} form steps`);
    console.log(`Found ${progressSteps.length} progress steps`);
    console.log(`Found ${nextButtons.length} next buttons`);
    console.log(`Found ${prevButtons.length} prev buttons`);

    // Initialize the form
    setupFormNavigation(formSteps, progressSteps, nextButtons, prevButtons);
    setupFormValidation(formSteps);
    setupFormSubmission(registrationForm, formSteps);
    setupFormAnimations();
}

/**
 * Set up the navigation between form steps
 */
function setupFormNavigation(formSteps, progressSteps, nextButtons, prevButtons) {
    // Set up next buttons
    nextButtons.forEach((button) => {
        const nextStep = parseInt(button.getAttribute('data-next'));
        const currentStep = nextStep - 1;

        // Remove any existing click handlers
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        // Add click handler
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Navigating from step ${currentStep} to step ${nextStep}`);

            // Hide current step
            formSteps[currentStep].classList.remove('active');
            // Show next step
            formSteps[nextStep].classList.add('active');

            // Update progress indicator
            progressSteps[currentStep].classList.add('completed');
            progressSteps[nextStep].classList.add('active');

            // Scroll to top of form
            scrollToForm();
        });
    });

    // Set up previous buttons
    prevButtons.forEach((button) => {
        const prevStep = parseInt(button.getAttribute('data-prev'));
        const currentStep = prevStep + 1;

        // Remove any existing click handlers
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        // Add click handler
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Navigating from step ${currentStep} to step ${prevStep}`);

            // Hide current step
            formSteps[currentStep].classList.remove('active');
            // Show previous step
            formSteps[prevStep].classList.add('active');

            // Update progress indicator
            progressSteps[currentStep].classList.remove('active');
            progressSteps[prevStep].classList.add('active');
            progressSteps[prevStep].classList.remove('completed');

            // Scroll to top of form
            scrollToForm();
        });
    });

    // Add direct click handlers as a fallback
    setupDirectClickHandlers(formSteps, progressSteps);
}

/**
 * Set up direct click handlers for the navigation buttons
 */
function setupDirectClickHandlers(formSteps, progressSteps) {
    // First Continue button (Personal → Details)
    const btnNextToDetails = document.querySelector('.btn-next[data-next="2"]');
    if (btnNextToDetails) {
        // Add multiple event handlers to ensure it works
        btnNextToDetails.onclick = navigateToDetails;
        btnNextToDetails.addEventListener('click', navigateToDetails);

        // Also add handler by ID
        const btnToDetailsById = document.getElementById('btn-to-details');
        if (btnToDetailsById) {
            btnToDetailsById.onclick = navigateToDetails;
            btnToDetailsById.addEventListener('click', navigateToDetails);
        }
    }

    // Second Continue button (Details → Payment)
    const btnNextToPayment = document.querySelector('.btn-next[data-next="3"]');
    if (btnNextToPayment) {
        // Add multiple event handlers to ensure it works
        btnNextToPayment.onclick = navigateToPayment;
        btnNextToPayment.addEventListener('click', navigateToPayment);

        // Also add handler by ID
        const btnToPaymentById = document.getElementById('btn-to-payment');
        if (btnToPaymentById) {
            btnToPaymentById.onclick = navigateToPayment;
            btnToPaymentById.addEventListener('click', navigateToPayment);
        }
    }

    // Add global click handler for navigation buttons
    document.addEventListener('click', function(e) {
        // Check if the clicked element is a continue button or its child
        if (e.target.matches('.btn-next[data-next="2"], .btn-next[data-next="2"] *')) {
            navigateToDetails(e);
        } else if (e.target.matches('.btn-next[data-next="3"], .btn-next[data-next="3"] *')) {
            navigateToPayment(e);
        }
    });

    // Add keyboard handler for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement.matches('.btn-next[data-next="2"]')) {
                navigateToDetails(e);
            } else if (activeElement.matches('.btn-next[data-next="3"]')) {
                navigateToPayment(e);
            }
        }
    });
}

/**
 * Navigate from Personal to Details step
 */
function navigateToDetails(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    console.log('Navigating to Details step');

    // Hide current step (Personal)
    document.querySelector('.form-step[data-step="1"]').classList.remove('active');
    // Show next step (Details)
    document.querySelector('.form-step[data-step="2"]').classList.add('active');

    // Update progress indicator
    document.querySelector('.progress-step[data-step="1"]').classList.add('completed');
    document.querySelector('.progress-step[data-step="2"]').classList.add('active');

    // Scroll to top of form
    scrollToForm();

    return false;
}

/**
 * Navigate from Details to Payment step
 */
function navigateToPayment(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    console.log('Navigating to Payment step');

    // Hide current step (Details)
    document.querySelector('.form-step[data-step="2"]').classList.remove('active');
    // Show next step (Payment)
    document.querySelector('.form-step[data-step="3"]').classList.add('active');

    // Update progress indicator
    document.querySelector('.progress-step[data-step="2"]').classList.add('completed');
    document.querySelector('.progress-step[data-step="3"]').classList.add('active');

    // Scroll to top of form
    scrollToForm();

    return false;
}

/**
 * Set up form validation
 */
function setupFormValidation(formSteps) {
    // Add placeholder attribute to all input fields for better UX
    document.querySelectorAll('.floating-input-field').forEach(input => {
        input.setAttribute('placeholder', ' ');
    });
}

/**
 * Set up form submission
 */
function setupFormSubmission(registrationForm, formSteps) {
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        console.log('Form submitted');

        // Show success message
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
    });
}

/**
 * Set up animations for form elements
 */
function setupFormAnimations() {
    // Set initial state for animation
    document.querySelectorAll('.floating-input, .floating-select, .form-navigation button').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
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

    // Run animation on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Trigger once on page load
    setTimeout(animateOnScroll, 300);
}

/**
 * Scroll to the top of the form
 */
function scrollToForm() {
    const form = document.getElementById('registrationForm');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
    }
}
