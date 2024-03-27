import * as Yup from "yup";
import styled from "styled-components/macro";
import { Formik, FieldArray } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  addEmployee,
  setCurrentEmployee,
  filterEmployeeName,
} from "../../../../redux/slices/HappyQ_Admin/Admin_Employee";
import { filterSurveyEmployee } from "../../../../redux/slices/HappyQ_Admin/Admin_Survey";
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
import { MinusCircle, PlusCircle } from "react-feather";

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
  password: Yup.string()
    .min(12, "Contraseña debe ser minimo 12")
    .max(255)
    .required("Requerido"),
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

const makeEmployeeObject = ({ values, employeeToUpdate }) => {
  return {
    id: employeeToUpdate.id,
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
    date: employeeToUpdate.date,
    email: values.email,
    role: employeeToUpdate.role,
    status: employeeToUpdate.status,
    company: employeeToUpdate.company,
    services: values.services,
    rut: values.rut,
    password: values.password,
    confirmPassword: values.confirmPassword,
  };
};

function EmployeeForm() {
  const { employeeData, currentEmployee } = useSelector(
    (state) => state.happyqAdminEmployee
  );

  const dispatch = useDispatch();
  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      await timeOut(1500);
      let employees = employeeData;
      const employeeToUpdate = employees.find(
        (employee) => values.id === employee.id
      );
      employees = employees.filter((employee) => values.id !== employee.id);

      const newEmployee = makeEmployeeObject({
        values,
        employeeToUpdate,
      });

      dispatch(addEmployee([newEmployee, ...employees]));
      dispatch(setCurrentEmployee(newEmployee));
      dispatch(filterEmployeeName([]));
      dispatch(filterSurveyEmployee([]));

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
      initialValues={currentEmployee}
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
                Empleado Actualizado!
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
                <Grid container spacing={6} mb={3}>
                  <Grid item>
                    <FieldArray
                      name="services"
                      render={(arrayHelpers) => (
                        <div>
                          {values.services && values.services.length > 0 ? (
                            values.services.map((service, index) => (
                              <div key={index}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <TextField
                                    name={`services.${index}`}
                                    mb={3}
                                    onChange={handleChange}
                                    label="Confirmar Servicio"
                                    placeholder="No puede estar vacio!"
                                    value={service}
                                    error={Boolean(
                                      touched.services && errors.services
                                    )}
                                  />
                                  <Button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <MinusCircle />
                                  </Button>
                                  <Button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    }
                                  >
                                    <PlusCircle />
                                  </Button>
                                </Box>
                              </div>
                            ))
                          ) : (
                            <Button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                            >
                              Añadir Servicios
                              <PlusCircle />
                            </Button>
                          )}
                        </div>
                      )}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  mt={3}
                >
                  Guardar
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}

export default EmployeeForm;
