import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: { name: [] },
  status: [],
  date: "",
  showModal: false,
  currentCompany: {},
  companyData: [],
};

export const adminCompanySlice = createSlice({
  name: "adminCompany",
  initialState,
  reducers: {
    filterCompanyName: (state, action) => {
      state.company.name = action.payload;
    },
    filterCompanyStatus: (state, action) => {
      state.status = action.payload;
    },
    filterCompanyDate: (state, action) => {
      state.date = action.payload;
    },
    addCompany: (state, action) => {
      state.companyData = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setCurrentCompany: (state, action) => {
      state.currentCompany = action.payload;
    },
  },
});

export const {
  filterCompanyName,
  filterCompanyStatus,
  filterCompanyDate,
  addCompany,
  setShowModal,
  setCurrentCompany,
} = adminCompanySlice.actions;

export default adminCompanySlice.reducer;
