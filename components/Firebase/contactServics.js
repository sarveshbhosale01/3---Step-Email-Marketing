import { db } from '../../../src/components/Firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
export const contactService = {
  // Submit contact form to Firebase
  submitContactForm: async (formData) => {
    try {
      const docRef = await addDoc(collection(db, 'contactSubmissions'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: serverTimestamp(),
        status: 'new',
        read: false
      });
      
      console.log('Contact form submitted with ID: ', docRef.id);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error submitting contact form: ', error);
      return { success: false, error: error.message };
    }
  },

  // Optional: Get all contact submissions (for admin)
  getContactSubmissions: async () => {
    // Implementation for admin dashboard
  }
};