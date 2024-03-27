import * as Yup from "yup";
import styled from "styled-components/macro";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateAdminDetails } from "../../../../redux/slices/HappyQ_Admin/Admin_Profile";
import {
  Alert as MuiAlert,
  Box,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Grid,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Requerido"),
  lastName: Yup.string().required("Requerido"),
  photoUrl: Yup.string().required("Requerido"),
  email: Yup.string().email().required("Requerido"),
  password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/,
    `At least 8 characters long.
      Must contain at least one lowercase letter.
      Must contain at least one uppercase letter.
      Must contain at least one digit.`
  ),
  confirmPassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Las contraseñas deben coincidir"
    ),
  }),
  phoneNumber: Yup.string()
    .required("Requerido")
    .matches(
      /^(\+?56)?(\s?)(0?9[98765432]\d{7}|0?(2|3[2-5]|4[1-5]|5[123578]|6[13457]|7[1235])\s?\d{6})$/,
      "Numero Chileno Invalido"
    ),
  address: Yup.object().shape({
    street: Yup.string().required("Requerido"),
    numHouseOrApartment: Yup.string().required("Requerido"),
    neighborhood: Yup.string().required("Requerido"),
    city: Yup.string().required("Requerido"),
    zipCode: Yup.string()
      .required("Requerido")
      .matches(/^[0-9]+$/, "Solo digitos!")
      .min(7, "Codigo postal no valido!")
      .max(7, "Codigo postal no valido!"),
  }),
  rut: Yup.string()
    .required()
    .matches(/^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/, "Rut no valido!"),
  services: Yup.array().of(
    Yup.string().required("Todos los servicios deben estar completados!")
  ),
});

const makeUpdateAdminObject = ({ values, admin }) => {
  return {
    id: admin.id,
    name: values.name,
    lastName: values.lastName,
    photoUrl: values.photoUrl,
    phoneNumber: values.phoneNumber,
    address: {
      street: values.address.street,
      numHouseOrApartment: values.address.numHouseOrApartment,
      neighborhood: values.address.neighborhood,
      city: values.address.city,
      zipCode: values.address.zipCode,
    },
    date: admin.date,
    email: values.email,
    role: admin.role,
    status: admin.status,
    rut: values.rut,
    password: values.password,
    confirmPassword: values.confirmPassword,
  };
};

function AdminForm() {
  const { adminProfile } = useSelector((state) => state.happyqAdminProfile);

  const dispatch = useDispatch();
  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      await timeOut(1500);
      let admin = adminProfile;

      const updatedAdmin = makeUpdateAdminObject({
        values,
        admin,
      });
      dispatch(updateAdminDetails(updatedAdmin));
      resetForm();
      setStatus({ sent: true });
      setSubmitting(false);
    } catch (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={adminProfile}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        status,
      }) => (
        <Card mb={6}>
          <CardContent>
            {status && status.sent && (
              <Alert severity="success" my={3}>
                Información Actualizada!
              </Alert>
            )}

            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <TextField
                      name="name"
                      label="Nombre"
                      value={values.name}
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="lastName"
                      label="Apellido"
                      value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="phoneNumber"
                      label="Telefono"
                      value={values.phoneNumber}
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      fullWidth
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="email"
                      label="Email"
                      value={values.email}
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Grid>
                <TextField
                  name="photoUrl"
                  label="Logo URL"
                  value={values.photoUrl}
                  error={Boolean(touched.photoUrl && errors.photoUrl)}
                  fullWidth
                  helperText={touched.photoUrl && errors.photoUrl}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  variant="outlined"
                  my={2}
                />
                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <TextField
                      name="address.street"
                      label="Calle"
                      value={values.address.street}
                      error={Boolean(
                        touched.address?.street && errors.address?.street
                      )}
                      fullWidth
                      helperText={
                        touched.address?.street && errors.address?.street
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="address.numHouseOrApartment"
                      label="Num Casa/Apartamento"
                      value={values.address.numHouseOrApartment}
                      error={Boolean(
                        touched.address?.numHouseOrApartment &&
                          errors.address?.numHouseOrApartment
                      )}
                      fullWidth
                      helperText={
                        touched.address?.numHouseOrApartment &&
                        errors.address?.numHouseOrApartment
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <TextField
                      name="address.neighborhood"
                      label="Sector"
                      value={values.address.neighborhood}
                      error={Boolean(
                        touched.address?.neighborhood &&
                          errors.address?.neighborhood
                      )}
                      fullWidth
                      helperText={
                        touched.address?.neighborhood &&
                        errors.address?.neighborhood
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="address.city"
                      label="Ciudad"
                      value={values.address.city}
                      error={Boolean(
                        touched.address?.city && errors.address?.city
                      )}
                      fullWidth
                      helperText={touched.address?.city && errors.address?.city}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <TextField
                      name="address.zipCode"
                      label="Codigo Postal"
                      value={values.address.zipCode}
                      error={Boolean(
                        touched.address?.zipCode && errors.address?.zipCode
                      )}
                      fullWidth
                      helperText={
                        touched.address?.zipCode && errors.address?.zipCode
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="rut"
                      label="RUT"
                      placeholder="72.693.815-6"
                      value={values.rut}
                      error={Boolean(touched.rut && errors.rut)}
                      fullWidth
                      helperText={touched.rut && errors.rut}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <TextField
                      name="password"
                      label="Password"
                      value={values.password}
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="confirmPassword"
                      label="Confirm password"
                      value={values.confirmPassword}
                      error={Boolean(
                        touched.confirmPassword && errors.confirmPassword
                      )}
                      fullWidth
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  mt={3}
                >
                  Guardar Cambios
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}

export default AdminForm;
