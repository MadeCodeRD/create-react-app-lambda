import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employee: [],
  status: [],
  date: "",
  role: [],
  company: [],
  showModal: false,
  service: [],
  currentEmployee: {},
  employeeData: [
    {
      id: "000253",
      name: "Camila",
      lastName: "Gutierrez",
      photoUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/07/09/09/halle-berry.jpg?quality=75&width=640&auto=webp",
      phoneNumber: "+56987654321",
      address: {
        street: "Ave. Ulises Heaux 22",
        numHouseOrApartment: "9",
        neighborhood: "Cacicazgo",
        city: "Santo Domingo",
        zipCode: "7771021",
      },
      date: "2/4/2024",
      email: "popular@gmail.com",
      role: "Empleado",
      status: "Activa",
      companyId: "B-vSIKHFZHH1zX",
      services: ["Envio", "Retiro"],
      rut: "62.636.991-K",
      password: "holaSoyGoku@",
      confirmPassword: "holaSoyGoku@",
    },
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
      companyId: "B-vSIKHFZZZ5UY",
      services: ["Envio"],
      rut: "17.895.834-8",
      password: "holaSoyGoku@",
      confirmPassword: "holaSoyGoku@",
    },
    {
      id: "000255",
      name: "Carlos",
      lastName: "Sanchez",
      photoUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/07/03/10/jimcarrey.jpg?quality=75&width=640&auto=webp",
      phoneNumber: "8096811005",
      address: {
        street: "Ave. Ulises Heaux 22",
        numHouseOrApartment: "9",
        neighborhood: "Cacicazgo",
        city: "Santo Domingo",
        zipCode: "7771021",
      },
      date: "2/4/2024",
      email: "BlueWave@gmail.com",
      role: "Empleado",
      status: "Activa",
      companyId: "B-vSIKHFZZZ5UY",
      services: ["Envio"],
      rut: "17.895.834-8",
      password: "holaSoyGoku@",
      confirmPassword: "holaSoyGoku@",
    },
    {
      id: "000256",
      name: "Jose",
      lastName: "Mojica",
      photoUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?quality=75&width=990&crop=3%3A2%2Csmart&auto=webp",
      phoneNumber: "8096811005",
      address: {
        street: "Ave. Ulises Heaux 22",
        numHouseOrApartment: "9",
        neighborhood: "Cacicazgo",
        city: "Santo Domingo",
        zipCode: "7771021",
      },
      date: "2/4/2024",
      email: "Nexus@gmail.com",
      role: "Empleado",
      status: "Activa",
      companyId: "B-vSIKHFZZZ5UY",
      services: ["Envio"],
      rut: "80.001.686-K",
      password: "holaSoyGoku@",
      confirmPassword: "holaSoyGoku@",
    },
    {
      id: "000357",
      name: "Carmen",
      lastName: "Santos",
      photoUrl:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/06/11/16/jennifer-lopez.jpg?quality=75&width=640&auto=webp",
      phoneNumber: "8096811005",
      address: {
        street: "Ave. Ulises Heaux 22",
        numHouseOrApartment: "9",
        neighborhood: "Cacicazgo",
        city: "Santo Domingo",
        zipCode: "7771021",
      },
      date: "2/4/2024",
      email: "Wally@gmail.com",
      role: "Empleado",
      status: "Activa",
      companyId: "B-vSIKHFZHH1zX",
      services: ["Envio"],
      rut: "17.895.834-8",
      password: "holaSoyGoku@",
      confirmPassword: "holaSoyGoku@",
    },
  ],
};

export const adminEmployeeSlice = createSlice({
  name: "adminEmployee",
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
    filterEmployeeCompany: (state, action) => {
      state.company = action.payload;
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
  filterEmployeeCompany,
  setShowModal,
  setCurrentEmployee,
  addEmployee,
} = adminEmployeeSlice.actions;

export default adminEmployeeSlice.reducer;
