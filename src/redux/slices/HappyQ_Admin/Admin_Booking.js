import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: { name: [], branch: [] },
  state: [],
  date: "",
  priority: [],
  bookingData: [
    {
      id: "000888",
      companyId: "B-vSIKHFZHH1zX",
      date: "4/20/2024",
      priority: "Normal",
      state: "Pendiente",
      branchId: "000777",
      service: "Envio",
    },
    {
      id: "000753",
      companyId: "B-vSIKHFZHH1zX",
      date: "2/4/2024",
      priority: "VIP",
      state: "Completado",
      branchId: "000779",
      service: "Envio",
    },
    {
      id: "000912",
      companyId: "B-vSIKHFZHH1zX",
      date: "1/24/2024",
      priority: "Normal",
      state: "Completado",
      branchId: "000770",
      service: "Envio",
    },
    {
      id: "000333",
      companyId: "B-vSIKHFZZZ5UY",
      date: "1/26/2024",
      priority: "Normal",
      state: "Cancelado",
      branchId: "000770",
      service: "Envio",
    },
    {
      id: "000427",
      companyId: "B-vSIKHFZZZ5UY",
      date: "1/26/2024",
      priority: "Normal",
      state: "Cancelado",
      branchId: "000777",
      service: "Envio",
    },
  ],
};

export const adminBookingSlice = createSlice({
  name: "adminBooking",
  initialState,
  reducers: {
    filterCompanyName: (state, action) => {
      state.company.name = action.payload;
    },
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
  filterCompanyName,
  filterCompanyBranch,
  filterTicketState,
  filterTicketDate,
  filterTicketPriority,
} = adminBookingSlice.actions;

export default adminBookingSlice.reducer;
