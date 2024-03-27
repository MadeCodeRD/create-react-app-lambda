import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  surveyDetails: [
    { name: "Muy Insatisfecho", value: 0 },
    { name: "Insatisfecho", value: 0 },
    { name: "Neutral", value: 0 },
    { name: "Satisfecho", value: 0 },
    { name: "Muy Satisfecho", value: 0 },
  ],
};

export const companySlice = createSlice({
  name: "companyDashboard",
  initialState,
  reducers: {
    updateSurveyDetails: (state, action) => {
      state.surveyDetails = action.payload;
    },
  },
});

export const { updateSurveyDetails } = companySlice.actions;

export default companySlice.reducer;
