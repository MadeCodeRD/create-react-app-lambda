import React from "react";
import styled from "styled-components/macro";

import { Button as MuiButton } from "@mui/material";

import { spacing } from "@mui/system";

const Button = styled(MuiButton)(spacing);

function Actions() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="secondary"
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ pointerEvents: "none", cursor: "not-allowed" }}
      >
        Hoy: {new Date().toLocaleDateString()}
      </Button>
    </React.Fragment>
  );
}

export default Actions;
