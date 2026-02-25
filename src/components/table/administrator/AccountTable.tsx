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
import { useMemo, useState } from "react";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import GenericModal from "../../modal/GenericModal";
import TableRowSkeleton from "../../skeleton/TableRowSkeleton";
import GenericDialog from "../../dialog/GenericDialog";
import { useSnackbar } from "@/hooks/useSnackbar";
import UserTableRow from "./UserTableRow";
import TableActionMenu from "./TableActionMenu";
import EditForm from "@/form/EditForm";
import GenericChips from "@/components/core/GenericChips";
import ResetPasswordAdminForm from "@/form/ResetPasswordAdminForm";
import WarningIcon from "@mui/icons-material/Warning";
import SuccessResetPasswordView from "@/components/view/SuccessResetPasswordView";
import useSwr from "swr";
import { UserRowData } from "@/interface/row-table.interface";
import { AccountResponseDto } from "@/api/generated/common-service";
import { filterAccounts } from "@/utils/accountFilters";
import { getAccountDialogConfig } from "@/components/dialog/accountDialogConfig";
import { commonApi } from "@/lib/api";

const fetcher = () =>
  commonApi.accountControllerGetAll().then((res) => {
    return res;
  });

function createData(user: AccountResponseDto): UserRowData {
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

  const filteredRows = useMemo(
    () =>
      filterAccounts(rows, {
        searchQuery,
        roleFilter,
        lifecycleFilter,
        typeFilter,
      }),
    [rows, searchQuery, roleFilter, lifecycleFilter, typeFilter],
  );

  const handleDisableUser = async (id: string) => {
    try {
      setLoading(true);
      await commonApi.accountControllerDisable(id);
      showSnackbar("User disabled successfully", "success");
      closeAll();
      mutate();
    } catch (error) {
      showSnackbar("Failed to disable user", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReactivateUser = async (id: string) => {
    try {
      setLoading(true);
      await commonApi.accountControllerEnable(id);
      showSnackbar("User reactivated successfully", "success");
      closeAll();
      mutate();
    } catch (error) {
      showSnackbar("Failed to reactivate user", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string, status: string) => {
    try {
      setLoading(true);
      await commonApi.accountControllerDelete(id);
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

  const dialogConfig = getAccountDialogConfig(modalType);

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
            // numSelected={selected.length}
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
            // onDelete={() => setModalType("bulk-delete")}
          />
          <Box sx={{ height: 4 }}>{loading && <LinearProgress />}</Box>
          <TableContainer
            sx={{ overflowX: "auto", whiteSpace: "nowrap", maxHeight: 600 }}
          >
            <Table
              sx={{ minWidth: 1100, tableLayout: "auto" }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              stickyHeader
            >
              <EnhancedTableHead
                // numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                // onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                // rowCount={rows.length}
              />
              <TableBody>
                {(isLoading && rows.length === 0) || loading ? (
                  <TableRowSkeleton rows={rowsPerPage} />
                ) : (
                  visibleRows.map((row, index) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      // isSelected={selected.includes(row.id)}
                      // labelId={`enhanced-table-checkbox-${index}`}
                      // onSelect={handleClick}
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
          modalType === "reactivate"
          // || modalType === "bulk-delete"
        }
        onClose={closeAll}
        title={dialogConfig.title}
        content={dialogConfig.content}
        subContent={dialogConfig.subContent}
        negativeText="Cancel"
        positiveText={dialogConfig.positiveText}
        onConfirm={() => {
          // if (modalType === "bulk-delete") {
          //   handleBulkDelete();
          //   return;
          // }

          if (!activeRow) return;
          if (modalType === "disable") handleDisableUser(activeRow.id);
          if (modalType === "reactivate") handleReactivateUser(activeRow.id);
          if (modalType === "delete")
            handleDeleteUser(activeRow.id, activeRow.lifecycle);
        }}
        onRefresh={mutate}
      />

      <GenericModal
        open={modalType === "edit" || modalType === "reset"}
        onClose={closeAll}
        title={modalType === "edit" ? "Edit Role" : "Reset Password"}
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
                      data={activeRow}
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
