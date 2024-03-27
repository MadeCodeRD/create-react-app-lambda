import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: [],
  date: "",
  employee: [],
  service: [],
  showModal: false,
  branch: [],
  currentSurvey: {},
  surveyData: [
    {
      id: "000557",
      service: "Cancelaciones",
      date: "2/12/2024",
      score: 4,
      employeeId: "0003254",
      companyId: "000273",
      branchId: "000779",
      ticketId: "000999",
    },
  ],
};

export const companySurveySlice = createSlice({
  name: "companySurvey",
  initialState,
  reducers: {
    filterSurveyScore: (state, action) => {
      state.score = action.payload;
    },
    filterSurveyDate: (state, action) => {
      state.date = action.payload;
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
  setShowModal,
  filterSurveyBranch,
  filterSurveyService,
  filterSurveyEmployee,
} = companySurveySlice.actions;

export default companySurveySlice.reducer;
