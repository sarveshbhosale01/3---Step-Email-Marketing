import React, { useState } from "react";
import "./Contact.css";
import { useNavigate } from "react-router-dom";
import { contactService } from '../Firebase/contactServics';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log("Form submitted:", formData);
      
      // Submit to Firebase
      const result = await contactService.submitContactForm(formData);
      
      if (result.success) {
        alert("Thank you for your message! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
        
        // Navigate to thank you page
        navigate("/thankYou", { 
          state: { 
            formData: formData,
            submissionId: result.id 
          } 
        });
      } else {
        alert("Sorry, there was an error submitting your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Sorry, there was an error submitting your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      {/* Paper planes background */}
      <div className="contact-planes-background">
        <div className="paper-plane plane1">
          <div className="plane-body">
            <div className="plane-wing"></div>
          </div>
        </div>
        <div className="trail trail1"></div>
        
        <div className="paper-plane plane2">
          <div className="plane-body">
            <div className="plane-wing"></div>
          </div>
        </div>
        <div className="trail trail2"></div>
        
        <div className="paper-plane plane3">
          <div className="plane-body">
            <div className="plane-wing"></div>
          </div>
        </div>
        <div className="trail trail3"></div>
        
        <div className="paper-plane plane4">
          <div className="plane-body">
            <div className="plane-wing"></div>
          </div>
        </div>
        <div className="trail trail4"></div>
        
        <div className="paper-plane plane5">
          <div className="plane-body">
            <div className="plane-wing"></div>
          </div>
        </div>
        <div className="trail trail5"></div>
      </div>

      {/* Main contact card */}
      <div className="contact-card">
        <div className="contact-header">
          <h1 className="contact-title">Get in Touch 📞</h1>
        </div>
        

        <div className="contact-content">
          {/* Left Column - Contact Information */}
          
          <div className="contact-left">
            <div className="contact-info-card">
              <div className="free-consultation-card">
              <div className="free-badge">FREE CONSULTATION</div>
              <div className="offer-list">
                <div className="offer-item">
                  <span className="check-icon">✓</span>
                  No-obligation assessment
                </div>
                <div className="offer-item">
                  <span className="check-icon">✓</span>
                  Customized solution proposal
                </div>
                <div className="offer-item">
                  <span className="check-icon">✓</span>
                  Competitive pricing
                </div>
                <div className="offer-item">
                  <span className="check-icon">✓</span>
                  Professional installation
                </div>
              </div>
            </div>
             

            
          </div>

          {/* Right Column - Contact Form */}
          <div className="contact-right">
            <div className="contact-form-card">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    className="form-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your HVAC needs or ask any questions..."
                    className="form-input textarea"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className={`submit-btn ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message ↗'}
                </button>
              </form>
            </div>
          </div>
        </div>
         <h3 className="info-title">Contact Information</h3>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div className="contact-text">
                    <div className="contact-label">Email</div>
                    <div className="contact-value">contact@lghomecomfort.com</div>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-text">
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">(555) 123-4567</div>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-text">
                    <div className="contact-label">Address</div>
                    <div className="contact-value">123 Comfort Street, City, State 12345</div>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">🕒</div>
                  <div className="contact-text">
                    <div className="contact-label">Business Hours</div>
                    <div className="contact-value">
                      <div>Mon-Fri: 8AM-6PM</div>
                      <div>Sat: 9AM-2PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default Contact;