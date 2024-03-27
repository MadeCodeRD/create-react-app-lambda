import React from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";

import { Avatar, Paper, Typography } from "@mui/material";

import { ReactComponent as Logo } from "../../vendor/happyqlogo.svg";
import SignInComponent from "../../components/auth/SignIn";

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

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)};
`;

function SignIn() {
  const userData = JSON.parse(localStorage.getItem("user"));
  return (
    <React.Fragment>
      <Brand />
      <Wrapper>
        <Helmet title="Sign In" />
        {userData && <BigAvatar alt={userData.name} src={userData.photoUrl} />}

        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Bienvenida de vuelta {userData ? `${userData.name}!` : ""}
        </Typography>
        <Typography component="h2" variant="body1" align="center">
          Iniciar Sesion para continuar...
        </Typography>

        <SignInComponent />
      </Wrapper>
    </React.Fragment>
  );
}

export default SignIn;
