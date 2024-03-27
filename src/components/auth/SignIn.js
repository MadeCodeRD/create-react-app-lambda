import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URLINITIALROLES, ROLES } from "../../constants";
import { updateAdminDetails } from "../../redux/slices/HappyQ_Admin/Admin_Profile";
import { updateCompanyDetails } from "../../redux/slices/HappyQ_Company/Company_Profile";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Alert as MuiAlert,
  Checkbox,
  FormControlLabel,
  Button,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";

import useAuth from "../../hooks/useAuth";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signIn, user } = useAuth();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case ROLES.Admin:
          dispatch(updateAdminDetails(user));
          break;
        case ROLES.Company:
          dispatch(updateCompanyDetails(user));
          break;
        default:
          break;
      }
      navigate(URLINITIALROLES[user.role]);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Formik
      initialValues={{
        email: "pedropascal01@gmail.com",
        password: "holaSoyGoku123@",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Colocar email valido!")
          .max(255)
          .required("Email Requerido!"),
        password: Yup.string().max(255).required("Contraseña Requerida!"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await signIn(values.email, values.password);
        } catch (error) {
          const message = error.message || "Algo salió mal!";

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          {/* <Alert mt={3} mb={3} severity="info">
            Use <strong>demo@bootlab.io</strong> and{" "}
            <strong>unsafepassword</strong> to sign in
          </Alert> */}
          {errors.submit && (
            <Alert mt={2} mb={3} severity="warning">
              {errors.submit}
            </Alert>
          )}
          <TextField
            type="email"
            name="email"
            label="Email Address"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            value={values.password}
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Ingresar
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default SignIn;
