import React from "react";
import * as Yup from "yup";
import styled from "styled-components/macro";
import { Formik, FieldArray } from "formik";
import { useSelector, useDispatch } from "react-redux";
import customFetch from "../../../../utils/customFetch";
import {
  addCompany,
  setCurrentCompany,
  filterCompanyName as filterCompanyNameCompany,
} from "../../../../redux/slices/HappyQ_Admin/Admin_Company";
import { filterCompanyName as filterCompanyNameTicket } from "../../../../redux/slices/HappyQ_Admin/Admin_Tickets";
import { filterCompanyName as filterCompanyNameBooking } from "../../../../redux/slices/HappyQ_Admin/Admin_Booking";
import { filterEmployeeCompany } from "../../../../redux/slices/HappyQ_Admin/Admin_Employee";
import { filterBranchCompany } from "../../../../redux/slices/HappyQ_Admin/Admin_Branch";
import { filterSurveyCompany } from "../../../../redux/slices/HappyQ_Admin/Admin_Survey";
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
import { MinusCircle, PlusCircle } from "react-feather";
import { spacing } from "@mui/system";
import { STATUS, ENTITYTYPE } from "../../../../constants";

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const initialValues = {
  name: "",
  photoUrl: "",
  phoneNumber: "",
  address: {
    street: "",
    numHouseOrApartment: "",
    neighborhood: "",
    city: "",
    zipCode: "",
  },
  email: "",
  rut: "",
  password: "",
  confirmPassword: "",
  services: [],
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Requerido"),
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

const makeCompanyObject = ({ isEditing, values, companyToUpdate = {} }) => {
  return {
    id: !isEditing
      ? `000${(Date.now() + Math.random()).toString().split(".")[1]}`
      : companyToUpdate.id,
    name: values.name,
    photoUrl: values.photoUrl,
    phoneNumber: values.phoneNumber,
    address: {
      street: values.address.street,
      numHouseOrApartment: values.address.numHouseOrApartment,
      neighborhood: values.address.neighborhood,
      city: values.address.city,
      zipCode: values.address.zipCode,
    },
    date: !isEditing
      ? new Date().toLocaleString().split(",")[0]
      : companyToUpdate.date,
    email: values.email,
    role: !isEditing ? ENTITYTYPE.COMPANY : companyToUpdate.role,
    status: !isEditing ? STATUS.ACTIVE : companyToUpdate.status,
    rut: values.rut,
    services: values.services,
    password: values.password,
    confirmPassword: values.confirmPassword,
    data: !isEditing ? [] : companyToUpdate.data,
    ticketDetails: !isEditing
      ? { openTickets: 0, closedTickets: 0, vip: 0 }
      : companyToUpdate.ticketDetails,
  };
};

function CompanyForm() {
  const { companyData, currentCompany } = useSelector(
    (state) => state.happyqAdminCompany
  );
  const dispatch = useDispatch();
  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      const isEditing = Object.keys(currentCompany).length !== 0;
      if (!isEditing) {
        const newCompany = makeCompanyObject({
          isEditing,
          values,
        });
        //await customFetch.post("/UserAuth/login", newCompany);
        dispatch(addCompany([newCompany, ...companyData]));
      } else {
        let companies = companyData;
        const companyToUpdate = companies.find(
          (company) => values.id === company.id
        );
        companies = companies.filter((company) => values.id !== company.id);

        const newCompany = makeCompanyObject({
          isEditing,
          values,
          companyToUpdate,
        });

        dispatch(addCompany([newCompany, ...companies]));
        dispatch(setCurrentCompany(newCompany));
        dispatch(filterCompanyNameCompany([]));
        dispatch(filterCompanyNameTicket([]));
        dispatch(filterCompanyNameBooking([]));
        dispatch(filterEmployeeCompany([]));
        dispatch(filterBranchCompany([]));
        dispatch(filterSurveyCompany([]));
      }

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
      initialValues={
        Object.keys(currentCompany).length === 0
          ? initialValues
          : currentCompany
      }
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
                {Object.keys(currentCompany).length === 0
                  ? "Empresa agregada!"
                  : "Empresa Actualizada!"}
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
                </Grid>
                <TextField
                  name="email"
                  label="Email"
                  value={values.email}
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  variant="outlined"
                  my={2}
                />
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
                  mt={6}
                >
                  {Object.keys(currentCompany).length === 0
                    ? "Crear Empresa"
                    : "Guardar"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}

export default CompanyForm;
