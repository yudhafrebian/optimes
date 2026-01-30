"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Divider, LinearProgress, Typography } from "@mui/material";
import { IUser } from "@/interface/user.interface";
import { useMemo, useState } from "react";
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
import dayjs, { Dayjs } from "dayjs";
import GenericChips from "@/components/core/GenericChips";
import ResetPasswordAdminForm from "@/form/ResetPasswordAdminForm";
import WarningIcon from "@mui/icons-material/Warning";
import SuccessResetPasswordView from "@/components/view/SuccessResetPasswordView";
import useSwr from "swr";
import DisableForm from "@/form/DisableForm";
import { UserRowData } from "@/interface/row-table.interface";
import { accountsApi } from "@/lib/api";
import { AccountResponseDto } from "@/api-client";

const fetcher = () =>
  accountsApi.accountControllerGetAll().then((res) => {
    return res.data;
  });

function createData(user: AccountResponseDto): UserRowData {
  console.log(user);
  return {
    id: user.id,
    username: user.username,
    full_name: user.full_name,
    lifecycle: user.account_lifecycle.label,
    role: user.account_role?.label || "-",
    account_expiry_date: user.account_expiry_date || "-",
    account_type: user.account_type.label,
    password_last_changed: user.password_last_changed || "-",
    password_expiry_time: user.password_expiry_time || "-",
    must_change_password: user.must_change_password,
    last_login: user.last_login_time || "-",
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
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function AccountTableManagement() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof UserRowData>("full_name");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [dense, setDense] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<UserRowData | null>(null);
  const [modalType, setModalType] = useState<
    | "edit"
    | "suspend"
    | "delete"
    | "disable"
    | "reset"
    | "reactivate"
    | "bulk-delete"
    | null
  >(null);
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [lifecycleFilter, setLifecycleFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [resetResult, setResetResult] = useState<any>(null);

  const {
    data: users,
    mutate,
    isLoading,
    error,
  } = useSwr<AccountResponseDto[]>("api/accounts", fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
    onError: (err) => {
      console.log(err);
    },
  });

  const rows = useMemo(() => {
    // Cek apakah users ada DAN merupakan sebuah Array
    if (!users || !Array.isArray(users)) {
      return [];
    }
    return users.map((user) => createData(user));
  }, [users]);

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
  };

  const closeAll = () => {
    setModalType(null);
    setActiveRow(null);
    setStep("form");
    setResetResult(null);
  };

  const handleAction = (
    type: "edit" | "suspend" | "delete" | "disable" | "reset" | "reactivate",
    row: UserRowData,
  ) => {
    setAnchorEl(null);
    setModalType(type);
    setActiveRow(row);
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch = row.username
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "All" || row.role === roleFilter;
      const matchesLifecycle =
        lifecycleFilter === "All" || row.lifecycle === lifecycleFilter;
      const matchesType =
        typeFilter === "All" || row.account_type === typeFilter;

      return matchesSearch && matchesRole && matchesLifecycle && matchesType;
    });
  }, [rows, searchQuery, roleFilter, lifecycleFilter, typeFilter]);

  const handleReactivateUser = async (id: string) => {
    try {
      setLoading(true);
      // await apiClient.patch(`/user/reactivate/`, { id });
      showSnackbar("User reactivated successfully", "success");
      closeAll();
      mutate();
    } catch (error) {
      showSnackbar("Failed to reactivate user", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    const selectedUsersData = rows.filter((row) => selected.includes(row.id));

    const hasActiveUser = selectedUsersData.some(
      (user) => user.lifecycle !== "disabled",
    );

    if (hasActiveUser) {
      showSnackbar(
        "Some users are not disabled, you need to disable them first",
        "error",
      );
      return;
    }

    try {
      setLoading(true);
      await Promise.all(
        selected.map((id) => accountsApi.accountControllerDelete(id)),
      );

      showSnackbar(`${selected.length} users deleted successfully`, "success");
      setSelected([]);
      closeAll();
      mutate();
    } catch (error) {
      showSnackbar("Failed to delete users", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteUser = async (id: string, status: string) => {
    try {
      setLoading(true);
      if (status !== "disabled") {
        showSnackbar(
          "User is not disabled, you need to disable the user first",
          "error",
        );
        return;
      }
      await accountsApi.accountControllerDelete(id);
      showSnackbar("User deleted successfully", "success");
      closeAll();
      mutate();
    } catch (error) {
      showSnackbar("Failed to delete user", "error");
    } finally {
      setLoading(false);
    }
  };

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
            onRefresh={mutate}
            roleFilter={roleFilter}
            lifecycleFilter={lifecycleFilter}
            typeFilter={typeFilter}
            onSearch={(val) => setSearchQuery(val)}
            onFilterRole={(role) => {
              setRoleFilter(role), setPage(0);
            }}
            onFilterLifecycle={(status) => {
              setLifecycleFilter(status), setPage(0);
            }}
            onFilterType={(type) => {
              setTypeFilter(type), setPage(0);
            }}
            onDelete={() => setModalType("bulk-delete")}
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
                {(isLoading && rows.length === 0) || loading ? (
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
        onEdit={(row) => handleAction("edit", row)}
        onSuspend={(row) => handleAction("suspend", row)}
        onDisable={(row) => handleAction("disable", row)}
        onReset={(row) => handleAction("reset", row)}
        onReactivate={(row) => handleAction("reactivate", row)}
        onDelete={(row) => handleAction("delete", row)}
      />

      <GenericDialog
        open={
          modalType === "disable" ||
          modalType === "delete" ||
          modalType === "reactivate" ||
          modalType === "bulk-delete"
        }
        onClose={closeAll}
        title={
          modalType === "disable"
            ? "Disable Account"
            : modalType === "reactivate"
              ? "Reactivate Account"
              : modalType === "bulk-delete"
                ? "Delete Accounts"
                : "Delete Account"
        }
        content={
          modalType === "reactivate"
            ? "Are you sure you want to reactivate this user?"
            : modalType === "bulk-delete"
              ? `Are you sure you want to delete ${selected.length} users?`
              : "Are you sure you want to delete this user?"
        }
        subContent={
          modalType === "delete"
            ? "This user will be deleted permanently!"
            : modalType === "bulk-delete"
              ? "These users will be deleted permanently"
              : ""
        }
        negativeText="Cancel"
        positiveText={
          modalType === "reactivate"
            ? "Reactivate"
            : modalType === "bulk-delete"
              ? "Delete Selected"
              : "Delete"
        }
        onConfirm={() => {
          if (modalType === "bulk-delete") {
            handleBulkDelete();
            return;
          }

          if (!activeRow) return;
          if (modalType === "reactivate") handleReactivateUser(activeRow.id);
          if (modalType === "delete")
            handleDeleteUser(activeRow.id, activeRow.lifecycle);
        }}
        onRefresh={mutate}
      />

      <GenericModal
        open={
          modalType === "edit" ||
          modalType === "disable" ||
          modalType === "reset"
        }
        onClose={closeAll}
        title={
          modalType === "edit"
            ? "Edit Role"
            : modalType === "reset"
              ? "Reset Password"
              : "Disable Account"
        }
      >
        {activeRow && (
          <>
            {modalType === "edit" ? (
              <>
                <Box
                  sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Typography>Current Role: </Typography>
                  <GenericChips value={activeRow.role} variant="filled" />
                </Box>
                <EditForm
                  data={activeRow}
                  onCancel={closeAll}
                  onSuccess={() => {
                    mutate();
                    closeAll();
                  }}
                />
              </>
            ) : modalType === "disable" ? (
              <>
                <Box sx={{ mb: 2 }}>
                  <Typography>
                    Username: <strong>{activeRow.username}</strong>
                  </Typography>
                  <Typography>
                    Full Name: <strong>{activeRow.full_name}</strong>
                  </Typography>
                </Box>
                <DisableForm
                  data={activeRow}
                  onCancel={closeAll}
                  onSuccess={() => {
                    mutate();
                    closeAll();
                  }}
                />
              </>
            ) : (
              <>
                {step === "form" ? (
                  <>
                    <Box sx={{ mb: 2 }}>
                      <Typography>
                        Username: <strong>{activeRow.username}</strong>
                      </Typography>
                      <Typography>
                        Full Name: <strong>{activeRow.full_name}</strong>
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography>Role:</Typography>
                        <GenericChips value={activeRow.role} variant="filled" />
                      </Box>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <WarningIcon color="warning" fontSize="large" />
                      <Typography
                        sx={{ my: 4 }}
                        fontSize={18}
                        align="center"
                        color="warning.light"
                      >
                        This will generate a new temporary password!
                      </Typography>
                    </Box>

                    <ResetPasswordAdminForm
                      onCancel={closeAll}
                      onSuccess={(formValues) => {
                        mutate();
                        setResetResult({ ...activeRow, ...formValues });
                        setStep("success");
                      }}
                    />
                  </>
                ) : (
                  <SuccessResetPasswordView
                    data={resetResult}
                    onClose={closeAll}
                  />
                )}
              </>
            )}
          </>
        )}
      </GenericModal>
    </>
  );
}
