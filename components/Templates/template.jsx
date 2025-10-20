import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Template.css";
import templateData from "./emailTemplates.json";

const Template = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelect = (id) => {
    setSelectedTemplate(prev => (prev === id ? null : id));
  };

  const handleContinue = () => {
    if (!selectedTemplate) {
      alert("Please select a template to continue.");
      return;
    }
    
    // Store selected template in localStorage or context for later use
    localStorage.setItem('selectedTemplate', JSON.stringify({
      id: selectedTemplate,
      template: templateData.email_templates.find(t => t.id === selectedTemplate)
    }));
    
    navigate("/UploadCustomers");
  };

  return (
    <div className="template-container">
      {/* Paper planes background */}
      <div className="template-planes-background">
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

      <div className="templates-content">
        <div className="template-header">
          <h1 className="template-title">Choose Your Email Template 📧</h1>
          <p className="template-subtitle">
            {selectedTemplate 
              ? "Template selected! Click continue or choose another."
              : "Click to select a template and continue."
            }
          </p>
          <button 
            className={`template-continue-btn ${selectedTemplate ? "active" : "disabled"}`}
            onClick={handleContinue}
            disabled={!selectedTemplate}
          >
            {selectedTemplate ? `Continue with Selected Template →` : "Select a Template to Continue"}
          </button>
        </div>

        <div className="templates-grid">
          {templateData.email_templates.map(template => (
            <div
              key={template.id}
              className={`template-card ${selectedTemplate === template.id ? "selected" : ""}`}
              onClick={() => handleSelect(template.id)}
              role="button"
              tabIndex={0}
              aria-label={`Select ${template.name} template`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(template.id);
                }
              }}
            >
              <div className="summary">
                <h3 className="template-name">{template.name}</h3>
                <h4 className="template-subject">{template.subject}</h4>
                {selectedTemplate === template.id && (
                  <div className="selection-badge">Selected ✓</div>
                )}
              </div>

              {/* Removed the template description section entirely */}
            </div>
          ))}
        </div>
      </div>

      {selectedTemplate && (
        <div className="selection-hint">
          Template selected: <strong>{
            templateData.email_templates.find(t => t.id === selectedTemplate)?.name
          }</strong>
        </div>
      )}
    </div>
  );
};

export default Template;