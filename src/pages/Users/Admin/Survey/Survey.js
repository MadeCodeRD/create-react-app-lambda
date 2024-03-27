import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import {
  filterSurveyScore,
  filterSurveyDate,
  filterSurveyCompany,
  setShowModal,
  filterSurveyBranch,
  filterSurveyService,
  filterSurveyEmployee,
} from "../../../../redux/slices/HappyQ_Admin/Admin_Survey";

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Checkbox,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Link,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  MenuItem,
  Card as MuiCard,
  TextField,
  Select,
  FormControl,
  DialogTitle,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  InputLabel,
  ListItemText,
} from "@mui/material";
import { green, orange } from "@mui/material/colors";
import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentSatisfied,
  SentimentSatisfiedAlt,
  SentimentVerySatisfied,
} from "@mui/icons-material";
import { red, yellow } from "@mui/material/colors";

import { spacing } from "@mui/system";
import { DatePicker } from "@mui/lab";
import { MENUPROPS } from "../../../../constants";

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
`;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => ({
    el,
    index,
  }));
  stabilizedThis.sort((a, b) => {
    const order = comparator(a.el, b.el);
    if (order !== 0) return order;
    return a.index - b.index;
  });
  return stabilizedThis.map((element) => element.el);
}

const headCells = [
  { id: "ticketId", alignment: "left", label: "TicketId" },
  { id: "score", alignment: "left", label: "Detalle Encuesta" },
  { id: "date", alignment: "left", label: "Fecha" },
  { id: "company", alignment: "left", label: "Empresa" },
  { id: "branch", alignment: "left", label: "Sucursal" },
  { id: "employee", alignment: "left", label: "Empleado" },
  { id: "service", alignment: "left", label: "Servicio" },
];

const filterSurveyList = ({
  score,
  date,
  company,
  employee,
  service,
  branch,
  surveyData,
}) => {
  let surveyList = surveyData;

  if (employee.length !== 0) {
    surveyList = surveyList.filter((survey) =>
      employee
        .map((employee) => employee.slice(employee.lastIndexOf("#") + 1))
        .includes(survey.employeeId)
    );
  }

  if (score.length !== 0) {
    surveyList = surveyList.filter((survey) => score.includes(survey.score));
  }

  if (date !== "") {
    surveyList = surveyList.filter((survey) => survey.date === date);
  }

  if (branch.length !== 0) {
    surveyList = surveyList.filter((survey) =>
      branch
        .map((branch) => branch.slice(branch.lastIndexOf("#") + 1))
        .includes(survey.branchId)
    );
  }

  if (company.length !== 0) {
    surveyList = surveyList.filter((survey) =>
      company
        .map((company) => company.slice(company.lastIndexOf("#") + 1))
        .includes(survey.companyId)
    );
  }

  if (service.length !== 0) {
    surveyList = surveyList.filter((survey) =>
      service.includes(survey.service)
    );
  }

  return surveyList;
};

const EnhancedSurveyTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

function FilterSurveyDialog(props) {
  const { open, onClose, surveyListFilter, setActivePage } = props;
  const { score, date, company, employee, service, branch, surveyData } =
    useSelector((state) => state.happyqAdminSurvey);
  const { companyData } = useSelector((state) => state.happyqAdminCompany);
  const { employeeData } = useSelector((state) => state.happyqAdminEmployee);
  const { branchData } = useSelector((state) => state.happyqAdminBranch);
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose(true);
  };

  const handleSurveyEmployeeChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(
      filterSurveyEmployee(typeof value === "string" ? value.split(",") : value)
    );
  };

  const handleSurveyScoreChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(
      filterSurveyScore(typeof value === "string" ? value.split(",") : value)
    );
  };

  const handleSurveyDateChange = (newDate) => {
    dispatch(filterSurveyDate(newDate));
  };

  const handleSurveyBranchChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(
      filterSurveyBranch(typeof value === "string" ? value.split(",") : value)
    );
  };

  const handleSurveyCompanyChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(
      filterSurveyCompany(typeof value === "string" ? value.split(",") : value)
    );
  };

  const handleSurveyServiceChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(
      filterSurveyService(typeof value === "string" ? value.split(",") : value)
    );
  };

  const getUniqueServices = (companyData) => {
    const services = [];
    companyData.forEach((company) =>
      company.services.forEach((service) => services.push(service))
    );
    return [...new Set(services)];
  };

  const handleSurveyListFilter = () => {
    const surveyList = filterSurveyList({
      score,
      date,
      company,
      employee,
      service,
      branch,
      surveyData,
    });

    surveyListFilter(surveyList);
    setActivePage(0);
    handleClose();
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Paper mt={3}>
          <div>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              <DialogTitle>Filtrar Encuestas</DialogTitle>
              <DialogContent>
                <form>
                  <Grid container spacing={2} mt={4}>
                    <FormControl fullWidth sx={{ width: "56.25rem" }}>
                      <InputLabel id="Empleado-select-label">
                        Empleado
                      </InputLabel>
                      <Select
                        labelId="Empleado-select-label"
                        id="Empleado-select"
                        multiple
                        label="Empleado"
                        value={employee}
                        onChange={handleSurveyEmployeeChange}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MENUPROPS}
                      >
                        {employeeData.map((employeeVal) => (
                          <MenuItem
                            key={`${employeeVal.name} ${employeeVal.lastName} #${employeeVal.id}`}
                            value={`${employeeVal.name} ${employeeVal.lastName} #${employeeVal.id}`}
                          >
                            <Checkbox
                              checked={
                                employee.indexOf(
                                  `${employeeVal.name} ${employeeVal.lastName} #${employeeVal.id}`
                                ) > -1
                              }
                            />
                            <ListItemText
                              primary={`${employeeVal.name} ${employeeVal.lastName} #${employeeVal.id}`}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 3 }}>
                      <DatePicker
                        label="Fecha"
                        value={date || null}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={(newDate) => {
                          if (newDate) {
                            handleSurveyDateChange(
                              new Date(newDate).toLocaleString().split(",")[0]
                            );
                          } else {
                            handleSurveyDateChange("");
                          }
                        }}
                      />
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 3 }}>
                      <InputLabel id="empresa-select-label">Empresa</InputLabel>
                      <Select
                        labelId="empresa-select-label"
                        id="empresa-select"
                        multiple
                        label="Empresa"
                        value={company}
                        onChange={handleSurveyCompanyChange}
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
                                company.indexOf(
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
                    <FormControl fullWidth sx={{ mt: 3 }}>
                      <InputLabel id="service-select-label">
                        Servicio
                      </InputLabel>
                      <Select
                        labelId="service-select-label"
                        id="service-select"
                        multiple
                        label="Servicio"
                        value={service}
                        onChange={handleSurveyServiceChange}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MENUPROPS}
                      >
                        {getUniqueServices(companyData).map((serviceVal) => (
                          <MenuItem key={serviceVal} value={serviceVal}>
                            <Checkbox
                              checked={service.indexOf(serviceVal) > -1}
                            />
                            <ListItemText primary={serviceVal} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 3 }}>
                      <InputLabel id="branch-select-label">Sucursal</InputLabel>
                      <Select
                        labelId="branch-select-label"
                        id="branch-select"
                        multiple
                        label="Sucursal"
                        value={branch}
                        onChange={handleSurveyBranchChange}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MENUPROPS}
                      >
                        {branchData.map((branchVal) => (
                          <MenuItem
                            key={`${branchVal.name} #${branchVal.id}`}
                            value={`${branchVal.name} #${branchVal.id}`}
                          >
                            <Checkbox
                              checked={
                                branch.indexOf(
                                  `${branchVal.name} #${branchVal.id}`
                                ) > -1
                              }
                            />
                            <ListItemText
                              primary={`${branchVal.name} #${branchVal.id}`}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 3 }}>
                      <InputLabel id="score-select-label">Score</InputLabel>
                      <Select
                        labelId="score-select-label"
                        id="score-select"
                        MenuProps={MENUPROPS}
                        value={score}
                        multiple
                        label="Score"
                        onChange={handleSurveyScoreChange}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        [
                        <MenuItem key={1} value={1}>
                          <Checkbox checked={score.indexOf(1) > -1} />
                          <ListItemText primary={1} />
                        </MenuItem>
                        ,
                        <MenuItem key={2} value={2}>
                          <Checkbox checked={score.indexOf(2) > -1} />
                          <ListItemText primary={2} />
                        </MenuItem>
                        ,
                        <MenuItem key={3} value={3}>
                          <Checkbox checked={score.indexOf(3) > -1} />
                          <ListItemText primary={3} />
                        </MenuItem>
                        ,
                        <MenuItem key={4} value={4}>
                          <Checkbox checked={score.indexOf(4) > -1} />
                          <ListItemText primary={4} />
                        </MenuItem>
                        ,
                        <MenuItem key={5} value={5}>
                          <Checkbox checked={score.indexOf(5) > -1} />
                          <ListItemText primary={5} />
                        </MenuItem>
                        ]
                      </Select>
                    </FormControl>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSurveyListFilter} color="primary">
                  Filtrar
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Paper>
      </CardContent>
    </Card>
  );
}

const EnhancedSurveyTableToolbar = (props) => {
  const { numSelected, surveyListFilter, setActivePage } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Toolbar>
      <ToolbarTitle>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle"></Typography>
        )}
      </ToolbarTitle>
      <Spacer />
      <div>
        {numSelected > 0 ? (
          <Tooltip title="Descargar">
            <IconButton aria-label="Delete" size="large">
              <ArchiveIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <>
            <Tooltip title="Filtrar">
              <IconButton
                aria-label="Filter list"
                size="large"
                onClick={handleClickOpen}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            {open && (
              <FilterSurveyDialog
                open={open}
                onClose={handleClose}
                surveyListFilter={surveyListFilter}
                setActivePage={setActivePage}
              />
            )}
          </>
        )}
      </div>
    </Toolbar>
  );
};

function EnhancedSurveyTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { score, date, company, employee, service, branch, surveyData } =
    useSelector((state) => state.happyqAdminSurvey);
  const { employeeData } = useSelector((state) => state.happyqAdminEmployee);
  const { companyData } = useSelector((state) => state.happyqAdminCompany);
  const { branchData } = useSelector((state) => state.happyqAdminBranch);
  const [rows, setRows] = React.useState(surveyData);
  React.useEffect(() => {
    const employeeList = filterSurveyList({
      score,
      date,
      company,
      employee,
      service,
      branch,
      surveyData,
    });
    setRows(employeeList);
    setPage(0);
    setOrderBy("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyData]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const showEmployeeName = (employee) => {
    return `${employee.name} ${employee.lastName} #${employee.id}`;
  };
  const showCompanyName = (company) => {
    return `${company.name} #${company.id}`;
  };
  const showBranchName = (branch) => {
    return `${branch.name} #${branch.id}`;
  };

  return (
    <div>
      <Paper>
        <EnhancedSurveyTableToolbar
          numSelected={selected.length}
          surveyListFilter={setRows}
          setActivePage={setPage}
        />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedSurveyTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.id}-${index}`}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>
                      <TableCell>#{row.ticketId}</TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        <Customer>
                          {row.score === 1 ? (
                            <>
                              <SentimentVeryDissatisfied
                                style={{ color: red[500] }}
                                fontSize="large"
                              />{" "}
                              <Box ml={3}>Muy Insatisfecho</Box>
                            </>
                          ) : row.score === 2 ? (
                            <>
                              <SentimentDissatisfied
                                style={{ color: orange[500] }}
                                fontSize="large"
                              />{" "}
                              <Box ml={3}>Insatisfecho</Box>{" "}
                            </>
                          ) : row.score === 3 ? (
                            <>
                              {" "}
                              <SentimentSatisfied
                                style={{ color: yellow[500] }}
                                fontSize="large"
                              />
                              <Box ml={3}>Neutral</Box>
                            </>
                          ) : row.score === 4 ? (
                            <>
                              {" "}
                              <SentimentSatisfiedAlt
                                style={{ color: green[300] }}
                                fontSize="large"
                              />
                              <Box ml={3}>Satisfecho</Box>
                            </>
                          ) : (
                            <>
                              <SentimentVerySatisfied
                                style={{ color: green[500] }}
                                fontSize="large"
                              />
                              <Box ml={3}>Muy Satisfecho</Box>
                            </>
                          )}
                        </Customer>
                      </TableCell>

                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell>
                        {showCompanyName(
                          companyData.find(
                            (company) => company.id === row.companyId
                          )
                        )}
                      </TableCell>
                      <TableCell>
                        {showBranchName(
                          branchData.find(
                            (branch) => branch.id === row.branchId
                          )
                        )}
                      </TableCell>
                      <TableCell>
                        {showEmployeeName(
                          employeeData.find(
                            (employee) => employee.id === row.employeeId
                          )
                        )}
                      </TableCell>
                      <TableCell>{row.service}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Registros por página"}
        />
      </Paper>
    </div>
  );
}

function DialogSelectEncuestasEjemplo(props) {
  const { open, onClose } = props;

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Paper mt={3}>
          <div>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              <DialogTitle>Ejemplo Encuesta</DialogTitle>
              <DialogContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mt: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      p: 4,
                    }}
                  >
                    <Box sx={{ alignSelf: "center" }}>
                      <SentimentVeryDissatisfied
                        style={{ color: red[500] }}
                        fontSize="large"
                      />
                    </Box>
                    <Box sx={{ alignSelf: "center" }}>
                      <Typography fontWeight="fontWeightMedium">
                        Muy Insatisfecho
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      p: 4,
                    }}
                  >
                    <Box sx={{ alignSelf: "center" }}>
                      <SentimentDissatisfied
                        style={{ color: orange[500] }}
                        fontSize="large"
                      />
                    </Box>
                    <Box sx={{ alignSelf: "center" }}>
                      <Typography fontWeight="fontWeightMedium">
                        Insatisfecho
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      p: 4,
                    }}
                  >
                    <Box sx={{ alignSelf: "center" }}>
                      <SentimentSatisfied
                        style={{ color: yellow[500] }}
                        fontSize="large"
                      />
                    </Box>
                    <Box sx={{ alignSelf: "center" }}>
                      <Typography fontWeight="fontWeightMedium">
                        Neutral
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      p: 4,
                    }}
                  >
                    <Box sx={{ alignSelf: "center" }}>
                      <SentimentSatisfiedAlt
                        style={{ color: green[300] }}
                        fontSize="large"
                      />
                    </Box>
                    <Box sx={{ alignSelf: "center" }}>
                      <Typography fontWeight="fontWeightMedium">
                        Satisfecho
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      p: 4,
                    }}
                  >
                    <Box sx={{ alignSelf: "center" }}>
                      <SentimentVerySatisfied
                        style={{ color: green[500] }}
                        fontSize="large"
                      />
                    </Box>
                    <Box sx={{ alignSelf: "center" }}>
                      <Typography fontWeight="fontWeightMedium">
                        Muy Satisfecho
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Paper>
      </CardContent>
    </Card>
  );
}

function Survey() {
  const { showModal } = useSelector((state) => state.happyqAdminSurvey);
  const dispatch = useDispatch();

  const handleEmployeeModal = () => {
    dispatch(setShowModal(!showModal));
  };

  return (
    <React.Fragment>
      <Helmet title="Empleados" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Empleados
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/smartkiu/admin/dashboard">
              Dashboard
            </Link>
            <Typography>Empleados</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEmployeeModal}
          >
            <AddIcon />
            Ver ejemplo Encuesta
          </Button>
          {showModal && (
            <DialogSelectEncuestasEjemplo
              open={showModal}
              onClose={handleEmployeeModal}
            />
          )}
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedSurveyTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Survey;
