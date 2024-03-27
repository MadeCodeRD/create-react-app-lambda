import React from "react";
import { useSelector, useDispatch } from "react-redux";
import customFetch from "../../../../utils/customFetch";
import { CircularProgress } from "@mui/material";
import { filterCompany } from "../../../../redux/slices/HappyQ_Admin/Admin_Dashboard";
import styled, { withTheme } from "styled-components/macro";
import Chart from "react-chartjs-2";

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardHeader,
  IconButton,
  MenuItem,
  Checkbox,
  Paper,
  FormControl,
  InputLabel,
  Select,
  Input,
  ListItemText,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { spacing } from "@mui/system";
import { FilterList as FilterListIcon, Try } from "@mui/icons-material";
import { MENUPROPS, LABELS, HEXCOLORS } from "../../../../constants";
import { addCompany } from "../../../../redux/slices/HappyQ_Admin/Admin_Company";
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

function FilterCompanies() {
  const { companyName } = useSelector((state) => state.happyqAdminDashboard);
  const { companyData } = useSelector((state) => state.happyqAdminCompany);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    dispatch(
      filterCompany(typeof value === "string" ? value.split(",") : value)
    );
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Paper mt={3}>
          <FormControl fullWidth sx={{ width: "26.25rem" }} m={2}>
            <InputLabel id="company-mutiple-checkbox-label">
              {"Empresa"}
            </InputLabel>
            <Select
              labelId="company-mutiple-checkbox-label"
              id="company-mutiple-checkbox"
              multiple
              value={companyName}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MENUPROPS}
            >
              {companyData.map((companyVal) => (
                <MenuItem
                  key={companyVal.id}
                  value={`${companyVal.name} #${companyVal.id}`}
                >
                  <Checkbox
                    checked={
                      companyName.indexOf(
                        `${companyVal.name} #${companyVal.id}`
                      ) > -1
                    }
                  />
                  <ListItemText
                    primary={`${companyVal.name} #${companyVal.id}`}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </CardContent>
    </Card>
  );
}

function FilterDialog(props) {
  const { open, onClose } = props;

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filtrar
        </Typography>
        <Paper mt={4}>
          <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Filtrar"}</DialogTitle>
            <DialogContent>
              {" "}
              <FilterCompanies />{" "}
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={onClose} color="primary" autoFocus>
                Filtrar
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </CardContent>
    </Card>
  );
}

const BarChart = ({ theme }) => {
  const { companyName } = useSelector((state) => state.happyqAdminDashboard);
  const { companyData } = useSelector((state) => state.happyqAdminCompany);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function getCompanyData() {
      try {
        const response = await customFetch.get("/Admin/getCompanies");
        const { companies } = response.data;
        dispatch(addCompany(companies));
        setLoading(false);
      } catch (error) {
        dispatch(addCompany([]));
        setLoading(false);
      }
    }

    getCompanyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chartColor = [
    {
      backgroundColor: theme.palette.primary.light,
      borderColor: theme.palette.primary.dark,
      hoverBackgroundColor: theme.palette.primary.light,
      hoverBorderColor: theme.palette.primary.light,
    },
    {
      backgroundColor: theme.palette.secondary.light,
      borderColor: theme.palette.secondary.light,
      hoverBackgroundColor: theme.palette.secondary.light,
      hoverBorderColor: theme.palette.secondary.light,
    },
    {
      backgroundColor: theme.palette.error.light,
      borderColor: theme.palette.error.light,
      hoverBackgroundColor: theme.palette.error.light,
      hoverBorderColor: theme.palette.error.light,
    },
    {
      backgroundColor: theme.palette.warning.light,
      borderColor: theme.palette.warning.light,
      hoverBackgroundColor: theme.palette.warning.light,
      hoverBorderColor: theme.palette.warning.light,
    },

    {
      backgroundColor: theme.palette.success.light,
      borderColor: theme.palette.success.light,
      hoverBackgroundColor: theme.palette.success.light,
      hoverBorderColor: theme.palette.success.light,
    },
  ];

  const DATASETS =
    companyName.length === 0
      ? companyData.slice(0, 5).map((company, index) => {
          return {
            label: company.name,
            backgroundColor: chartColor[index].backgroundColor,
            borderColor: chartColor[index].borderColor,
            hoverBackgroundColor: chartColor[index].hoverBackgroundColor,
            hoverBorderColor: chartColor[index].hoverBorderColor,
            data: company.data,
            barPercentage: 0.35,
            categoryPercentage: 0.5,
            borderRadius: 10,
            borderWidth: 1,
          };
        })
      : companyData
          .filter((companyVal) =>
            companyName
              .map((company) => company.slice(company.lastIndexOf("#") + 1))
              .includes(companyVal.id)
          )
          .map((company, index) => {
            const random = Math.floor(Math.random() * HEXCOLORS.length);
            const randomColor = HEXCOLORS[random];
            const isBiggerThanFive = index >= chartColor.length;
            return {
              label: company.name,
              backgroundColor: isBiggerThanFive
                ? randomColor
                : chartColor[index].backgroundColor,
              borderColor: isBiggerThanFive
                ? randomColor
                : chartColor[index].borderColor,
              hoverBackgroundColor: isBiggerThanFive
                ? randomColor
                : chartColor[index].hoverBackgroundColor,
              hoverBorderColor: isBiggerThanFive
                ? randomColor
                : chartColor[index].hoverBorderColor,
              data: company.data,
              barPercentage: 0.35,
              categoryPercentage: 0.5,
              borderRadius: 10,
              borderWidth: 1,
            };
          });

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

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card mb={6}>
      <CardHeader
        action={
          <IconButton aria-label="filtrar" size="large" onClick={handleClick}>
            <FilterListIcon />
          </IconButton>
        }
        title="Tickets Atendidos"
      />
      {open && <FilterDialog open={open} onClose={handleClose} />}
      <CardContent>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <ChartWrapper>
            <Chart type="line" data={data} options={options} />
          </ChartWrapper>
        )}
      </CardContent>
    </Card>
  );
};

export default withTheme(BarChart);
