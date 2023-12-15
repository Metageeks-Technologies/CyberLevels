import React, { useEffect, useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";

type IProps = {
    setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    
  }

  const AdminTemplateArea = ({ setIsOpenSidebar }: IProps) => {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [addTemplate, setAddTemplate] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
  
    const handleTemplateClick = (templateType) => {
      setSelectedTemplate(templateType);
    };
  
    const handleSendEmail = () => {
      const emailDetails = {
        subject,
        body,
      };
  
      setAddTemplate(emailDetails);
      setSubject("");
      setBody("");
    };
  
    const handleEdit = () => {
      setIsEditing(true);
      setSubject(addTemplate?.subject || "");
      setBody(addTemplate?.body || "");
    };
  
    const handleUpdate = () => {
      const updatedTemplate = {
        subject,
        body,
      };
  
      setAddTemplate(updatedTemplate);
      setSubject("");
      setBody("");
      setIsEditing(false);
    };
  
    return (
      <div className="dashboard-body">
        <div className="relative">
          <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
  
          <h2 className="main-title">Templates</h2>
  
          <button
            className={`d-flex dash-btn-two tran3s me-3 justify-content-center align-items-center mt-5 ${selectedTemplate === 'employer' ? 'selected' : ''}`}
            onClick={() => handleTemplateClick('employer')}
          >
            Employer Template
          </button>
  
          <button
            className={`d-flex dash-btn-two tran3s me-3 justify-content-center align-items-center mt-5 ${selectedTemplate === 'candidate' ? 'selected' : ''}`}
            onClick={() => handleTemplateClick('candidate')}
          >
            Candidate Template
          </button>
  
          {selectedTemplate && (
            <div className="mt-3 flex">
              {/* Display input fields for subject and body */}
              <div className="mt-3 flex">
                <div className="flex">
                <label htmlFor="subject">Subject:</label>
                </div>
                <div className="flex">
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                </div>
              </div>
  
              <div className="mt-3 flex">
                <div className="flex">
                <label htmlFor="body">Body:</label>
                </div>
                <div className="flex">
                <textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 resize-y"
                />
                </div>
              </div>
  
              {isEditing ? (
                // Button to update the sent email
                <button
                  className="d-flex dash-btn-two tran3s me-3 justify-content-center align-items-center mt-5 "
                  onClick={handleUpdate}
                >
                  Update Template
                </button>
              ) : (
                // Button to send the email
                <button
                  className="d-flex dash-btn-two tran3s me-3 justify-content-center align-items-center mt-5 "
                  onClick={handleSendEmail}
                >
                  Save Template
                </button>
              )}
            </div>
          )}
  
          {/* Display sent email details */}
          {addTemplate && (
            <div className="mt-3">
              <h3>Saved Template</h3>
              <p><strong>Subject:</strong> {addTemplate.subject}</p>
              <p> {addTemplate.body}</p>
              {/* Button to edit the sent email */}
              <button
                className="mt-3 btn btn-secondary"
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default AdminTemplateArea;