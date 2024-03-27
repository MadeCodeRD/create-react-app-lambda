import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  branch: [],
  status: [],
  date: "",
  address: "",
  showModal: false,
  currentBranch: {},
  branchData: [
    {
      id: "000779",
      name: "Big Ring",
      companyId: "000254",
      employees: [],
      photoUrl: "https://static.bhd.com.do/bhd_1_35fc248886_c7474096c5.png",
      phoneNumber: "8096811005",
      address: {
        street: "Ave. Ulises Heaux 22",
        numHouseOrApartment: "9",
        neighborhood: "Cacicazgo",
        city: "Santo Domingo",
        zipCode: "7771021",
      },
      date: "2/4/2024",
      email: "BHD@gmail.com",
      role: "Sucursal",
      status: "Activa",
      services: ["Envio", "Cambio", "Retiro"],
      rut: "555555551",
      password: "123456789101112",
      confirmPassword: "123456789101112",
    },
  ],
};

export const companyBranchSlice = createSlice({
  name: "companyBranch",
  initialState,
  reducers: {
    filterBranchName: (state, action) => {
      state.branch = action.payload;
    },
    filterBranchStatus: (state, action) => {
      state.status = action.payload;
    },
    filterBranchDate: (state, action) => {
      state.date = action.payload;
    },
    filterBranchAddress: (state, action) => {
      state.address = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setCurrentBranch: (state, action) => {
      state.currentBranch = action.payload;
    },
    editBranch: (state, action) => {
      state.branchData = action.payload;
    },
  },
});

export const {
  filterBranchName,
  filterBranchStatus,
  filterBranchDate,
  filterBranchAddress,
  setShowModal,
  setCurrentBranch,
  editBranch,
} = companyBranchSlice.actions;

export default companyBranchSlice.reducer;
