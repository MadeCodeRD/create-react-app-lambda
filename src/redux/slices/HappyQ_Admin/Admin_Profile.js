import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminProfile: {
    id: "0008912",
    name: "Pedro",
    lastName: "Pascal",
    photoUrl:
      "https://cdn.britannica.com/41/240741-050-D4777963/Pedro-Pascal-attends-premiere-The-Last-of-US-January-2023.jpg",
    phoneNumber: "+56987654321",
    address: {
      street: "Los Alvarez",
      numHouseOrApartment: "9",
      neighborhood: "Palo Alto",
      city: "Santiago",
      zipCode: "7912361",
    },
    date: "2/15/2024",
    email: "pedropascal01@gmail.com",
    password: "123456789101112",
    confirmPassword: "123456789101112",
    role: "admin",
    status: "active",
    rut: "14.925.224-K",
  },
};

export const adminProfileSlice = createSlice({
  name: "adminProfile",
  initialState,
  reducers: {
    updateAdminDetails: (state, action) => {
      state.adminProfile = action.payload;
    },
  },
});

export const { updateAdminDetails } = adminProfileSlice.actions;

export default adminProfileSlice.reducer;
