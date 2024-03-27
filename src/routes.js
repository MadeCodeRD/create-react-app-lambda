import AuthLayout from "./layouts/Auth";
import SignIn from "./pages/auth/SignIn";
import Page404 from "./pages/auth/Page404";

export const loginRoute = {
  path: "smartkiu",
  element: <AuthLayout />,
  children: [
    {
      path: "login",
      element: <SignIn />,
    },
  ],
};

export const loginUserRoute = {
  path: "/",
  element: <AuthLayout />,
  children: [
    {
      path: "",
      element: <SignIn />,
    },
  ],
};

export const notFoundRoute = {
  path: "*",
  element: <AuthLayout />,
  children: [
    {
      path: "*",
      element: <Page404 />,
    },
  ],
};
