/**
 * Enhanced Form Navigation Script
 * Includes validation, error messages, and redirection to thank you page
 */

// Validation helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Basic phone validation - allows various formats
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
}

function showValidationMessage(field, message) {
    // Remove any existing message
    hideValidationMessage(field);

    // Create and add new message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';

    // Insert after the field
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

function hideValidationMessage(field) {
    const existingError = field.nextElementSibling;
    if (existingError && existingError.className === 'invalid-feedback') {
        existingError.remove();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple form navigation script loaded');
    initFormNavigation();
});

function initFormNavigation() {
    // Get form elements
    const form = document.getElementById('registrationForm');
    if (!form) {
        console.error('Registration form not found');
        return;
    }

    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');

    console.log(`Found ${formSteps.length} form steps`);
    console.log(`Found ${progressSteps.length} progress steps`);
    console.log(`Found ${nextButtons.length} next buttons`);
    console.log(`Found ${prevButtons.length} prev buttons`);

    // Add click event listeners to next buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const currentStep = parseInt(this.closest('.form-step').getAttribute('data-step'));
            const nextStep = parseInt(this.getAttribute('data-next'));

            console.log(`Clicked next button: current step ${currentStep}, next step ${nextStep}`);

            // Enhanced validation for current step
            const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            const requiredFields = currentStepElement.querySelectorAll('[required]');
            const emailFields = currentStepElement.querySelectorAll('input[type="email"]');
            const phoneFields = currentStepElement.querySelectorAll('input[type="tel"]');
            const selectFields = currentStepElement.querySelectorAll('select[required]');
            let isValid = true;

            // Validate required fields
            requiredFields.forEach(field => {
                if (field.type === 'checkbox' && !field.checked) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    showValidationMessage(field, 'This checkbox is required');
                } else if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    showValidationMessage(field, 'This field is required');
                } else {
                    field.classList.remove('is-invalid');
                    hideValidationMessage(field);
                }
            });

            // Validate email fields
            emailFields.forEach(field => {
                if (field.value.trim() && !isValidEmail(field.value)) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    showValidationMessage(field, 'Please enter a valid email address');
                }
            });

            // Validate phone fields
            phoneFields.forEach(field => {
                if (field.value.trim() && !isValidPhone(field.value)) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    showValidationMessage(field, 'Please enter a valid phone number');
                }
            });

            // Validate select fields
            selectFields.forEach(field => {
                if (field.value === '') {
                    isValid = false;
                    field.classList.add('is-invalid');
                    showValidationMessage(field, 'Please select an option');
                }
            });

            if (!isValid) {
                console.log('Validation failed');
                // Scroll to the first invalid field
                const firstInvalidField = currentStepElement.querySelector('.is-invalid');
                if (firstInvalidField) {
                    firstInvalidField.focus();
                    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // Hide current step
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');

            // Show next step
            document.querySelector(`.form-step[data-step="${nextStep}"]`).classList.add('active');

            // Update progress indicator
            document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('completed');
            document.querySelector(`.progress-step[data-step="${nextStep}"]`).classList.add('active');

            // Scroll to top of form
            form.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Add click event listeners to previous buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const prevStep = parseInt(this.getAttribute('data-prev'));
            const currentStep = parseInt(this.closest('.form-step').getAttribute('data-step'));

            console.log(`Clicked prev button: current step ${currentStep}, prev step ${prevStep}`);

            // Hide current step
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');

            // Show previous step
            document.querySelector(`.form-step[data-step="${prevStep}"]`).classList.add('active');

            // Update progress indicator
            document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
            document.querySelector(`.progress-step[data-step="${prevStep}"]`).classList.add('active');
            document.querySelector(`.progress-step[data-step="${prevStep}"]`).classList.remove('completed');

            // Scroll to top of form
            form.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // We're not using the form submit event anymore
    // The button click handler in index.html handles the submission

    // Add CSS for validation
    const style = document.createElement('style');
    style.textContent = `
        .is-invalid {
            border-color: #dc3545 !important;
            background-color: rgba(220, 53, 69, 0.05) !important;
        }
        .invalid-feedback {
            display: block;
            width: 100%;
            margin-top: 0.25rem;
            font-size: 0.875em;
            color: #dc3545;
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    console.log('Form navigation initialized successfully');
}
