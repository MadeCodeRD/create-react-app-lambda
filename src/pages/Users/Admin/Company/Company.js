import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import customFetch from "../../../../utils/customFetch";
import { CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import {
  filterCompanyName,
  filterCompanyStatus,
  filterCompanyDate,
  setShowModal,
  setCurrentCompany,
  addCompany,
} from "../../../../redux/slices/HappyQ_Admin/Admin_Company";
import CreateCompanyForm from "./CompanyForm";
import {
  Avatar as MuiAvatar,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Checkbox,
  Chip as MuiChip,
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
  Edit,
} from "@mui/icons-material";
import { Eye, EyeOff } from "react-feather";
import { spacing } from "@mui/system";
import { DatePicker } from "@mui/lab";
import { MENUPROPS, STATUS } from "../../../../constants";

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${(props) => props.paid && green[500]};
  background: ${(props) => props.sent && orange[700]};
  color: ${(props) =>
    (props.paid || props.sent) && props.theme.palette.common.white};
`;

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

const Avatar = styled(MuiAvatar)`
  background: ${(props) => props.theme.palette.primary.main};
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
  { id: "name", alignment: "left", label: "Detalle Empresa" },
  { id: "status", alignment: "left", label: "Estado" },
  { id: "id", alignment: "right", label: "Empresa ID" },
  { id: "date", alignment: "left", label: "Fecha Inicio" },
  { id: "actions", alignment: "right", label: "Acciones" },
];

const filterCompanyList = ({ companyData, company, date, status }) => {
  let companyList = companyData;

  if (company.name.length !== 0) {
    companyList = companyList.filter((companyVal) =>
      company.name
        .map((name) => name.slice(name.lastIndexOf("#") + 1))
        .includes(companyVal.id)
    );
  }

  if (date !== "") {
    companyList = companyList.filter((companyVal) => companyVal.date === date);
  }

  if (status.length !== 0) {
    companyList = companyList.filter((companyVal) =>
      status.includes(companyVal.status)
    );
  }

  return companyList;
};

const EnhancedTableHead = (props) => {
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

function FilterCompanyDialog(props) {
  const { open, onClose, companyListFilter, setActivePage } = props;
  const { company, status, date, companyData } = useSelector(
    (state) => state.happyqAdminCompany
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose(true);
  };

  const handleCompanyNameChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(
      filterCompanyName(typeof value === "string" ? value.split(",") : value)
    );
  };

  const handleCompanyStateChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(
      filterCompanyStatus(typeof value === "string" ? value.split(",") : value)
    );
  };

  const handleTicketDateChange = (newDate) => {
    dispatch(filterCompanyDate(newDate));
  };

  const handleTicketListFilter = () => {
    const companyList = filterCompanyList({
      companyData,
      company,
      date,
      status,
    });

    companyListFilter(companyList);
    setActivePage(0);
    handleClose();
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Paper mt={3}>
          <div>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              <DialogTitle>Filtrar Empresas</DialogTitle>
              <DialogContent>
                <form>
                  <Grid container spacing={2} mt={4}>
                    <FormControl fullWidth sx={{ width: "56.25rem" }}>
                      <InputLabel id="empresa-select-label">Empresa</InputLabel>
                      <Select
                        labelId="empresa-select-label"
                        id="empresa-select"
                        multiple
                        label="Empresa"
                        value={company.name}
                        onChange={handleCompanyNameChange}
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
                                company.name.indexOf(
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
                      <DatePicker
                        label="Fecha"
                        value={date || null}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={(newDate) => {
                          if (newDate) {
                            handleTicketDateChange(
                              new Date(newDate).toLocaleString().split(",")[0]
                            );
                          } else {
                            handleTicketDateChange("");
                          }
                        }}
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 3 }}>
                      <InputLabel id="status-select-label">Estado</InputLabel>
                      <Select
                        labelId="status-select-label"
                        id="status-select"
                        MenuProps={MENUPROPS}
                        value={status}
                        multiple
                        label="Estado"
                        onChange={handleCompanyStateChange}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        [
                        <MenuItem key={STATUS.ACTIVE} value={STATUS.ACTIVE}>
                          <Checkbox
                            checked={status.indexOf(STATUS.ACTIVE) > -1}
                          />
                          <ListItemText primary={STATUS.ACTIVE} />
                        </MenuItem>
                        ,{" "}
                        <MenuItem key={STATUS.INACTIVE} value={STATUS.INACTIVE}>
                          <Checkbox
                            checked={status.indexOf(STATUS.INACTIVE) > -1}
                          />
                          <ListItemText primary={STATUS.INACTIVE} />
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
                <Button onClick={handleTicketListFilter} color="primary">
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

const EnhancedCompanyTableToolbar = (props) => {
  const { numSelected, companyListFilter, setActivePage } = props;
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
              <FilterCompanyDialog
                open={open}
                onClose={handleClose}
                companyListFilter={companyListFilter}
                setActivePage={setActivePage}
              />
            )}
          </>
        )}
      </div>
    </Toolbar>
  );
};

function EnhancedCompanyTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const { companyData, showModal, company, status, date } = useSelector(
    (state) => state.happyqAdminCompany
  );
  const [rows, setRows] = React.useState(companyData);
  const [loading, setLoading] = React.useState(true);

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

  React.useEffect(() => {
    const companyList = filterCompanyList({
      companyData,
      company,
      date,
      status,
    });
    setRows(companyList);
    setPage(0);
    setOrderBy("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyData]);

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

  const handleCompanyState = (id) => {
    const company = companyData.find((company) => id === company.id);
    const filterCompanies = companyData.filter((company) => id !== company.id);
    const companyToUpdate = {
      ...company,
      status:
        company.status === STATUS.ACTIVE ? STATUS.INACTIVE : STATUS.ACTIVE,
    };
    dispatch(addCompany([companyToUpdate, ...filterCompanies]));

    setOrderBy("");
  };

  return (
    <div>
      <Paper>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <>
            <EnhancedCompanyTableToolbar
              numSelected={selected.length}
              companyListFilter={setRows}
              setActivePage={setPage}
            />
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                size={"medium"}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
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
                          <TableCell component="th" id={labelId} scope="row">
                            <Customer>
                              <Avatar alt={row.name} src={row.photoUrl} />
                              <Box ml={3}>
                                {row.name}
                                <br />
                                {row.email}
                              </Box>
                            </Customer>
                          </TableCell>
                          <TableCell>
                            {row.status === STATUS.ACTIVE && (
                              <Chip
                                size="small"
                                mr={1}
                                mb={1}
                                label={STATUS.ACTIVE}
                                paid={+true}
                              />
                            )}
                            {row.status === STATUS.INACTIVE && (
                              <Chip
                                size="small"
                                mr={1}
                                mb={1}
                                label={STATUS.INACTIVE}
                              />
                            )}
                          </TableCell>
                          <TableCell align="right">#{row.id}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              aria-label="editCompany"
                              size="large"
                              onClick={() => {
                                dispatch(setShowModal(!showModal));
                                dispatch(
                                  setCurrentCompany(
                                    companyData.find(
                                      (company) => company.id === row.id
                                    )
                                  )
                                );
                              }}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              aria-label="companyStatus"
                              size="large"
                              onClick={() => handleCompanyState(row.id)}
                            >
                              {row.status === STATUS.ACTIVE ? (
                                <Eye />
                              ) : (
                                <EyeOff />
                              )}
                            </IconButton>
                          </TableCell>
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
          </>
        )}
      </Paper>
    </div>
  );
}

function DialogSelectCompanyForm(props) {
  const { open, onClose } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose(true);
    dispatch(setCurrentCompany({}));
  };
  return (
    <Card mb={6}>
      <CardContent>
        <Paper mt={3}>
          <div>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              <DialogTitle></DialogTitle>
              <DialogContent>
                <CreateCompanyForm />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Paper>
      </CardContent>
    </Card>
  );
}

function Company() {
  const { showModal } = useSelector((state) => state.happyqAdminCompany);
  const dispatch = useDispatch();

  const handleCreateCompanyModel = () => {
    dispatch(setShowModal(!showModal));
  };

  return (
    <React.Fragment>
      <Helmet title="Empresas" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Empresas
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/smartkiu/admin/dashboard">
              Dashboard
            </Link>
            <Typography>Empresas</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateCompanyModel}
            >
              <AddIcon />
              Nueva Empresa
            </Button>
            {showModal && (
              <DialogSelectCompanyForm
                open={showModal}
                onClose={handleCreateCompanyModel}
              />
            )}
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedCompanyTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Company;
