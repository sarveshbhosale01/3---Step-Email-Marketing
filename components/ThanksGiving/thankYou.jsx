import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ThankYou.css";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to login page after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const formData = location.state?.formData || {};

  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <div className="thank-you-icon">🎉</div>
        <h1 className="thank-you-title">Thank You!</h1>
        <p className="thank-you-message">
          Your message has been received successfully. We'll get back to you within 24 hours.
        </p>
        
        {formData.name && (
          <div className="submission-details">
            <h3>Your Submission:</h3>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Message:</strong> {formData.message}</p>
          </div>
        )}
        
        <div className="redirect-message">
          <p>You will be redirected to the login page in 5 seconds...</p>
        </div>
        
        <button 
          className="redirect-btn" 
          onClick={() => navigate("/")}
        >
          Go to Login Now
        </button>
      </div>
    </div>
  );
};

export default ThankYou;