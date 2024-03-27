import React from "react";
import styled, { withTheme } from "styled-components/macro";
import Chart from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { updateSurveyDetails } from "../../../../redux/slices/HappyQ_Company/Company_Dashboard";
import { green, red, orange, indigo, blue } from "@mui/material/colors";
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow as MuiTableRow,
  Typography,
  MenuItem,
  Checkbox,
  Paper,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  FormControl,
  Input,
  InputLabel,
  Select,
  ListItemText,
} from "@mui/material";
import { spacing } from "@mui/system";
import { FilterList as FilterListIcon } from "@mui/icons-material";
import { MENUPROPS } from "../../../../constants";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(2)};
  }
`;

const ChartWrapper = styled.div`
  height: 168px;
  position: relative;
`;

const DoughnutInner = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -22px;
  text-align: center;
  z-index: 0;
`;

const TableRow = styled(MuiTableRow)`
  height: 42px;

  &:last-child th,
  &:last-child td {
    border-bottom: 0;
  }
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

const GreenText = styled.span`
  color: ${() => green[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const RedText = styled.span`
  color: ${() => red[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const OrangeText = styled.span`
  color: ${() => orange[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const IndigoText = styled.span`
  color: ${() => indigo[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const BlueText = styled.span`
  color: ${() => blue[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const getSurveyResult = ({ surveyData }) => {
  const surveyValue = surveyData.reduce(
    (accumulator, currentValue) => {
      if (currentValue.score === 1) {
        accumulator[0].value++;
      } else if (currentValue.score === 2) {
        accumulator[1].value++;
      } else if (currentValue.score === 3) {
        accumulator[2].value++;
      } else if (currentValue.score === 4) {
        accumulator[3].value++;
      } else {
        accumulator[4].value++;
      }
      return accumulator;
    },
    [
      { name: "Muy Insatisfecho", value: 0 },
      { name: "Insatisfecho", value: 0 },
      { name: "Neutral", value: 0 },
      { name: "Satisfecho", value: 0 },
      { name: "Muy Satisfecho", value: 0 },
    ]
  );

  return surveyValue;
};

const DoughnutChart = ({ theme }) => {
  const { surveyDetails } = useSelector(
    (state) => state.happyqCompanyDashboard
  );

  const { surveyData } = useSelector((state) => state.happyqCompanySurvey);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(updateSurveyDetails(getSurveyResult({ surveyData })));
  }, [surveyData, dispatch]);

  const LABELS = surveyDetails.map((survey) => survey.name);

  const DATASETS = [
    {
      data: surveyDetails.map((survey) => survey.value),
      backgroundColor: [
        red[500],
        orange[500],
        indigo[500],
        green[500],
        blue[500],
      ],
      borderWidth: 5,
      borderColor: theme.palette.background.paper,
    },
  ];

  const data = {
    labels: LABELS,
    datasets: DATASETS,
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "80%",
  };

  const tableBody = [];

  for (let i = 0; i < data.labels.length; i++) {
    const percentCalc = data.datasets[0].data.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    const isZero = percentCalc === 0;
    tableBody.push(
      <TableRow key={`index${i}`}>
        <TableCell component="th" scope="row">
          {data.labels[i]}
        </TableCell>
        <TableCell align="right"> {data.datasets[0].data[i]}</TableCell>
        <TableCell align="right">
          {data.labels[i] === "Muy Insatisfecho" ? (
            <RedText>
              {!isZero &&
                Math.round((data.datasets[0].data[i] / percentCalc) * 100)}
              %
            </RedText>
          ) : data.labels[i] === "Insatisfecho" ? (
            <OrangeText>
              {" "}
              {!isZero &&
                Math.round((data.datasets[0].data[i] / percentCalc) * 100)}
              %
            </OrangeText>
          ) : data.labels[i] === "Neutral" ? (
            <IndigoText>
              {" "}
              {!isZero &&
                Math.round((data.datasets[0].data[i] / percentCalc) * 100)}
              %
            </IndigoText>
          ) : data.labels[i] === "Satisfecho" ? (
            <GreenText>
              {" "}
              {!isZero &&
                Math.round((data.datasets[0].data[i] / percentCalc) * 100)}
              %
            </GreenText>
          ) : (
            <BlueText>
              {" "}
              {!isZero &&
                Math.round((data.datasets[0].data[i] / percentCalc) * 100)}
              %
            </BlueText>
          )}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Card mb={6}>
      <CardHeader title="Encuestas" />
      <CardContent>
        <ChartWrapper>
          <DoughnutInner>
            <Typography variant="caption">Clientes</Typography>
          </DoughnutInner>
          <Chart type="doughnut" data={data} options={options} />
        </ChartWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Score / Porcentaje</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Porcentaje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableBody}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default withTheme(DoughnutChart);
