import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography as MuiTypography,
} from "@mui/material";

import { spacing } from "@mui/system";

const Chip = styled(MuiChip)`
  height: 20px;
  margin-top: -3px;
  font-weight: bold;
  font-size: 75%;
`;

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Changelog() {
  return (
    <React.Fragment>
      <Helmet title="Changelog" />

      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={12} lg={9} xl={7}>
          <Typography variant="h2" gutterBottom display="inline">
            Changelog
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Changelog</Typography>
          </Breadcrumbs>

          <Divider my={6} />

          <Box mt={3}>
            <Typography variant="subtitle1">
              <Chip color="secondary" label="v1.0.0" /> – Feb 01, 2024
              <ul>
                <li>Se agregó la funcionalidad de Empresas</li>
                <li>Se agregó la funcionalidad de Empleados</li>
                <li>Se agregó la funcionalidad de Sucursales</li>
                <li>Se añadió filtrado para las sucursales </li>
                <li>Se añadió filtrado para las Empresas </li>
              </ul>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Changelog;
