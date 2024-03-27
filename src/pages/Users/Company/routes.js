import async from "../../../components/Async";

const DashboardLayout = async(() => import("../../../layouts/Dashboard"));
const CompanyDashboard = async(() => import("./Dashboard"));
const CompanyTicket = async(() => import("./Ticket/Ticket"));
const CompanyReserva = async(() => import("./Booking/Booking"));
const CompanyEmpleado = async(() => import("./Employee/Employee"));
const CompanySucursal = async(() => import("./Branch/Branch"));
const CompanyEncuesta = async(() => import("./Survey/Survey"));
const CompanyProfile = async(() => import("./Profile/Profile"));
const Changelog = async(() => import("../../../pages/docs/Changelog"));

const CompanyRoutes = {
  path: "smartkiu/company",
  element: <DashboardLayout />,
  children: [
    {
      path: "dashboard",
      element: <CompanyDashboard />,
    },
    {
      path: "tickets",
      element: <CompanyTicket />,
    },
    {
      path: "reservas",
      element: <CompanyReserva />,
    },
    {
      path: "empleados",
      element: <CompanyEmpleado />,
    },
    {
      path: "sucursales",
      element: <CompanySucursal />,
    },
    {
      path: "survey",
      element: <CompanyEncuesta />,
    },
    {
      path: "profile",
      element: <CompanyProfile />,
    },
    {
      path: "changelog",
      element: <Changelog />,
    },
  ],
};

export default CompanyRoutes;
