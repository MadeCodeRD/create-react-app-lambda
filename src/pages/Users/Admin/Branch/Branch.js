import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import {
  filterBranchName,
  filterBranchStatus,
  filterBranchDate,
  filterBranchAddress,
  filterBranchCompany,
  setShowModal,
  setCurrentBranch,
  editBranch,
} from "../../../../redux/slices/HappyQ_Admin/Admin_Branch";
import BranchForm from "./BranchForm";
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
  { id: "name", alignment: "left", label: "Detalle Empleado" },
  { id: "status", alignment: "left", label: "Estado" },
  { id: "id", alignment: "right", label: "Surcursal ID" },
  { id: "date", alignment: "left", label: "Fecha Inicio" },
  { id: "actions", alignment: "right", label: "Acciones" },
];

const filterBranchList = ({
  branchData,
  branch,
  status,
  date,
  address,
  company,
}) => {
  let branchList = branchData;

  if (branch.length !== 0) {
    branchList = branchList.filter((branchVal) =>
      branch
        .map((name) => name.slice(name.lastIndexOf("#") + 1))
        .includes(branchVal.id)
    );
  }

  if (status.length !== 0) {
    branchList = branchList.filter((branchVal) =>
      status.includes(branchVal.status)
    );
  }

  if (date !== "") {
    branchList = branchList.filter((branchVal) => branchVal.date === date);
  }

  if (address !== "") {
    branchList = branchList.filter(
      (branchVal) =>
        branchVal.address.street
          .toLowerCase()
          .includes(address.toLowerCase()) ||
        branchVal.address.neighborhood
          .toLowerCase()
          .includes(address.toLowerCase())
    );
  }

  if (company.length !== 0) {
    branchList = branchList.filter((branchVal) =>
      company
        .map((companyVal) => companyVal.slice(companyVal.lastIndexOf("#") + 1))
        .includes(branchVal.companyId)
    );
  }

  return branchList;
};

const EnhancedBranchTableHead = (props) => {
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

function FilterBranchDialog(props) {
  const { open, onClose, branchListFilter, setActivePage } = props;
  const { branchData, branch, status, date, address, company } = useSelector(
    (state) => state.happyqAdminBranch
  );
  const { companyData } = useSelector((state) => state.happyqAdminCompany);
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose(true);
  };

  const handleBranchNameChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(
      filterBranchName(typeof value === "string" ? value.split(",") : value)
    );
  };

  const handleBranchStatusChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(
      filterBranchStatus(typeof value === "string" ? value.split(",") : value)
    );
  };

  const handleBranchDateChange = (newDate) => {
    dispatch(filterBranchDate(newDate));
  };

  const handleBranchAddressChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    dispatch(filterBranchAddress(value));
  };

  const handleBranchCompanyNameChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(
      filterBranchCompany(typeof value === "string" ? value.split(",") : value)
    );
  };

  const handleBranchListFilter = () => {
    const branchList = filterBranchList({
      branchData,
      branch,
      status,
      date,
      address,
      company,
    });

    branchListFilter(branchList);
    setActivePage(0);
    handleClose();
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Paper mt={3}>
          <div>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              <DialogTitle>Filtrar Sucursales</DialogTitle>
              <DialogContent>
                <form>
                  <Grid container spacing={2} mt={4}>
                    <FormControl fullWidth sx={{ width: "56.25rem" }}>
                      <InputLabel id="branch-select-label">Sucursal</InputLabel>
                      <Select
                        labelId="branch-select-label"
                        id="branch-select"
                        multiple
                        label="Sucursal"
                        value={branch}
                        onChange={handleBranchNameChange}
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
                      <DatePicker
                        label="Fecha"
                        value={date || null}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={(newDate) => {
                          if (newDate) {
                            handleBranchDateChange(
                              new Date(newDate).toLocaleString().split(",")[0]
                            );
                          } else {
                            handleBranchDateChange("");
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
                        onChange={handleBranchStatusChange}
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
                    <FormControl fullWidth sx={{ mt: 3 }}>
                      <TextField
                        labelid="address-select-label"
                        id="address-select"
                        name="address"
                        label="Dirección"
                        value={address}
                        fullWidth
                        onChange={handleBranchAddressChange}
                        type="text"
                        variant="outlined"
                        my={2}
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
                        onChange={handleBranchCompanyNameChange}
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
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleBranchListFilter} color="primary">
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

const EnhancedBranchTableToolbar = (props) => {
  const { numSelected, branchListFilter, setActivePage } = props;
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
              <FilterBranchDialog
                open={open}
                onClose={handleClose}
                branchListFilter={branchListFilter}
                setActivePage={setActivePage}
              />
            )}
          </>
        )}
      </div>
    </Toolbar>
  );
};

function EnhancedBranchTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const { branchData, branch, status, date, address, company, showModal } =
    useSelector((state) => state.happyqAdminBranch);
  const [rows, setRows] = React.useState(branchData);
  React.useEffect(() => {
    const BranchList = filterBranchList({
      branchData,
      branch,
      status,
      date,
      address,
      company,
    });
    setRows(BranchList);
    setPage(0);
    setOrderBy("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchData]);

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

  const handleBranchState = (id) => {
    const branch = branchData.find((branch) => id === branch.id);
    const filterBranches = branchData.filter((branch) => id !== branch.id);
    const branchToUpdate = {
      ...branch,
      status: branch.status === STATUS.ACTIVE ? STATUS.INACTIVE : STATUS.ACTIVE,
    };
    dispatch(editBranch([branchToUpdate, ...filterBranches]));

    setOrderBy("");
  };

  return (
    <div>
      <Paper>
        <EnhancedBranchTableToolbar
          numSelected={selected.length}
          branchListFilter={setRows}
          setActivePage={setPage}
        />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedBranchTableHead
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
                            {row.company} {`Sucursal`} {row.name}
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
                              setCurrentBranch(
                                branchData.find(
                                  (branch) => branch.id === row.id
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
                          onClick={() => handleBranchState(row.id)}
                        >
                          {row.status === STATUS.ACTIVE ? <Eye /> : <EyeOff />}
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
      </Paper>
    </div>
  );
}

function DialogBranchForm(props) {
  const { open, onClose } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose(true);
    dispatch(setCurrentBranch({}));
  };
  return (
    <Card mb={6}>
      <CardContent>
        <Paper mt={3}>
          <div>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              <DialogTitle></DialogTitle>
              <DialogContent>
                <BranchForm />
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

function Branch() {
  const { showModal } = useSelector((state) => state.happyqAdminBranch);
  const dispatch = useDispatch();

  const handleBranchModal = () => {
    dispatch(setShowModal(!showModal));
  };

  return (
    <React.Fragment>
      <Helmet title="Sucursales" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Sucursales
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/smartkiu/admin/dashboard">
              Dashboard
            </Link>
            <Typography>Sucursales</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid item>
        <div>
          {showModal && (
            <DialogBranchForm open={showModal} onClose={handleBranchModal} />
          )}
        </div>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedBranchTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Branch;
