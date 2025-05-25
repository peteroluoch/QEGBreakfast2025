/**
 * Firebase Configuration and Database Operations
 * This file handles all Firebase-related operations for the QEG Economic Empowerment Breakfast 2025 website
 */

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVOLCtIdzNO9W3Cl7L_VmT3bi7JNgb05I",
  authDomain: "qegbreakfast2025.firebaseapp.com",
  projectId: "qegbreakfast2025",
  storageBucket: "qegbreakfast2025.appspot.com",
  messagingSenderId: "884616922462",
  appId: "1:884616922462:web:aff2e07bbb6648f9693bcf",
  measurementId: "G-W9BPZHL3NV"
};

// Firebase should already be initialized in the HTML file
// Get Firestore instance
const db = firebase.firestore();

/**
 * Save registration data to Firebase Firestore
 * @param {Object} formData - The form data to save
 * @returns {Promise} - Promise that resolves with the document reference
 */
function saveRegistration(formData) {
    // Add timestamp
    formData.timestamp = firebase.firestore.FieldValue.serverTimestamp();

    // Add registration to Firestore
    return db.collection('registrations').add(formData)
        .then((docRef) => {
            console.log('Registration saved with ID: ', docRef.id);
            return docRef;
        })
        .catch((error) => {
            console.error('Error saving registration: ', error);
            throw error;
        });
}

/**
 * Update an existing registration
 * @param {string} registrationId - The ID of the registration to update
 * @param {Object} updateData - The data to update
 * @returns {Promise} - Promise that resolves when the update is complete
 */
function updateRegistration(registrationId, updateData) {
    return db.collection('registrations').doc(registrationId).update({
        ...updateData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log('Registration updated successfully');
        return true;
    })
    .catch((error) => {
        console.error('Error updating registration: ', error);
        throw error;
    });
}

/**
 * Get a registration by ID
 * @param {string} registrationId - The ID of the registration to retrieve
 * @returns {Promise} - Promise that resolves with the registration data
 */
function getRegistration(registrationId) {
    return db.collection('registrations').doc(registrationId).get()
        .then((doc) => {
            if (doc.exists) {
                return { id: doc.id, ...doc.data() };
            } else {
                console.log('No such registration found');
                return null;
            }
        })
        .catch((error) => {
            console.error('Error getting registration: ', error);
            throw error;
        });
}

/**
 * Mark a registration as paid
 * @param {string} registrationId - The ID of the registration to mark as paid
 * @param {Object} paymentDetails - Details about the payment
 * @returns {Promise} - Promise that resolves when the update is complete
 */
function markRegistrationAsPaid(registrationId, paymentDetails) {
    return db.collection('registrations').doc(registrationId).update({
        status: 'paid',
        paymentDetails: paymentDetails,
        paidAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log('Registration marked as paid');
        return true;
    })
    .catch((error) => {
        console.error('Error marking registration as paid: ', error);
        throw error;
    });
}

/**
 * Get all registrations (admin function)
 * @returns {Promise} - Promise that resolves with an array of registrations
 */
function getAllRegistrations() {
    return db.collection('registrations')
        .orderBy('timestamp', 'desc')
        .get()
        .then((querySnapshot) => {
            const registrations = [];
            querySnapshot.forEach((doc) => {
                registrations.push({ id: doc.id, ...doc.data() });
            });
            return registrations;
        })
        .catch((error) => {
            console.error('Error getting registrations: ', error);
            throw error;
        });
}

/**
 * Delete a registration (admin function)
 * @param {string} registrationId - The ID of the registration to delete
 * @returns {Promise} - Promise that resolves when the deletion is complete
 */
function deleteRegistration(registrationId) {
    return db.collection('registrations').doc(registrationId).delete()
        .then(() => {
            console.log('Registration deleted successfully');
            return true;
        })
        .catch((error) => {
            console.error('Error deleting registration: ', error);
            throw error;
        });
}

// Export functions for use in other files
window.firebaseDB = {
    saveRegistration,
    updateRegistration,
    getRegistration,
    markRegistrationAsPaid,
    getAllRegistrations,
    deleteRegistration
};
