import { PayloadAction,createSlice } from "@reduxjs/toolkit";

export interface EmailTemplate{
    id: string;
    templateType: string;
    templateName: string;
    subject: string;
    body: string;
    
}
type IForGetAllTemplates = {
  templates: EmailTemplate[];
  totalNumOfPage: number;
  totalTemplate: number;
  
}

export interface EmailTemplateState {
    templates: EmailTemplate[];
    loading: boolean;
    error: string;
    page: number;
    totalNumOfPage: number;
    totalTemplate: number;
    
    
  }
  
  const initialState: EmailTemplateState = {
    templates: [],
    loading: false,
    error: "",
    page:1,
    totalNumOfPage:1,
    totalTemplate:0,
    
  };

  export const emailTemplateSlice = createSlice({
    name: "EmailTemplate",
    initialState,
    reducers: {
      fetchEmailTemplateRequest: (state) => {
        state.loading = true;
      },
      setEmailTemplates: (state, action: PayloadAction<IForGetAllTemplates>) => {
        state.templates = action.payload.templates;
      },
      fetchEmailTemplateSuccess: (state, action: PayloadAction<IForGetAllTemplates>) => {
        state.loading = false;
        state.templates = action.payload.templates;
        state.totalNumOfPage = action.payload.totalNumOfPage;
        state.totalTemplate = action.payload.totalTemplate;
        

      },
      addEmailTemplateSuccess: (state, action: PayloadAction<EmailTemplate>) =>{
        state.loading = false;
        state.templates.push(action.payload);
      },
      updateEmailTemplateSuccess: (state, action: PayloadAction<EmailTemplate>) => {
        state.loading = false;
        state.templates = state.templates.map((template) =>
          template.id === action.payload.id ? action.payload : template
        );
      },
      deleteEmailTemplateSuccess: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.templates = state.templates.filter((template) => template.id !== action.payload);
      },
      fetchEmailTemplateError: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      },
      setPage: (state, action: PayloadAction<number>) => {
        state.page = action.payload;
    }
    },
  });

  export const {
    fetchEmailTemplateRequest,
    fetchEmailTemplateSuccess,
    addEmailTemplateSuccess,
    updateEmailTemplateSuccess,
    deleteEmailTemplateSuccess,
    fetchEmailTemplateError,
    setEmailTemplates,
    setPage,
  } = emailTemplateSlice.actions;

  export default emailTemplateSlice.reducer;