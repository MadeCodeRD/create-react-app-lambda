import React from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { updateTicketDetails } from "../../../../redux/slices/HappyQ_Admin/Admin_Dashboard";
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
  const { companyData } = useSelector((state) => state.happyqAdminCompany);
  const { ticketDetails } = useSelector((state) => state.happyqAdminDashboard);
  const { adminProfile } = useSelector((state) => state.happyqAdminProfile);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const ticketCalc = companyData.reduce(
      (accumulator, currentValue) => {
        accumulator.openTickets += currentValue.ticketDetails.openTickets;
        accumulator.closedTickets += currentValue.ticketDetails.closedTickets;
        accumulator.vip += currentValue.ticketDetails.vip;
        return accumulator;
      },
      {
        openTickets: 0,
        closedTickets: 0,
        vip: 0,
      }
    );
    dispatch(updateTicketDetails(ticketCalc));
  }, [companyData, dispatch]);
  return (
    <React.Fragment>
      <Helmet title="SMART KIU" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Dashboard Analítico
          </Typography>
          <Typography variant="subtitle1">
            {"Bienvenida Nuevamente"}, {adminProfile.name}! {"Te extrañamos"}.{" "}
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
                  ticketDetails.openTickets +
                  ticketDetails.closedTickets +
                  ticketDetails.vip
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
                amount={ticketDetails.openTickets}
                percentagetext="-12%"
                percentagecolor={red[500]}
                message="Desde la semana pasada"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Cerrados"
                amount={ticketDetails.closedTickets}
                percentagetext="+18%"
                percentagecolor={green[500]}
                message="Desde el mes pasado"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="VIP"
                amount={ticketDetails.vip}
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
