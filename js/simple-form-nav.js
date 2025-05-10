/**
 * Simple Form Navigation Script
 * This is a simplified version to ensure the form navigation works properly
 */

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
            
            // Validate current step (simplified validation)
            const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            const requiredFields = currentStepElement.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (!isValid) {
                console.log('Validation failed');
                alert('Please fill in all required fields before proceeding.');
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
    
    // Add submit event listener
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate final step
        const finalStep = document.querySelector('.form-step[data-step="3"]');
        const requiredFields = finalStep.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
                isValid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        if (!isValid) {
            console.log('Final step validation failed');
            alert('Please complete all required fields before submitting.');
            return;
        }
        
        // Show success message
        alert('Registration successful! Thank you for registering.');
        
        // Reset form
        form.reset();
        
        // Go back to first step
        document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
        document.querySelector('.form-step[data-step="1"]').classList.add('active');
        
        document.querySelectorAll('.progress-step').forEach(step => {
            step.classList.remove('active', 'completed');
        });
        document.querySelector('.progress-step[data-step="1"]').classList.add('active');
    });
    
    // Add CSS for validation
    const style = document.createElement('style');
    style.textContent = `
        .is-invalid {
            border-color: #dc3545 !important;
            background-color: rgba(220, 53, 69, 0.05) !important;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Form navigation initialized successfully');
}
