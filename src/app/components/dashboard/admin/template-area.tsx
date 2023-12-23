import React, { useEffect, useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  getTemplates,
  addTemplate as addTemplateAction,
  updateTemplate as updateTemplateAction,
  deleteTemplate as deleteTemplateAction,
} from "@/redux/features/emailTemplate/api";
import { addEmailTemplateSuccess, setEmailTemplates, deleteEmailTemplateSuccess, updateEmailTemplateSuccess } from "@/redux/features/emailTemplate/slice";


type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;

}

type TemplateType = 'employer' | 'candidate';

interface Template {
  _id?: string | undefined;
  id: string;
  templateType: string;
  templateName: string;
  subject: string;
  body: string;
}

const AdminTemplateArea = ({ setIsOpenSidebar }: IProps) => {
  const dispatch = useAppDispatch();
  const emailTemplates = useAppSelector((state) => state.emailTemplate.templates);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [templateType, setTemplateType] = useState<string>('employer');
  const [employerTemplates, setEmployerTemplates] = useState<Template[]>([]);
  const [candidateTemplates, setCandidateTemplates] = useState<Template[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);

  const [showInputFields, setShowInputFields] = useState(false);
  const [templateName, setTemplateName] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const [templateIdCounter, setTemplateIdCounter] = useState<number>(1);

  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 4;
  const pagesToShow = 1;



  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTemplates = await getTemplates(dispatch);
        if (fetchedTemplates) {
          dispatch(setEmailTemplates(fetchedTemplates));
          setEmployerTemplates(fetchedTemplates.filter((template: { templateType: string; }) => template.templateType === 'employer'));
          setCandidateTemplates(fetchedTemplates.filter((template: { templateType: string; }) => template.templateType === 'candidate'));
        }
      } catch (error) {
        console.error("Error fetching templates: ", error);
      }
    };

    fetchData();
  }, [dispatch]);


  const handleTemplateNameClick = (template: Template) => {
    // console.log(template);
    setSelectedTemplate((prevTemplate) => (prevTemplate === template ? null : template));
  };
  const handleTemplateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateName(e.target.value);
  };

  const handleTemplateClick = () => {
    setShowInputFields(!showInputFields);
    setSubject("");
    setBody("");
    setTemplateName("");
    setIsEditing(false);
  };


  const handleToggle = (templateType: TemplateType) => {

    setIsCandidate((prev) => !prev);
    setTemplateType(templateType);
    setShowInputFields(false);
    setSubject("");
    setBody("");
    setSelectedTemplate(null);
  };


  const handleAddTemplate = async () => {

    const newTemplate: Template = {
      id: `${templateIdCounter}`,
      templateType,
      templateName,
      subject,
      body,
    };

    setTemplateIdCounter((prevCounter) => prevCounter + 1);

    try {
      const addedTemplate = await addTemplateAction(dispatch, newTemplate);
      if (addedTemplate) {
        //const { _id } = addedTemplate;
        dispatch(addEmailTemplateSuccess(addedTemplate));
        console.log("Templates added successfully");
      }

      if (templateType === 'employer') {
        setEmployerTemplates([...employerTemplates, newTemplate]);
      } else if (templateType === 'candidate') {
        setCandidateTemplates([...candidateTemplates, newTemplate]);
      }


      setSubject("");
      setBody("");
      setTemplateName("")
      setIsEditing(false);
      setTemplateType("");
      setShowInputFields(false);
    } catch (error) {
      console.error("Error adding template:", error);
    }
  };



  const handleEdit = (template: Template) => {
    setIsEditing(true);
    setShowInputFields(true);
    setSubject(template.subject);
    setBody(template.body);
    setTemplateName(template.templateName);
  };

  const handleUpdate = async () => {


    if (!selectedTemplate) {
      // Handle error, no template selected
      return;
    }
    const updatedTemplate: Template = {
      ...selectedTemplate,
      templateType,
      templateName,
      subject,
      body,
    };
    try {
      const updatedEmailTemplate = await updateTemplateAction(dispatch, selectedTemplate._id, updatedTemplate);
      console.log(selectedTemplate);
      if (updatedEmailTemplate) {
        dispatch(updateEmailTemplateSuccess(updatedTemplate));
        console.log("Template updated successfully");
      }

      if (templateType === 'employer') {
        setEmployerTemplates((prevTemplates) =>
          prevTemplates.map((template) =>
            template === selectedTemplate ? updatedTemplate : template
          )
        );
      } else if (templateType === 'candidate') {
        setCandidateTemplates((prevTemplates) =>
          prevTemplates.map((template) =>
            template === selectedTemplate ? updatedTemplate : template
          )
        );
      }


      setSubject("");
      setBody("");
      setTemplateName("");
      setIsEditing(false);
      setShowInputFields(false);
    } catch (error) {
      console.error("Error updating template:", error);
    }
  };

  const handleRemoveTemplate = async () => {
    if (selectedTemplate) {
      try {
        await deleteTemplateAction(dispatch, selectedTemplate._id);  //id
        dispatch(deleteEmailTemplateSuccess(selectedTemplate.templateName));
        if (templateType === 'employer') {
          setEmployerTemplates((prevTemplates) =>
            prevTemplates.filter((t) => t.id !== selectedTemplate.id)
          );
        } else if (templateType === 'candidate') {
          setCandidateTemplates((prevTemplates) =>
            prevTemplates.filter((t) => t.id !== selectedTemplate.id)
          );
        }
        // Clear the selected template
        setSelectedTemplate(null);
      }
      catch (error) {
        console.error("Error deleting template:", error);
      }
    }
  };

  const selectedTemplates = templateType === 'employer' ? employerTemplates : candidateTemplates;

  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = selectedTemplates.slice(indexOfFirstTemplate, indexOfLastTemplate);

  const totalPages = Math.ceil(selectedTemplates.length / templatesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
              onClick={() => handleToggle('candidate')}
              className={`p-1 px-2 ${isCandidate && "active"}`}
            >
              Candidate
            </p>
            <p
              onClick={() => handleToggle('employer')}
              className={`p-1 px-2 ${!isCandidate && "active"}`}
            >
              Employer
            </p>
          </div>

        </div>


        {showInputFields && (
          <div className="bg-white card-box border-20">
            {/* Display input fields for subject and body */}

            <div className="bg-white card-box border-20">

              <div className="dash-input-wrapper">
                <label htmlFor="templateName">TemplateName:</label>
                <input
                  type="text"
                  id="templateName"
                  value={templateName}
                  onChange={handleTemplateName}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

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



        <div className="mt-3 row ">

          {currentTemplates.map((template, index) => (
            <div key={index} className="mt-3 me-3 bg-white p-3 border-20 row">
              <div className="col">
                <button
                  className="  fw-medium  "
                  onClick={() => handleTemplateNameClick(template)}
                >
                  {template.templateName || `Template ${index}`}

                </button>
              </div>
              <div className="col">

                Sub:{template.subject.slice(0, 8) + '..'}
              </div>
              <div className="col">

                {template.body.slice(0, 20) + '...'}
              </div>
              {selectedTemplate === template && (
                <div className=" mt-3">
                  <div className=" email-format bg-white p-3 border-20">

                    <div className=" float-end">
                      <button className="btn btn-secondary me-3 " onClick={() => handleEdit(selectedTemplate)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger  "
                        onClick={handleRemoveTemplate}
                      >
                        Remove
                      </button>
                    </div>
                    <h3>{selectedTemplate.templateName || `Template ${selectedTemplates.indexOf(selectedTemplate)}`}</h3>
                    <p>
                      <strong>Subject:</strong> {selectedTemplate.subject}
                    </p>
                    <p>{selectedTemplate.body}</p>

                  </div>

                </div>
              )}
            </div>
          ))}


          <div className="dash-pagination d-flex justify-content-end mt-30">
            {currentPage > 1 && (
              <button
                className="btn d-flex justify-content-center items-center"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <span>&laquo;</span>
              </button>
            )}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                className={`btn d-flex justify-content-center items-center ${currentPage === pageNumber ? 'active' : ''}`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                className="btn d-flex justify-content-center items-center"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <span>&raquo;</span>
              </button>
            )}
          </div>


        </div>


      </div>
    </div>

  );
};

export default AdminTemplateArea;