import React from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";

import { Paper, Typography } from "@mui/material";

import { ReactComponent as Logo } from "../../vendor/happyqlogo.svg";
import ResetPasswordComponent from "../../components/auth/ResetPassword";

const Brand = styled(Logo)`
  fill: ${(props) => props.theme.palette.primary.main};
  width: 64px;
  height: 64px;
  margin-bottom: 32px;
`;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

function ResetPassword() {
  return (
    <React.Fragment>
      <Brand />
      <Wrapper>
        <Helmet title="Reset Password" />

        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Cambiar Contraseña
        </Typography>
        <Typography component="h2" variant="body1" align="center">
          Introduce tu correo electrónico para restablecer tu contraseña
        </Typography>

        <ResetPasswordComponent />
      </Wrapper>
    </React.Fragment>
  );
}

export default ResetPassword;
