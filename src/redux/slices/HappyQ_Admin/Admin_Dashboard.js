import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyName: [],
  survey: { categories: [], data: [] },
  surveyDetails: [
    { name: "Muy Insatisfecho", value: 0 },
    { name: "Insatisfecho", value: 0 },
    { name: "Neutral", value: 0 },
    { name: "Satisfecho", value: 0 },
    { name: "Muy Satisfecho", value: 0 },
  ],
  ticketDetails: {
    openTickets: 0,
    closedTickets: 0,
    vip: 0,
  },
};

export const adminSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    filterCompany: (state, action) => {
      state.companyName = action.payload;
    },
    filterSurvey: (state, action) => {
      state.survey.categories = action.payload.categories;
      state.survey.data = action.payload.data;
    },
    updateTicketDetails: (state, action) => {
      state.ticketDetails = action.payload;
    },
    updateSurveyDetails: (state, action) => {
      state.surveyDetails = action.payload;
    },
  },
});

export const {
  filterCompany,
  filterSurvey,
  updateTicketDetails,
  updateSurveyDetails,
} = adminSlice.actions;

export default adminSlice.reducer;
