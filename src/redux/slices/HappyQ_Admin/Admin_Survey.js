import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: [],
  date: "",
  company: [],
  employee: [],
  service: [],
  showModal: false,
  branch: [],
  currentSurvey: {},
  surveyData: [
    {
      id: "S-vSIKHPYXZ5UY",
      service: "envio",
      date: "2024/03/04",
      score: 5,
      employeeId: "000253",
      companyId: "B-vSIKHFZZZ5UY",
      branchId: "000777",
      ticketId: "000888",
    },
  ],
};

export const adminSurveySlice = createSlice({
  name: "adminSurvey",
  initialState,
  reducers: {
    filterSurveyScore: (state, action) => {
      state.score = action.payload;
    },
    filterSurveyDate: (state, action) => {
      state.date = action.payload;
    },
    filterSurveyCompany: (state, action) => {
      state.company = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    filterSurveyBranch: (state, action) => {
      state.branch = action.payload;
    },
    filterSurveyService: (state, action) => {
      state.service = action.payload;
    },
    filterSurveyEmployee: (state, action) => {
      state.employee = action.payload;
    },
  },
});

export const {
  filterSurveyScore,
  filterSurveyDate,
  filterSurveyCompany,
  setShowModal,
  filterSurveyBranch,
  filterSurveyService,
  filterSurveyEmployee,
} = adminSurveySlice.actions;

export default adminSurveySlice.reducer;
