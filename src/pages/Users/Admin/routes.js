import async from "../../../components/Async";

const DashboardLayout = async(() => import("../../../layouts/Dashboard"));
const AdminDashboard = async(() => import("./Dashboard"));
const AdminTicket = async(() => import("./Ticket/Ticket"));
const AdminReserva = async(() => import("./Booking/Booking"));
const AdminEmpresa = async(() => import("./Company/Company"));
const AdminEmpleado = async(() => import("./Employee/Employee"));
const AdminSucursal = async(() => import("./Branch/Branch"));
const AdminEncuesta = async(() => import("./Survey/Survey"));
const AdminProfile = async(() => import("./Profile/Profile"));
const Changelog = async(() => import("../../../pages/docs/Changelog"));

const AdminRoutes = {
  path: "smartkiu/admin",
  element: <DashboardLayout />,
  children: [
    {
      path: "dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "tickets",
      element: <AdminTicket />,
    },
    {
      path: "reservas",
      element: <AdminReserva />,
    },
    {
      path: "empresas",
      element: <AdminEmpresa />,
    },
    {
      path: "empleados",
      element: <AdminEmpleado />,
    },
    {
      path: "sucursales",
      element: <AdminSucursal />,
    },
    {
      path: "survey",
      element: <AdminEncuesta />,
    },
    {
      path: "profile",
      element: <AdminProfile />,
    },
    {
      path: "changelog",
      element: <Changelog />,
    },
  ],
};

export default AdminRoutes;
