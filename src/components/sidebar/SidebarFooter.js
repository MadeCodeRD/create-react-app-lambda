import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import { Badge, Grid, Avatar, Typography } from "@mui/material";
import { ROLES } from "../../constants";
import useAuth from "../../hooks/useAuth";

const Footer = styled.div`
  background-color: ${(props) =>
    props.theme.sidebar.footer.background} !important;
  padding: ${(props) => props.theme.spacing(2.75)}
    ${(props) => props.theme.spacing(4)};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const FooterText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
`;

const FooterSubText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
  font-size: 0.7rem;
  display: block;
  padding: 1px;
`;

const FooterBadge = styled(Badge)`
  margin-right: ${(props) => props.theme.spacing(1)};
  span {
    background-color: ${(props) =>
      props.theme.sidebar.footer.online.background};
    border: 1.5px solid ${(props) => props.theme.palette.common.white};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;

const SidebarFooter = ({ ...rest }) => {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState({
    name: "",
    photoUrl: "",
    lastName: "",
  });
  const { adminProfile } = useSelector((state) => state.happyqAdminProfile);
  const { companyProfile } = useSelector((state) => state.happyqCompanyProfile);
  const onLine = navigator.onLine;
  let styleOnline = onLine ? "green" : "red";

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case ROLES.Admin:
          setCurrentUser(adminProfile);
          break;
        case ROLES.Company:
          setCurrentUser(companyProfile);
          break;
        default:
          break;
      }
    }
  }, [adminProfile, companyProfile, user]);
  return (
    <Footer {...rest}>
      <Grid container spacing={2}>
        <Grid item>
          <FooterBadge
            sx={{ span: { backgroundColor: styleOnline } }}
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            {!!user && (
              <Avatar alt={`${currentUser.name}`} src={currentUser.photoUrl} />
            )}
          </FooterBadge>
        </Grid>
        <Grid item>
          {!!user && (
            <>
              <FooterText variant="body2">{`${currentUser.name} ${
                currentUser.lastName || ""
              }`}</FooterText>
              <FooterSubText variant="caption">
                {currentUser.role}
              </FooterSubText>
            </>
          )}
        </Grid>
      </Grid>
    </Footer>
  );
};

export default SidebarFooter;
