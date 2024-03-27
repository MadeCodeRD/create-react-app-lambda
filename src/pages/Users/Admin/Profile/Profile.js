import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import ProfileForm from "./ProfileForm";
import { spacing } from "@mui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const CenteredContent = styled.div`
  text-align: center;
`;

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto ${(props) => props.theme.spacing(2)};
`;

function Private() {
  const { adminProfile } = useSelector((state) => state.happyqAdminProfile);
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom></Typography>

        <Grid item md={12}>
          <CenteredContent>
            <BigAvatar alt="LoggedUser" src={adminProfile.photoUrl} />
          </CenteredContent>
        </Grid>
        <ProfileForm />
      </CardContent>
    </Card>
  );
}

function Profile() {
  return (
    <React.Fragment>
      <Helmet title="Perfil" />

      <Typography variant="h3" gutterBottom display="inline">
        Perfil
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/smartkiu/admin/dashboard">
          Dashboard
        </Link>

        <Typography> Perfil</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Private />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Profile;
