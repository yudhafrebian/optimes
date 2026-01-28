"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { LinearProgress } from "@mui/material";
import { IUser } from "@/interface/user.interface";
import { useEffect, useMemo, useState } from "react";
import { apiClient } from "@/utils/apiHelper";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import GenericModal from "../../modal/GenericModal";
import TableRowSkeleton from "../../skeleton/TableRowSkeleton";
import GenericDialog from "../../dialog/GenericDialog";
import { useSnackbar } from "@/hooks/useSnackbar";
import UserTableRow from "./UserTableRow";
import TableActionMenu from "./TableActionMenu";
import EditForm from "@/form/EditForm";
import { UserRowData } from "./types";
import dayjs, { Dayjs } from "dayjs";

function createData(
  id: string,
  username: string,
  role:
    | "administrator"
    | "operator"
    | "ppic"
    | "maintenance_administrator"
    | "maintenance",
  status: string,
  password_status: "normal" | "temporary" | "expired",
  last_login: string,
  created_date: string,
  full_name: string,
): UserRowData {
  return {
    id,
    username,
    status,
    role,
    password_status,
    last_login,
    created_date,
    full_name,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function AccountTableManagement() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof UserRowData>("created_date");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [dense, setDense] = React.useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [rows, setRows] = useState<UserRowData[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<UserRowData | null>(null);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [editData, setEditData] = useState<UserRowData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const showSnackbar = useSnackbar();

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: UserRowData,
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch = row.username
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "All" || row.role === roleFilter;
      const matchesStatus = statusFilter === "All" || row.status === statusFilter;

      const rowDate = dayjs(row.created_date);

      const isAfterStart = startDate 
        ? rowDate.isAfter(startDate.startOf('day')) || rowDate.isSame(startDate.startOf('day')) 
        : true;

      const isBeforeEnd = endDate 
        ? rowDate.isBefore(endDate.endOf('day')) || rowDate.isSame(endDate.endOf('day')) 
        : true;

      return matchesSearch && matchesRole && matchesStatus && isAfterStart && isBeforeEnd;
    });
  }, [rows, searchQuery, roleFilter, statusFilter, startDate, endDate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/user/all");
      const users: IUser[] = res.data;
      console.log("Fetched users:", users);
      const tableRows = users.map((user) =>
        createData(
          user.id.toString(),
          user.username,
          user.role,
          user.status,
          user.password_status,
          user.last_login,
          user.created_date,
          user.full_name,
        ),
      );
      setRows(tableRows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisableUser = async (id: string) => {
    try {
      setLoading(true);
      await apiClient.patch(`/user/disable/`, { id });
      showSnackbar("User status updated successfully", "success");
      setOpenDeleteDialog(false);
      fetchUsers();
    } catch (error) {
      showSnackbar("Failed to update user status", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof UserRowData,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((n: UserRowData) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((item) => item !== id);
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredRows, order, orderBy, page, rowsPerPage],
  );

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, boxShadow: 3, overflow: "hidden" }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onRefresh={fetchUsers}
            roleFilter={roleFilter}
            statusFilter={statusFilter}
            startDate={startDate}
            onSearch={(val) => setSearchQuery(val)}
            onFilterRole={(role) => {
              setRoleFilter(role), setPage(0);
            }}
            onFilterStatus={(status) => {
              setStatusFilter(status), setPage(0);
            }}
            endDate={endDate}
            onFilterDate={(start, end) => {
              setStartDate(start);
              setEndDate(end);
              setPage(0);
            }}
          />
          <Box sx={{ height: 4 }}>{loading && <LinearProgress />}</Box>
          <TableContainer sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            <Table
              sx={{ minWidth: 1100, tableLayout: "auto" }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
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
                {loading ? (
                  <TableRowSkeleton rows={rowsPerPage} />
                ) : (
                  visibleRows.map((row, index) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      isSelected={selected.includes(row.id)}
                      labelId={`enhanced-table-checkbox-${index}`}
                      onSelect={handleClick}
                      onOpenMenu={handleOpenMenu}
                    />
                  ))
                )}

                {!loading && emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
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
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>

      <TableActionMenu
        anchorEl={anchorEl}
        activeRow={activeRow}
        onClose={handleCloseMenu}
        onEdit={(row) => {
          setEditData(row);
          setOpenEditModal(true);
        }}
        onDisable={(row) => {
          setOpenDeleteDialog(true);
        }}
      />

      <GenericDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        title="Disable Account"
        content="Are you sure you want to disable this account?"
        negativeText="Cancel"
        positiveText="Disable"
        onConfirm={() => activeRow && handleDisableUser(activeRow.id)}
        onRefresh={fetchUsers}
      />

      {editData && (
        <GenericModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          title="Edit Role"
        >
          <EditForm
            data={editData}
            onCancel={handleCloseMenu}
            onSuccess={() => {
              setOpenEditModal(false);
              fetchUsers();
            }}
          />
        </GenericModal>
      )}
    </>
  );
}
