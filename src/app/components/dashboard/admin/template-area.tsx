import React, { useEffect, useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";

type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;

}

type TemplateType = 'employer' | 'candidate' ;

interface Template {
  subject: string;
  body: string;
}

const AdminTemplateArea = ({ setIsOpenSidebar }: IProps) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [selectedTemplateType, setSelectedTemplateType] = useState<string | null>('employer');
  const [employerTemplates, setEmployerTemplates] = useState<Template[]>([]);
  const [candidateTemplates, setCandidateTemplates] = useState<Template[]>([]);
  const [addTemplate, setAddTemplate] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);

  const [showInputFields, setShowInputFields] = useState(false);

  const handleTemplateClick = () => {
    setShowInputFields(!showInputFields);
    // setSelectedTemplateType(null);
    setSubject("");
    setBody("");
    setIsEditing(false);
  };

  // const handleTemplateClick = (templateType:TemplateType) => {
  //   setSelectedTemplateType(templateType);
  //   // setSubject("");
  //   // setBody("");
  //   // setIsEditing(false);
  // };
  const handleToggle = (templateType: TemplateType) => {
     
    setIsCandidate((prev) => !prev);
    setSelectedTemplateType(templateType);
    setShowInputFields(false);
    setSubject("");
    setBody("");
  };
  
  const [isAddingTemplate, setIsAddingTemplate] = useState(false);
  const handleAddTemplate = () => {
    // if (!subject || !body || !selectedTemplateType) {
    //   // Ensure subject, body, and template type are set
    //   return;
    // }

    const newTemplate:Template = {
      subject,
      body,
    };

    if (selectedTemplateType === 'employer') {
      setEmployerTemplates([...employerTemplates,newTemplate]);
    } else if (selectedTemplateType === 'candidate') {
      setCandidateTemplates([...candidateTemplates,newTemplate]);
    }
    
    
    setSubject("");
    setBody("");
    setIsEditing(false);
    setSelectedTemplateType(null); 
    setShowInputFields(false); 
  };

  

  const handleSendEmail = () => {
    const emailDetails:Template = {
      subject,
      body,
    };

    if(selectedTemplateType === 'employer') {
      setEmployerTemplates([...employerTemplates,emailDetails]);
    }else if(selectedTemplateType === 'candidate'){
      setCandidateTemplates([...candidateTemplates, emailDetails]);
    }

    // setAddTemplate(emailDetails);
    // setAddTemplate(emailDetails)
    setSubject("");
    setBody("");
  };

  const handleEdit = (template:Template) => {
    setIsEditing(true);
    setShowInputFields(true);
    // const templateToEdit = selectedTemplateType === 'employer' ? employerTemplates : candidateTemplates;
    setSubject(template.subject);
    setBody(template.body);
  };

  const handleUpdate = () => {
    const updatedTemplate:Template = {
      subject,
      body,
    };
    if (selectedTemplateType === 'employer') {
      setEmployerTemplates(
        employerTemplates.map((template) =>
          template = selectedTemplates ? updatedTemplate : template
        )
      );
    } else if (selectedTemplateType === 'candidate') {
      setCandidateTemplates(
        candidateTemplates.map((template) =>
          template = selectedTemplates ? updatedTemplate : template
        )
      );
    }

    // setAddTemplate(updatedTemplate);
    setSubject("");
    setBody("");
    setIsEditing(false);
  };

  const selectedTemplates = selectedTemplateType === 'employer' ? employerTemplates : candidateTemplates;

  return (
    <div className="dashboard-body">
      <div className="relative">
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        <div className="d-flex justify-content-between align-items-center  ">
          <div className=" d-flex gap-3 py-4">
            <h2 className="main-title mb-0">Templates</h2>
            <button className="btn-one justify-content-center"
            type="button"
            onClick={handleTemplateClick}>
              Add
            </button>
          </div>

          <div className="subscription-tab align-content-center py-2  d-flex px-2 ms-auto">
            <p
              onClick={()=>handleToggle('candidate')}
              className={`p-1 px-2 ${isCandidate && "active"}`}
            >
              Candidate
            </p>
            <p
              onClick={()=>handleToggle('employer')}
              className={`p-1 px-2 ${!isCandidate && "active"}`}
            >
              Employer
            </p>
          </div>

        </div>

        
        { showInputFields && (
          <div className="bg-white card-box border-20">
            {/* Display input fields for subject and body */}
            
            <div className="bg-white card-box border-20">
              
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            

              <div className="dash-input-wrapper">
                <label htmlFor="body">Body:</label>
              
              {/* <div className="flex"> */}
                <textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Type your message here..."
                  className="size-lg"
                />
              </div>
            </div>

            {isEditing ? (
              // Button to update the sent email
              <button
                className="d-flex dash-btn-two tran3s me-3 justify-content-center align-items-center mt-5 "
                onClick={handleUpdate}
              >
                Update
              </button>
            ) : (
              // Button to save the Template
              <button
                className="d-flex dash-btn-two tran3s me-3 justify-content-center align-items-center mt-5 "
                onClick={handleAddTemplate}
              >
                Save
              </button>
            )}
            
          </div>
        )}
        

        {/* Display sent email details */}
        {selectedTemplates.map((template,index)=> (
          <div key={index} className="mt-3">
          <h3>Template {index + 1}</h3>
          <p>
            <strong>Subject:</strong> {template.subject}
          </p>
          <p>{template.body}</p>
          <button
            className="mt-3 btn btn-secondary"
            onClick={() => handleEdit(template)}
          >
            Edit
          </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTemplateArea;