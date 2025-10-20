import React from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaFileCsv, FaPaperPlane, FaChartLine } from "react-icons/fa";
import "./introduction.css";
import Reviews from "../Review/review";

const Introduction = () => {
  const navigate = useNavigate();

  return (
    <div className="intro-page">
      {/* Paper planes background */}
      <div className="planes-background">
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

      {/* Main content */}
      <div className="intro-section">
        <div className="intro-card">
          <h1 className="intro-title">Introduction</h1>
          <p className="intro-subtitle">
            Welcome to LG Home Comfort's Email Marketing Platform — a smart and efficient way to connect with your clients. From selecting email templates to uploading your customer lists, every step is designed to simplify your marketing workflow. Our intelligent system analyzes your data, crafts professional emails, and helps you communicate effectively with your target audience
            — saving time while boosting engagement
          </p>

          <div className="steps-container">
            <div className="step">
              <FaClipboardList className="step-icon" />
              <h3>Select a Template</h3>
              <p>Choose from a variety of pre-designed templates for your campaign.</p>
            </div>

            <div className="step">
              <FaFileCsv className="step-icon" />
              <h3>Upload Customer List</h3>
              <p>Provide a CSV or Excel file containing your customer emails.</p>
            </div>

            <div className="step">
              <FaPaperPlane className="step-icon" />
              <h3>Personalized Email Sending</h3>
              <p>Our backend fetches your list, personalizes content, and sends emails automatically.</p>
            </div>

            <div className="step">
              <FaChartLine className="step-icon" />
              <h3>Analytics Dashboard</h3>
              <p>
                Track delivery rate, open rate, spam detection, and more to plan your next strategy.
              </p>
            </div>
          </div>

          <button className="continue-btn" onClick={() => navigate("/Template")}>
            Continue →
          </button>
        </div>
      </div>
      
      {/* Reviews section */}
      <div className="reviews-section">
        <Reviews />
      </div>
    </div>
  );
};

export default Introduction;