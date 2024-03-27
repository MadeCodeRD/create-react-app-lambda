import { createContext, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../constants";
import useAuth from "../hooks/useAuth";
import { loginRoute, loginUserRoute, notFoundRoute } from "../routes";
import adminRoutes from "../pages/Users/Admin/routes";
import companyRoutes from "../pages/Users/Company/routes";

const RouterContext = createContext(null);

const RouterProvider = () => {
  const { user } = useAuth();
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case ROLES.Admin:
          setRoutes([loginUserRoute, loginRoute, adminRoutes, notFoundRoute]);
          break;
        case ROLES.Company:
          setRoutes([loginUserRoute, loginRoute, companyRoutes, notFoundRoute]);
          break;
        default:
          break;
      }
    } else {
      setRoutes([loginUserRoute, loginRoute, notFoundRoute]);
      navigate("/smartkiu/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const content = useRoutes(routes);

  return (
    <RouterContext.Provider value={null}>{content}</RouterContext.Provider>
  );
};

export { RouterContext, RouterProvider };
