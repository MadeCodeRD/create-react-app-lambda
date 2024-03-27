import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: { branch: [] },
  state: [],
  date: "",
  priority: [],
  bookingData: [
    {
      id: "000888",
      companyId: "000254",
      date: "2/20/2024",
      priority: "Normal",
      state: "Pendiente",
      branchId: "000779",
      service: "Envio",
    },
    {
      id: "000753",
      companyId: "000254",
      date: "2/4/2024",
      priority: "VIP",
      state: "Completado",
      branchId: "000779",
      service: "Envio",
    },
    {
      id: "000912",
      companyId: "000254",
      date: "1/24/2024",
      priority: "Normal",
      state: "Completado",
      branchId: "000779",
      service: "Envio",
    },
  ],
};

export const companyBookingSlice = createSlice({
  name: "companyBooking",
  initialState,
  reducers: {
    filterCompanyBranch: (state, action) => {
      state.company.branch = action.payload;
    },
    filterTicketState: (state, action) => {
      state.state = action.payload;
    },
    filterTicketDate: (state, action) => {
      state.date = action.payload;
    },
    filterTicketPriority: (state, action) => {
      state.priority = action.payload;
    },
  },
});

export const {
  filterCompanyBranch,
  filterTicketState,
  filterTicketDate,
  filterTicketPriority,
} = companyBookingSlice.actions;

export default companyBookingSlice.reducer;
