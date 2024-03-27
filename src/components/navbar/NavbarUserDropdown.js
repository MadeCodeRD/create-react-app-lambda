import * as React from "react";
import styled from "styled-components/macro";
import { Power } from "react-feather";
import { useNavigate } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { URLPROFILEROLES, ROLES } from "../../constants";

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@mui/material";

import useAuth from "../../hooks/useAuth";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

function NavbarUserDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleSignOut = async () => {
    await signOut();
    await customFetch.get("/UserAuth/logout");
    navigate("/smartkiu/login");
  };

  const handleGoToProfile = async () => {
    if (user) {
      switch (user.role) {
        case ROLES.Admin:
          navigate(URLPROFILEROLES[user.role]);
          break;
        case ROLES.Company:
          navigate(URLPROFILEROLES[user.role]);
          break;
        default:
          break;
      }
    }

    setAnchorMenu(null);
  };

  return (
    <React.Fragment>
      <Tooltip title="Account">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          size="large"
        >
          <Power />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={handleGoToProfile}>Perfil</MenuItem>
        <MenuItem onClick={handleSignOut}>Salir</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default NavbarUserDropdown;
