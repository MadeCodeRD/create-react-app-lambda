import { createContext, useEffect, useReducer } from "react";
import axios from "../utils/axios";
import customFetch from "../utils/customFetch";
import { ROLES } from "../constants";
import { setSession } from "../utils/jwt";

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const SIGN_UP = "SIGN_UP";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const saveInLocalStorage = (userValues) => {
  localStorage.setItem("user", JSON.stringify(userValues));
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case "SIGN_IN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case "SIGN_UP":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        let response = "";
        const user = JSON.parse(window.localStorage.getItem("user"));

        if (user.role === ROLES.Admin) {
          response = await customFetch.get("/Admin/current-admin");
        }

        if (user.role === ROLES.Company) {
          response = await customFetch.get("/Company/current-company");
        }

        if (response) {
          const { user } = response.data;

          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async (email, password) => {
    const response = await customFetch.post("/UserAuth/login", {
      email,
      password,
    });

    const { accessToken, user } = response.data;

    setSession(accessToken);
    dispatch({
      type: SIGN_IN,
      payload: {
        user,
      },
    });

    saveInLocalStorage({
      name: user.name,
      photoUrl: user.photoUrl,
      role: user.role,
    });
  };

  const signOut = async () => {
    setSession(null);
    dispatch({ type: SIGN_OUT });
    const user = JSON.parse(window.localStorage.getItem("user"));
    saveInLocalStorage({
      name: user.name,
      photoUrl: user.photoUrl,
    });
  };

  const signUp = async (email, password, firstName, lastName) => {
    const response = await axios.post("/api/auth/sign-up", {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem("accessToken", accessToken);
    dispatch({
      type: SIGN_UP,
      payload: {
        user,
      },
    });
  };

  const resetPassword = (email) => console.log(email);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        signIn,
        signOut,
        signUp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
