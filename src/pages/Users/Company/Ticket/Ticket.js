import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import {
  filterCompanyBranch,
  filterTicketState,
  filterTicketDate,
  filterTicketPriority,
} from "../../../../redux/slices/HappyQ_Company/Company_Tickets.js";
import {
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
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Card as MuiCard,
  Select,
  TextField,
  ListItemText,
} from "@mui/material";
import { green, orange, red } from "@mui/material/colors";
import {
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { spacing } from "@mui/system";
import { DatePicker } from "@mui/lab";
import { MENUPROPS } from "../../../../constants";

const Divider = styled(MuiDivider)(spacing);
const Card = styled(MuiCard)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${(props) => props.shipped && green[500]};
  background: ${(props) => props.processing && orange[700]};
  background: ${(props) => props.cancelled && red[500]};
  color: ${(props) => props.theme.palette.common.white};
`;

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
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
  { id: "id", alignment: "right", label: "Ticket ID" },
  { id: "name", alignment: "left", label: "Empresa ID" },
  { id: "date", alignment: "left", label: "Date" },
  { id: "priority", alignment: "right", label: "Prioridad" },
  { id: "state", alignment: "left", label: "Estado" },
  { id: "branch", alignment: "left", label: "Sucursal ID" },
];

const EnhancedTicketTableHead = (props) => {
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

function FilterTicketDialog(props) {
  const { open, onClose, ticketListFilter } = props;
  const { company, state, date, priority, ticketData } = useSelector(
    (state) => state.happyqCompanyTicket
  );

  const { branchData } = useSelector((state) => state.happyqCompanyBranch);
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose(true);
  };

  const handleCompanyBranchChange = (event) => {
    const {
      target: { value },
    } = event;

    dispatch(
      filterCompanyBranch(typeof value === "string" ? value.split(",") : value)
    );
  };

  const handleTicketStateChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(
      filterTicketState(typeof value === "string" ? value.split(",") : value)
    );
  };

  const handleTicketDateChange = (newDate) => {
    dispatch(filterTicketDate(newDate));
  };

  const handleTicketPriorityChange = (event) => {
    const {
      target: { value },
    } = event;

    dispatch(
      filterTicketPriority(typeof value === "string" ? value.split(",") : value)
    );
  };

  const handleTicketListFilter = () => {
    let ticketList = ticketData;

    if (company.branch.length !== 0) {
      ticketList = ticketList.filter((ticket) =>
        company.branch
          .map((branch) => branch.slice(branch.lastIndexOf("#") + 1))
          .includes(ticket.branchId)
      );
    }

    if (date !== "") {
      ticketList = ticketList.filter((ticket) => ticket.date === date);
    }

    if (state.length !== 0) {
      ticketList = ticketList.filter((ticket) => state.includes(ticket.state));
    }

    if (priority.length !== 0) {
      ticketList = ticketList.filter((ticket) =>
        priority.includes(ticket.priority)
      );
    }

    ticketListFilter(ticketList);
    handleClose();
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Paper mt={3}>
          <div>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              <DialogTitle>Filtrar Tickets</DialogTitle>
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
                        value={company.branch}
                        onChange={handleCompanyBranchChange}
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
                                company.branch.indexOf(
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
                      <InputLabel id="state-select-label">Estado</InputLabel>
                      <Select
                        labelId="state-select-label"
                        id="state-select"
                        MenuProps={MENUPROPS}
                        value={state}
                        multiple
                        label="Estado"
                        onChange={handleTicketStateChange}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        [
                        <MenuItem key={"Completado"} value={"Completado"}>
                          <Checkbox
                            checked={state.indexOf("Completado") > -1}
                          />
                          <ListItemText primary={"Completado"} />
                        </MenuItem>
                        ,{" "}
                        <MenuItem key={"Cancelado"} value={"Cancelado"}>
                          <Checkbox checked={state.indexOf("Cancelado") > -1} />
                          <ListItemText primary={"Cancelado"} />
                        </MenuItem>
                        ,
                        <MenuItem key={"Pendiente"} value={"Pendiente"}>
                          <Checkbox checked={state.indexOf("Pendiente") > -1} />
                          <ListItemText primary={"Pendiente"} />
                        </MenuItem>
                        ]
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
                      <InputLabel id="priority-select-label">
                        Prioridad
                      </InputLabel>
                      <Select
                        labelId="priority-select-label"
                        id="priority-select"
                        MenuProps={MENUPROPS}
                        value={priority}
                        multiple
                        label="Prioridad"
                        onChange={handleTicketPriorityChange}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        [
                        <MenuItem key={"Normal"} value={"Normal"}>
                          <Checkbox checked={priority.indexOf("Normal") > -1} />
                          <ListItemText primary={"Normal"} />
                        </MenuItem>
                        ,{" "}
                        <MenuItem key={"VIP"} value={"VIP"}>
                          <Checkbox checked={priority.indexOf("VIP") > -1} />
                          <ListItemText primary={"VIP"} />
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

const EnhancedTicketTableToolbar = (props) => {
  // Here was 'let'
  const { numSelected, ticketListFilter } = props;
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
              <FilterTicketDialog
                open={open}
                onClose={handleClose}
                ticketListFilter={ticketListFilter}
              />
            )}
          </>
        )}
      </div>
    </Toolbar>
  );
};

function TicketTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("company");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { ticketData } = useSelector((state) => state.happyqCompanyTicket);
  const { companyProfile } = useSelector((state) => state.happyqCompanyProfile);
  const { branchData } = useSelector((state) => state.happyqCompanyBranch);

  const [rows, setRows] = React.useState(ticketData);

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

  const showBranchName = (branch) => {
    return `${branch.name} #${branch.id}`;
  };

  return (
    <div>
      <Paper>
        <EnhancedTicketTableToolbar
          numSelected={selected.length}
          ticketListFilter={setRows}
        />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTicketTableHead
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

                      <TableCell align="right">#{row.id}</TableCell>
                      <TableCell align="left">{`${companyProfile.name} #${companyProfile.id}`}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="right">
                        {" "}
                        {row.priority === "Normal" && (
                          <Chip
                            size="small"
                            mr={1}
                            mb={1}
                            label="Normal"
                            shipped={+true}
                          />
                        )}
                        {row.priority === "VIP" && (
                          <Chip
                            size="small"
                            mr={1}
                            mb={1}
                            label="VIP"
                            processing={+true}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {row.state === "Completado" && (
                          <Chip
                            size="small"
                            mr={1}
                            mb={1}
                            label="Completado"
                            shipped={+true}
                          />
                        )}
                        {row.state === "Cancelado" && (
                          <Chip
                            size="small"
                            mr={1}
                            mb={1}
                            label="Cancelado"
                            cancelled={+true}
                          />
                        )}{" "}
                        {row.state === "Pendiente" && (
                          <Chip
                            size="small"
                            mr={1}
                            mb={1}
                            label="Pendiente"
                            processing={+true}
                          />
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {showBranchName(
                          branchData.find(
                            (branch) => branch.id === row.branchId
                          )
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
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

function ShowTicketTable() {
  return (
    <React.Fragment>
      <Helmet title="Tickets" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Tickets
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Tickets</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TicketTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ShowTicketTable;
