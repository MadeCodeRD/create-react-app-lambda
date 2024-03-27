import React from "react";

import async from "./components/Async";

// All pages that rely on 3rd party components (other than Material-UI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Layouts
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
import DocLayout from "./layouts/Doc";
import PresentationLayout from "./layouts/Presentation";

// Guards
import AuthGuard from "./components/guards/AuthGuard";

// Auth components
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import Page404 from "./pages/auth/Page404";
import Page500 from "./pages/auth/Page500";

// Components
import Accordion from "./pages/components/Accordion";
import Alerts from "./pages/components/Alerts";
import Avatars from "./pages/components/Avatars";
import Badges from "./pages/components/Badges";
import Buttons from "./pages/components/Buttons";
import Cards from "./pages/components/Cards";
import Chips from "./pages/components/Chips";
import Dialogs from "./pages/components/Dialogs";
import Lists from "./pages/components/Lists";
import Menus from "./pages/components/Menus";
import Pagination from "./pages/components/Pagination";
import Progress from "./pages/components/Progress";
import Snackbars from "./pages/components/Snackbars";
import Tooltips from "./pages/components/Tooltips";

// Form components
import SelectionCtrls from "./pages/forms/SelectionControls";
import Selects from "./pages/forms/Selects";
import TextFields from "./pages/forms/TextFields";

// Icon components
import MaterialIcons from "./pages/icons/MaterialIcons";

// Page components
import Blank from "./pages/pages/Blank";
import InvoiceDetails from "./pages/pages/InvoiceDetails";
import InvoiceList from "./pages/pages/InvoiceList";
import Orders from "./pages/pages/Orders";
import Pricing from "./pages/pages/Pricing";
import Settings from "./pages/pages/Settings";
import Projects from "./pages/pages/Projects";
import Chat from "./pages/pages/Chat";

// Table components
import SimpleTable from "./pages/tables/SimpleTable";
import AdvancedTable from "./pages/tables/AdvancedTable";

// Documentation
import Welcome from "./pages/docs/Welcome";
import GettingStarted from "./pages/docs/GettingStarted";
import Routing from "./pages/docs/Routing";
import Auth0 from "./pages/docs/auth/Auth0";
import Cognito from "./pages/docs/auth/Cognito";
import Firebase from "./pages/docs/auth/Firebase";
import JWT from "./pages/docs/auth/JWT";
import Guards from "./pages/docs/Guards";
import EnvironmentVariables from "./pages/docs/EnvironmentVariables";
import Deployment from "./pages/docs/Deployment";
import Theming from "./pages/docs/Theming";
import APICalls from "./pages/docs/APICalls";
import Redux from "./pages/docs/Redux";
import Internationalization from "./pages/docs/Internationalization";
import ESLintAndPrettier from "./pages/docs/ESLintAndPrettier";
import MigratingToNextJS from "./pages/docs/MigratingToNextJS";
import Support from "./pages/docs/Support";
import Changelog from "./pages/docs/Changelog";

// Landing
import Landing from "./pages/presentation/Landing";

// Protected routes
import ProtectedPage from "./pages/protected/ProtectedPage";

// Dashboard components
const Default = async(() => import("./pages/dashboards/Default"));

// Form components
const Pickers = async(() => import("./pages/forms/Pickers"));
const Editors = async(() => import("./pages/forms/Editors"));
const Formik = async(() => import("./pages/forms/Formik"));

// Icon components
const FeatherIcons = async(() => import("./pages/icons/FeatherIcons"));
const Profile = async(() => import("./pages/pages/Profile"));
const Tasks = async(() => import("./pages/pages/Tasks"));
const Calendar = async(() => import("./pages/pages/Calendar"));

// Table components
const DataGrid = async(() => import("./pages/tables/DataGrid"));

// Chart components
const Chartjs = async(() => import("./pages/charts/Chartjs"));

// Maps components
const GoogleMaps = async(() => import("./pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("./pages/maps/VectorMaps"));

// Admin Components
const AdminDashboard = async(() => import("./pages/Users/Admin/Dashboard"));
const AdminTicket = async(() => import("./pages/Users/Admin/Ticket/Ticket"));
const AdminReserva = async(() => import("./pages/Users/Admin/Booking/Booking"));
const AdminEmpresa = async(() => import("./pages/Users/Admin/Company/Company"));
const AdminEmpleado = async(() =>
  import("./pages/Users/Admin/Employee/Employee")
);
const AdminSucursal = async(() => import("./pages/Users/Admin/Branch/Branch"));
const AdminEncuesta = async(() => import("./pages/Users/Admin/Survey/Survey"));
const AdminProfile = async(() => import("./pages/Users/Admin/Profile/Profile"));

const routes = [
  {
    path: "smartkiu",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "smartkiu/admin",

    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),

    children: [
      {
        path: "default",
        element: <Default />,
      },
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
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Changelog />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

export default routes;
