/**
 * Registration Form Functionality
 * This file handles all the functionality for the multi-step registration form
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Registration form script loaded');
    initRegistrationForm();
});

/**
 * Initialize the registration form with enhanced reliability
 */
function initRegistrationForm() {
    console.log('Starting registration form initialization');

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        console.log('Document still loading, adding event listener');
        document.addEventListener('DOMContentLoaded', initRegistrationFormCore);
    } else {
        console.log('Document already loaded, initializing immediately');
        initRegistrationFormCore();
    }

    // Add a fallback initialization after a short delay
    setTimeout(function() {
        console.log('Running delayed initialization as fallback');
        initRegistrationFormCore();
    }, 500);
}

/**
 * Core initialization function for the registration form
 */
function initRegistrationFormCore() {
    // Check if already initialized to prevent duplicate initialization
    if (window.formInitialized) {
        console.log('Form already initialized, skipping');
        return;
    }

    const registrationForm = document.getElementById('registrationForm');
    if (!registrationForm) {
        console.error('Registration form not found on this page');
        return;
    }

    console.log('Initializing registration form core functionality');

    // Get all form elements
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');

    console.log(`Found ${formSteps.length} form steps`);
    console.log(`Found ${progressSteps.length} progress steps`);
    console.log(`Found ${nextButtons.length} next buttons`);
    console.log(`Found ${prevButtons.length} prev buttons`);

    // Verify all required elements are present
    if (formSteps.length === 0 || progressSteps.length === 0 || nextButtons.length === 0) {
        console.error('Missing required form elements, cannot initialize');
        return;
    }

    // Initialize the form components
    try {
        setupFormNavigation(formSteps, progressSteps, nextButtons, prevButtons);
        setupFormValidation(formSteps);
        setupFormSubmission(registrationForm, formSteps);
        setupFormAnimations();

        // Mark as initialized
        window.formInitialized = true;

        console.log('Registration form successfully initialized');

        // Add a class to the form to indicate it's ready
        registrationForm.classList.add('form-initialized');

        // Add visual indicator that form is ready
        const formReadyStyle = document.createElement('style');
        formReadyStyle.textContent = `
            .form-initialized .btn-next,
            .form-initialized .btn-prev,
            .form-initialized .btn-submit {
                position: relative;
                overflow: hidden;
            }

            .form-initialized .btn-next::after,
            .form-initialized .btn-submit::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
                animation: button-shine 2s ease-in-out;
            }

            @keyframes button-shine {
                0% { left: -100%; }
                100% { left: 100%; }
            }
        `;
        document.head.appendChild(formReadyStyle);
    } catch (error) {
        console.error('Error initializing form:', error);
    }
}

/**
 * Set up the navigation between form steps
 */
function setupFormNavigation(formSteps, progressSteps, nextButtons, prevButtons) {
    console.log('Setting up form navigation with enhanced reliability');

    // Set up next buttons with validation
    nextButtons.forEach((button) => {
        const nextStep = parseInt(button.getAttribute('data-next'));
        const currentStep = nextStep - 1;

        // Remove any existing click handlers by replacing the button
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        // Add multiple event handlers for better reliability
        ['click', 'touchend'].forEach(eventType => {
            newButton.addEventListener(eventType, function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`${eventType} event on next button from step ${currentStep} to step ${nextStep}`);

                // Add visual feedback
                this.classList.add('button-clicked');
                setTimeout(() => {
                    this.classList.remove('button-clicked');
                }, 300);

                // Validate current step before proceeding
                if (currentStep === 0) {
                    navigateToDetails(e);
                } else if (currentStep === 1) {
                    navigateToPayment(e);
                }
            });
        });

        // Add data attribute for easier debugging
        newButton.setAttribute('data-initialized', 'true');
    });

    // Set up previous buttons
    prevButtons.forEach((button) => {
        const prevStep = parseInt(button.getAttribute('data-prev'));
        const currentStep = prevStep + 1;

        // Remove any existing click handlers by replacing the button
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        // Add multiple event handlers for better reliability
        ['click', 'touchend'].forEach(eventType => {
            newButton.addEventListener(eventType, function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`${eventType} event on prev button from step ${currentStep} to step ${prevStep}`);

                // Add visual feedback
                this.classList.add('button-clicked');
                setTimeout(() => {
                    this.classList.remove('button-clicked');
                }, 300);

                // Back buttons always work without validation
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

                // Log success
                console.log(`Successfully navigated back to step ${prevStep}`);
            });
        });

        // Add data attribute for easier debugging
        newButton.setAttribute('data-initialized', 'true');
    });

    // Add direct click handlers as a fallback
    setupDirectClickHandlers(formSteps, progressSteps);

    // Add CSS for button click feedback
    const buttonStyles = document.createElement('style');
    buttonStyles.textContent = `
        .button-clicked {
            transform: scale(0.95) !important;
            opacity: 0.9 !important;
            transition: transform 0.1s ease, opacity 0.1s ease !important;
        }
    `;
    document.head.appendChild(buttonStyles);

    console.log('Form navigation setup complete');
}

/**
 * Set up direct click handlers for the navigation buttons
 * This provides multiple redundant ways to ensure buttons work
 */
function setupDirectClickHandlers(formSteps, progressSteps) {
    console.log('Setting up direct click handlers as fallback');

    // First Continue button (Personal → Details)
    const btnNextToDetails = document.querySelector('.btn-next[data-next="2"]');
    if (btnNextToDetails) {
        console.log('Found first continue button by selector');

        // Add multiple event handlers to ensure it works
        const detailsHandlers = ['click', 'touchend', 'mouseup'];
        detailsHandlers.forEach(eventType => {
            btnNextToDetails.addEventListener(eventType, function(e) {
                console.log(`${eventType} event triggered on first continue button`);
                navigateToDetails(e);
            }, { capture: true });
        });

        // Also add handler by ID for extra reliability
        const btnToDetailsById = document.getElementById('btn-to-details');
        if (btnToDetailsById) {
            console.log('Found first continue button by ID');
            detailsHandlers.forEach(eventType => {
                btnToDetailsById.addEventListener(eventType, function(e) {
                    console.log(`${eventType} event triggered on first continue button (by ID)`);
                    navigateToDetails(e);
                }, { capture: true });
            });
        }
    } else {
        console.error('First continue button not found!');
    }

    // Second Continue button (Details → Payment)
    const btnNextToPayment = document.querySelector('.btn-next[data-next="3"]');
    if (btnNextToPayment) {
        console.log('Found second continue button by selector');

        // Add multiple event handlers to ensure it works
        const paymentHandlers = ['click', 'touchend', 'mouseup'];
        paymentHandlers.forEach(eventType => {
            btnNextToPayment.addEventListener(eventType, function(e) {
                console.log(`${eventType} event triggered on second continue button`);
                navigateToPayment(e);
            }, { capture: true });
        });

        // Also add handler by ID for extra reliability
        const btnToPaymentById = document.getElementById('btn-to-payment');
        if (btnToPaymentById) {
            console.log('Found second continue button by ID');
            paymentHandlers.forEach(eventType => {
                btnToPaymentById.addEventListener(eventType, function(e) {
                    console.log(`${eventType} event triggered on second continue button (by ID)`);
                    navigateToPayment(e);
                }, { capture: true });
            });
        }
    } else {
        console.error('Second continue button not found!');
    }

    // Add global click handler for navigation buttons (delegation pattern)
    document.addEventListener('click', function(e) {
        // Check if the clicked element is a continue button or its child
        if (e.target.closest('.btn-next[data-next="2"]')) {
            console.log('Global click handler caught first continue button click');
            navigateToDetails(e);
        } else if (e.target.closest('.btn-next[data-next="3"]')) {
            console.log('Global click handler caught second continue button click');
            navigateToPayment(e);
        }

        // Also check for back buttons
        if (e.target.closest('.btn-prev[data-prev="1"]')) {
            console.log('Global click handler caught first back button click');
            navigateBack(1, 2, e);
        } else if (e.target.closest('.btn-prev[data-prev="2"]')) {
            console.log('Global click handler caught second back button click');
            navigateBack(2, 3, e);
        }
    }, { capture: true });

    // Add keyboard handler for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const activeElement = document.activeElement;
            if (activeElement.matches('.btn-next[data-next="2"]') || activeElement.id === 'btn-to-details') {
                console.log('Keyboard handler triggered first continue button');
                navigateToDetails(e);
            } else if (activeElement.matches('.btn-next[data-next="3"]') || activeElement.id === 'btn-to-payment') {
                console.log('Keyboard handler triggered second continue button');
                navigateToPayment(e);
            } else if (activeElement.matches('.btn-prev[data-prev="1"]')) {
                console.log('Keyboard handler triggered first back button');
                navigateBack(1, 2, e);
            } else if (activeElement.matches('.btn-prev[data-prev="2"]')) {
                console.log('Keyboard handler triggered second back button');
                navigateBack(2, 3, e);
            }
        }
    });

    console.log('Direct click handlers setup complete');
}

/**
 * Helper function for back button navigation
 */
function navigateBack(prevStep, currentStep, e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    console.log(`Navigating back from step ${currentStep} to step ${prevStep}`);

    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    // Show previous step
    document.querySelector(`.form-step[data-step="${prevStep}"]`).classList.add('active');

    // Update progress indicator
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.progress-step[data-step="${prevStep}"]`).classList.add('active');
    document.querySelector(`.progress-step[data-step="${prevStep}"]`).classList.remove('completed');

    // Scroll to top of form
    scrollToForm();

    console.log(`Successfully navigated back to step ${prevStep}`);
}

/**
 * Navigate from Personal to Details step
 */
function navigateToDetails(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    console.log('Attempting to navigate to Details step');

    // Validate the Personal Information step first
    if (!validateStep(0)) {
        console.log('Personal Information validation failed');
        showValidationError('Please complete all required fields in the Personal Information section before proceeding.');
        return false;
    }

    console.log('Personal Information validation passed, proceeding to Details step');

    // Hide current step (Personal)
    document.querySelector('.form-step[data-step="1"]').classList.remove('active');
    // Show next step (Details)
    document.querySelector('.form-step[data-step="2"]').classList.add('active');

    // Update progress indicator
    document.querySelector('.progress-step[data-step="1"]').classList.add('completed');
    document.querySelector('.progress-step[data-step="2"]').classList.add('active');

    // Save form data to sessionStorage
    saveFormData();

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
    console.log('Attempting to navigate to Payment step');

    // Validate the Details step first
    if (!validateStep(1)) {
        console.log('Details validation failed');
        showValidationError('Please complete all required fields in the Details section before proceeding.');
        return false;
    }

    console.log('Details validation passed, proceeding to Payment step');

    // Hide current step (Details)
    document.querySelector('.form-step[data-step="2"]').classList.remove('active');
    // Show next step (Payment)
    document.querySelector('.form-step[data-step="3"]').classList.add('active');

    // Update progress indicator
    document.querySelector('.progress-step[data-step="2"]').classList.add('completed');
    document.querySelector('.progress-step[data-step="3"]').classList.add('active');

    // Save form data to sessionStorage
    saveFormData();

    // Scroll to top of form
    scrollToForm();

    return false;
}

/**
 * Show validation error message
 */
function showValidationError(message) {
    // Create error message element if it doesn't exist
    let errorMessage = document.querySelector('.form-validation-error');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'form-validation-error';
        const form = document.getElementById('registrationForm');
        form.parentNode.insertBefore(errorMessage, form);
    }

    // Set error message
    errorMessage.innerHTML = `
        <div class="validation-error-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;

    // Add error styles
    const errorStyles = document.createElement('style');
    errorStyles.textContent = `
        .form-validation-error {
            background-color: rgba(220, 53, 69, 0.1);
            border-left: 4px solid #dc3545;
            color: #dc3545;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
            animation: shake 0.5s ease-in-out;
        }

        .validation-error-content {
            display: flex;
            align-items: center;
        }

        .validation-error-content i {
            font-size: 1.5rem;
            margin-right: 10px;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(errorStyles);

    // Scroll to error message
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Remove error message after 5 seconds
    setTimeout(() => {
        errorMessage.style.opacity = '0';
        errorMessage.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            if (errorMessage.parentNode) {
                errorMessage.parentNode.removeChild(errorMessage);
            }
        }, 500);
    }, 5000);
}

/**
 * Save form data to sessionStorage
 */
function saveFormData() {
    const formData = {
        firstName: document.getElementById('firstName')?.value || '',
        lastName: document.getElementById('lastName')?.value || '',
        email: document.getElementById('email')?.value || '',
        phoneNumber: document.getElementById('phone')?.value || '',
        organization: document.getElementById('organization')?.value || '',
        position: document.getElementById('position')?.value || '',
        industry: document.getElementById('industry')?.value || '',
        paymentOption: document.querySelector('input[name="paymentOption"]:checked')?.value || 'mpesa'
    };

    sessionStorage.setItem('registrationFormData', JSON.stringify(formData));
    console.log('Form data saved to sessionStorage:', formData);
}

/**
 * Set up form validation
 */
function setupFormValidation(formSteps) {
    // Add placeholder attribute to all input fields for better UX
    document.querySelectorAll('.floating-input-field').forEach(input => {
        input.setAttribute('placeholder', ' ');

        // Add input event listeners for real-time validation
        input.addEventListener('blur', function() {
            validateInput(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateInput(this);
            }
        });
    });

    // Load saved form data if available
    loadFormData();
}

/**
 * Validate a specific step in the form
 * @param {number} stepIndex - The index of the step to validate (0-based)
 * @returns {boolean} - Whether the step is valid
 */
function validateStep(stepIndex) {
    console.log(`Validating step ${stepIndex}`);
    const formSteps = document.querySelectorAll('.form-step');

    if (stepIndex < 0 || stepIndex >= formSteps.length) {
        console.error(`Invalid step index: ${stepIndex}`);
        return false;
    }

    const currentStep = formSteps[stepIndex];
    const requiredFields = currentStep.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateInput(field)) {
            isValid = false;
        }
    });

    // Special validation for the terms checkbox in step 2
    if (stepIndex === 2) {
        const termsCheck = document.getElementById('termsCheck');
        const termsErrorMessage = document.querySelector('.terms-error-message');

        // Clear any existing error message
        if (termsErrorMessage) {
            termsErrorMessage.textContent = '';
        }

        if (termsCheck && !termsCheck.checked) {
            isValid = false;

            // Show error message
            if (termsErrorMessage) {
                termsErrorMessage.textContent = 'You must agree to the terms and conditions';
                termsErrorMessage.style.color = '#dc3545';
                termsErrorMessage.style.fontSize = '0.8rem';
                termsErrorMessage.style.marginTop = '5px';

                // Add shake animation
                termsErrorMessage.style.animation = 'shake 0.5s ease-in-out';
            }
        }
    }

    return isValid;
}

/**
 * Validate an individual input field
 * @param {HTMLElement} input - The input element to validate
 * @returns {boolean} - Whether the input is valid
 */
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;

    // Remove any existing validation classes
    input.classList.remove('is-invalid', 'is-valid');

    // Remove any existing error messages
    const errorMessage = input.parentElement.querySelector('.input-error-message');
    if (errorMessage) {
        errorMessage.remove();
    }

    // Check if the input is required and empty
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        showInputError(input, 'This field is required');
    }
    // Validate email format
    else if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            showInputError(input, 'Please enter a valid email address');
        }
    }
    // Validate phone number
    else if (input.id === 'phoneNumber' && value) {
        const phoneRegex = /^\d{10,12}$/;
        if (!phoneRegex.test(value.replace(/[\s-]/g, ''))) {
            isValid = false;
            showInputError(input, 'Please enter a valid phone number');
        }
    }

    // Add valid class if valid
    if (isValid && value) {
        input.classList.add('is-valid');
    }

    return isValid;
}

/**
 * Show an error message for an input field
 * @param {HTMLElement} input - The input element
 * @param {string} message - The error message
 */
function showInputError(input, message) {
    // Add invalid class to input
    input.classList.add('is-invalid');

    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'input-error-message';
    errorElement.textContent = message;

    // Add error message to input parent
    input.parentElement.appendChild(errorElement);

    // Add error styles
    const errorStyles = document.createElement('style');
    errorStyles.textContent = `
        .is-invalid {
            border-color: #dc3545 !important;
            background-color: rgba(220, 53, 69, 0.05) !important;
        }

        .is-valid {
            border-color: #28a745 !important;
            background-color: rgba(40, 167, 69, 0.05) !important;
        }

        .input-error-message {
            color: #dc3545;
            font-size: 0.8rem;
            margin-top: 5px;
            margin-left: 50px;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(errorStyles);
}

/**
 * Load form data from sessionStorage
 */
function loadFormData() {
    const savedData = sessionStorage.getItem('registrationFormData');
    if (!savedData) {
        console.log('No saved form data found');
        return;
    }

    try {
        const formData = JSON.parse(savedData);
        console.log('Loading saved form data:', formData);

        // Populate form fields
        if (formData.firstName) document.getElementById('firstName').value = formData.firstName;
        if (formData.lastName) document.getElementById('lastName').value = formData.lastName;
        if (formData.email) document.getElementById('email').value = formData.email;
        if (formData.phoneNumber) document.getElementById('phoneNumber').value = formData.phoneNumber;
        if (formData.organization) document.getElementById('organization').value = formData.organization;
        if (formData.position) document.getElementById('position').value = formData.position;
        if (formData.hearAbout) document.getElementById('hearAbout').value = formData.hearAbout;

        // Set payment option
        if (formData.paymentOption) {
            const paymentOption = document.getElementById(formData.paymentOption);
            if (paymentOption) paymentOption.checked = true;
        }
    } catch (error) {
        console.error('Error loading form data:', error);
    }
}

/**
 * Set up form submission
 */
function setupFormSubmission(registrationForm, formSteps) {
    // Add click handler for submit button to show confirmation dialog
    const submitButton = document.querySelector('.btn-submit');
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();

            // Validate the final step
            if (!validateStep(2)) {
                console.log('Final step validation failed');
                showValidationError('Please complete all required fields in the Payment section before submitting.');
                return false;
            }

            // Show confirmation dialog
            showConfirmationDialog();
        });
    }

    // Handle form submission
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        console.log('Form submitted');

        // Validate the final step
        if (!validateStep(2)) {
            console.log('Final step validation failed');
            showValidationError('Please complete all required fields in the Payment section before submitting.');
            return false;
        }

        // Get all form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            organization: document.getElementById('organization').value,
            position: document.getElementById('position').value,
            hearAbout: document.getElementById('hearAbout').value,
            paymentOption: document.querySelector('input[name="paymentOption"]:checked').value,
            termsAccepted: document.getElementById('termsCheck').checked,
            registrationDate: new Date().toISOString()
        };

        console.log('Submitting form data:', formData);

        // Show loading state
        const submitButton = document.querySelector('.btn-submit');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitButton.disabled = true;

        // Remove confirmation dialog if it exists
        const confirmationDialog = document.querySelector('.confirmation-dialog-overlay');
        if (confirmationDialog) {
            confirmationDialog.remove();
        }

        // Send data to database (simulated)
        setTimeout(() => {
            // Simulate successful submission
            submitDataToDatabase(formData)
                .then(response => {
                    console.log('Data submitted successfully:', response);

                    // Clear form data from sessionStorage
                    sessionStorage.removeItem('registrationFormData');

                    // Show success message
                    showSuccessMessage(formData);
                })
                .catch(error => {
                    console.error('Error submitting data:', error);

                    // Show error message
                    showValidationError('There was an error submitting your registration. Please try again.');

                    // Reset submit button
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                });
        }, 1500);
    });
}

/**
 * Show confirmation dialog before submitting the form
 */
function showConfirmationDialog() {
    // Create confirmation dialog
    const dialogOverlay = document.createElement('div');
    dialogOverlay.className = 'confirmation-dialog-overlay';

    const dialogContent = document.createElement('div');
    dialogContent.className = 'confirmation-dialog';

    // Get form data for confirmation
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const paymentOption = document.querySelector('input[name="paymentOption"]:checked').value;

    // Set dialog content
    dialogContent.innerHTML = `
        <div class="dialog-header">
            <h3>Confirm Registration</h3>
            <button class="dialog-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="dialog-body">
            <p>Please confirm your registration details:</p>
            <div class="confirmation-details">
                <div class="confirmation-item">
                    <span class="confirmation-label">Name:</span>
                    <span class="confirmation-value">${firstName} ${lastName}</span>
                </div>
                <div class="confirmation-item">
                    <span class="confirmation-label">Email:</span>
                    <span class="confirmation-value">${email}</span>
                </div>
                <div class="confirmation-item">
                    <span class="confirmation-label">Phone:</span>
                    <span class="confirmation-value">${phoneNumber}</span>
                </div>
                <div class="confirmation-item">
                    <span class="confirmation-label">Payment Method:</span>
                    <span class="confirmation-value">${paymentOption.toUpperCase()}</span>
                </div>
            </div>
            <p class="confirmation-note">By clicking "Confirm Registration", you agree to pay KSh 7,000 to complete your registration.</p>
        </div>
        <div class="dialog-footer">
            <button class="dialog-cancel">Cancel</button>
            <button class="dialog-confirm">Confirm Registration</button>
        </div>
    `;

    // Add dialog to page
    dialogOverlay.appendChild(dialogContent);
    document.body.appendChild(dialogOverlay);

    // Add dialog styles
    const dialogStyles = document.createElement('style');
    dialogStyles.textContent = `
        .confirmation-dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }

        .confirmation-dialog {
            background-color: white;
            border-radius: 15px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            animation: scaleIn 0.3s ease;
        }

        .dialog-header {
            background-color: var(--primary-color);
            color: white;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .dialog-header h3 {
            margin: 0;
            font-size: 1.5rem;
        }

        .dialog-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 5px;
            transition: all 0.3s ease;
        }

        .dialog-close:hover {
            transform: scale(1.2);
        }

        .dialog-body {
            padding: 20px;
        }

        .confirmation-details {
            background-color: #f8f9fa;
            border-radius: 10px;
            padding: 15px;
            margin: 15px 0;
        }

        .confirmation-item {
            margin-bottom: 10px;
            display: flex;
        }

        .confirmation-label {
            font-weight: 600;
            min-width: 120px;
            color: var(--primary-color);
        }

        .confirmation-value {
            font-weight: 500;
        }

        .confirmation-note {
            font-size: 0.9rem;
            color: #666;
            margin-top: 15px;
        }

        .dialog-footer {
            padding: 15px 20px;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            border-top: 1px solid #eee;
        }

        .dialog-cancel, .dialog-confirm {
            padding: 10px 20px;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .dialog-cancel {
            background-color: #f1f1f1;
            color: #666;
            border: none;
        }

        .dialog-confirm {
            background-color: var(--primary-color);
            color: white;
            border: none;
            box-shadow: 0 5px 15px rgba(123, 31, 162, 0.3);
        }

        .dialog-cancel:hover {
            background-color: #e0e0e0;
        }

        .dialog-confirm:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(123, 31, 162, 0.4);
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(dialogStyles);

    // Add event listeners
    const closeButton = dialogContent.querySelector('.dialog-close');
    const cancelButton = dialogContent.querySelector('.dialog-cancel');
    const confirmButton = dialogContent.querySelector('.dialog-confirm');

    // Close dialog
    function closeDialog() {
        dialogOverlay.style.opacity = '0';
        dialogOverlay.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            dialogOverlay.remove();
        }, 300);
    }

    // Close on close button click
    closeButton.addEventListener('click', closeDialog);

    // Close on cancel button click
    cancelButton.addEventListener('click', closeDialog);

    // Submit form on confirm button click
    confirmButton.addEventListener('click', function() {
        document.getElementById('registrationForm').dispatchEvent(new Event('submit', { bubbles: true }));
    });

    // Close on click outside
    dialogOverlay.addEventListener('click', function(e) {
        if (e.target === dialogOverlay) {
            closeDialog();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDialog();
        }
    });
}
}

/**
 * Submit data to database (simulated)
 * @param {Object} formData - The form data to submit
 * @returns {Promise} - A promise that resolves with the response
 */
function submitDataToDatabase(formData) {
    return new Promise((resolve, reject) => {
        // This is a simulation of sending data to a database
        // In a real application, this would be an API call

        console.log('Sending data to database:', formData);

        // Simulate network delay
        setTimeout(() => {
            // 95% chance of success (for demo purposes)
            if (Math.random() < 0.95) {
                resolve({
                    success: true,
                    message: 'Registration successful',
                    registrationId: 'QEG-' + Math.floor(Math.random() * 10000)
                });
            } else {
                reject({
                    success: false,
                    message: 'Error submitting registration'
                });
            }
        }, 1000);
    });
}

/**
 * Show success message after form submission
 * @param {Object} formData - The submitted form data
 */
function showSuccessMessage(formData) {
    // Show success message
    const formWrapper = document.querySelector('.registration-form-wrapper');
    formWrapper.innerHTML = `
        <div class="success-message">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Registration Successful!</h3>
            <p>Thank you, ${formData.firstName} ${formData.lastName}, for registering for the Queen Esthers' Generation 2025 Economic Empowerment Breakfast Meeting.</p>
            <p>We have sent a confirmation email to <strong>${formData.email}</strong> with all the details.</p>
            <div class="payment-reminder">
                <h4>Payment Information</h4>
                <p>Please complete your payment to confirm your attendance:</p>
                <ul>
                    <li><strong>Amount:</strong> KSh 7,000 per person</li>
                    <li><strong>Send to:</strong> Esther Obasi-ike (0721 599 013)</li>
                    <li><strong>Payment Method:</strong> ${formData.paymentOption.toUpperCase()}</li>
                </ul>
                <p class="mt-3">Please include your name as the reference when making the payment.</p>
            </div>
            <div class="confirmation-actions mt-4">
                <a href="index.html" class="btn-return">
                    <i class="fas fa-home me-2"></i> Return to Homepage
                </a>
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
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
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
            display: flex;
            align-items: baseline;
        }
        .payment-reminder ul li strong {
            min-width: 120px;
            display: inline-block;
        }
        .confirmation-actions {
            margin-top: 30px;
        }
        .btn-return {
            display: inline-block;
            padding: 12px 25px;
            background-color: var(--primary-color);
            color: white;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(123, 31, 162, 0.3);
        }
        .btn-return:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(123, 31, 162, 0.4);
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
