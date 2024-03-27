import React from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import { spacing } from "@mui/system";

import Actions from "./Actions";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import Stats from "./Stats";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Analytics() {
  const { companyProfile } = useSelector((state) => state.happyqCompanyProfile);

  return (
    <React.Fragment>
      <Helmet title="SMART KIU" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Dashboard Analítico
          </Typography>
          <Typography variant="subtitle1">
            {"Bienvenida Nuevamente"}, {companyProfile.name}! {"Te extrañamos"}.{" "}
            <span role="img" aria-label="Waving Hand Sign">
              👋
            </span>
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={6} />
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={11}>
          <BarChart />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={11}>
          <Grid container spacing={12}>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Total de Tickets"
                amount={
                  companyProfile.ticketDetails.openTickets +
                  companyProfile.ticketDetails.closedTickets +
                  companyProfile.ticketDetails.vip
                }
                chip="Hoy"
                percentagetext="+14%"
                percentagecolor={green[500]}
                illustration="/static/img/illustrations/working.png"
                message="Desde la semana pasada"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Abiertos"
                amount={companyProfile.ticketDetails.openTickets}
                percentagetext="-12%"
                percentagecolor={red[500]}
                message="Desde la semana pasada"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Cerrados"
                amount={companyProfile.ticketDetails.closedTickets}
                percentagetext="+18%"
                percentagecolor={green[500]}
                message="Desde el mes pasado"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="VIP"
                amount={companyProfile.ticketDetails.vip}
                percentagetext="+27%"
                percentagecolor={green[500]}
                message="Tickets VIP"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item xs={12} lg={11}>
          <Divider my={6} />
          <DoughnutChart />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Analytics;
