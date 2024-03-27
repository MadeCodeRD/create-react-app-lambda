import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  branch: [],
  status: [],
  date: "",
  address: "",
  company: [],
  showModal: false,
  currentBranch: {},
  branchData: [
    {
      id: "000777",
      name: "Ahorryo ondo",
      companyId: "B-vSIKHFZHH1zX",
      employeeIds: [],
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
      role: "Sucursal",
      status: "Activa",
      services: ["Envio", "Cambio", "Retiro"],
      rut: "80.001.686-K",
      password: "holaSoyGoku@",
      confirmPassword: "holaSoyGoku@",
    },
    {
      id: "000779",
      name: "Big Ring",
      companyId: "B-vSIKHFZZZ5UY",
      employeeIds: [],
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
      rut: "80.001.686-K",
      password: "holaSoyGoku@",
      confirmPassword: "holaSoyGoku@",
    },
    {
      id: "000770",
      name: "Sambil",
      companyId: "B-vSIKHFZHH1zX",
      employeeIds: [],
      photoUrl: "https://www.banreservas.com/SiteAssets/logo.png",
      phoneNumber: "8096811005",
      address: {
        street: "Ave. Ulises Heaux 23",
        numHouseOrApartment: "9",
        neighborhood: "Cacicazgo",
        city: "Santo Domingo",
        zipCode: "7771021",
      },
      date: "2/4/2024",
      email: "StellaTech@gmail.com",
      role: "Sucursal",
      status: "Activa",
      services: ["Envio", "Cambio", "Retiro"],
      rut: "80.001.686-K",
      password: "holaSoyGoku@",
      confirmPassword: "holaSoyGoku@",
    },
  ],
};

export const adminBranchSlice = createSlice({
  name: "adminBranch",
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
    filterBranchCompany: (state, action) => {
      state.company = action.payload;
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
  filterBranchCompany,
  setShowModal,
  setCurrentBranch,
  editBranch,
} = adminBranchSlice.actions;

export default adminBranchSlice.reducer;
