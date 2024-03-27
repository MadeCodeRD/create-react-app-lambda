import React from "react";
import { useSelector } from "react-redux";

import styled, { withTheme } from "styled-components/macro";
import Chart from "react-chartjs-2";

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardHeader,
} from "@mui/material";
import { spacing } from "@mui/system";

import { LABELS } from "../../../../constants";
const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)};
  }
`;

const ChartWrapper = styled.div`
  height: 240px;
  width: 100%;
`;

const BarChart = ({ theme }) => {
  const { companyProfile } = useSelector((state) => state.happyqCompanyProfile);
  const DATASETS = [
    {
      label: companyProfile.name,
      backgroundColor: theme.palette.warning.light,
      borderColor: theme.palette.warning.light,
      hoverBackgroundColor: theme.palette.warning.light,
      hoverBorderColor: theme.palette.warning.light,
      data: companyProfile.data,
      barPercentage: 0.35,
      categoryPercentage: 0.5,
      borderRadius: 10,
      borderWidth: 1,
    },
  ];
  const data = {
    labels: LABELS,
    datasets: DATASETS,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
      },

      x: {
        grid: {
          color: "transparent",
        },
      },
    },
  };

  return (
    <Card mb={6}>
      <CardHeader title="Tickets Atendidos" />

      <CardContent>
        <ChartWrapper>
          <Chart type="line" data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};

export default withTheme(BarChart);
