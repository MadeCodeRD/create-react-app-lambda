import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employee: [],
  status: [],
  date: "",
  role: [],
  showModal: false,
  service: [],
  currentEmployee: {},
  employeeData: [
    {
      id: "0003254",
      name: "Michael",
      lastName: "Peréz",
      photoUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/07/12/08/phil-mcgraw.jpg?quality=75&width=640&auto=webp",
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
      role: "Empleado",
      status: "Activa",
      companyId: "000254",
      services: ["Envio"],
      rut: "555555551",
      password: "123456789101112",
      confirmPassword: "123456789101112",
    },
  ],
};

export const companyEmployeeSlice = createSlice({
  name: "companyEmployee",
  initialState,
  reducers: {
    filterEmployeeName: (state, action) => {
      state.employee = action.payload;
    },
    filterEmployeeStatus: (state, action) => {
      state.status = action.payload;
    },
    filterEmployeeDate: (state, action) => {
      state.date = action.payload;
    },
    filterEmployeeService: (state, action) => {
      state.service = action.payload;
    },
    filterEmployeeRole: (state, action) => {
      state.role = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setCurrentEmployee: (state, action) => {
      state.currentEmployee = action.payload;
    },
    addEmployee: (state, action) => {
      state.employeeData = action.payload;
    },
  },
});

export const {
  filterEmployeeName,
  filterEmployeeStatus,
  filterEmployeeDate,
  filterEmployeeService,
  filterEmployeeRole,
  setShowModal,
  setCurrentEmployee,
  addEmployee,
} = companyEmployeeSlice.actions;

export default companyEmployeeSlice.reducer;
