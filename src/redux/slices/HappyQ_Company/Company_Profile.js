import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyProfile: {
    id: "000273",
    name: "Popular",
    photoUrl: "https://www.bpd.com.do/img_md/header-logo-alpha-8c.png",
    phoneNumber: "8096811005",
    address: {
      street: "Ave. Ulises Heaux 22",
      numHouseOrApartment: "9",
      neighborhood: "Cacicazgo",
      city: "Santo Domingo",
      zipCode: "7771021",
    },
    date: "2/4/2024",
    email: "popular@gmail.com",
    role: "Empresa",
    status: "Activa",
    rut: "555555551",
    services: ["Envio", "Retiro"],
    password: "123456789101112",
    confirmPassword: "123456789101112",
    data: [7, 15, 23, 8, 12, 19, 4, 11, 6, 20, 9, 17],
    ticketDetails: {
      openTickets: 11,
      closedTickets: 24,
      vip: 33,
    },
  },
};

export const companyProfileSlice = createSlice({
  name: "companyProfile",
  initialState,
  reducers: {
    updateCompanyDetails: (state, action) => {
      state.companyProfile = action.payload;
    },
  },
});

export const { updateCompanyDetails } = companyProfileSlice.actions;

export default companyProfileSlice.reducer;
