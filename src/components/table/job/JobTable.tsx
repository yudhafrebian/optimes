// "use client";
// const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);
// import * as React from "react";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TablePagination from "@mui/material/TablePagination";
// import Paper from "@mui/material/Paper";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import { Divider, LinearProgress, Typography } from "@mui/material";
// import { IUser } from "@/interface/user.interface";
// import { useMemo, useState } from "react";
// import { apiClient } from "@/utils/apiHelper";
// import EnhancedTableToolbar from "./EnhancedTableToolbar";
// import EnhancedTableHead from "./EnhancedTableHead";
// import GenericModal from "../../modal/GenericModal";
// import TableRowSkeleton from "../../skeleton/TableRowSkeleton";
// import GenericDialog from "../../dialog/GenericDialog";
// import { useSnackbar } from "@/hooks/useSnackbar";
// import UserTableRow from "./JobTableRow";
// import TableActionMenu from "./TableActionMenu";
// import EditForm from "@/form/EditForm";
// import dayjs, { Dayjs } from "dayjs";
// import GenericChips from "@/components/core/GenericChips";
// import ResetPasswordAdminForm from "@/form/ResetPasswordAdminForm";
// import WarningIcon from "@mui/icons-material/Warning";
// import SuccessResetPasswordView from "@/components/view/SuccessResetPasswordView";
// import useSwr from "swr";
// import DisableForm from "@/form/DisableForm";
// import { JobRowData, UserRowData } from "@/interface/row-table.interface";
// import { IJobOffsetPrinter } from "@/interface/job.interface";
// import JobTableRow from "./JobTableRow";

// function createData(job: JobRowData) {
//   return {
//     work_order: job.work_order,
//     sales_order: job.sales_order,
//     product_name: job.product_name,
//     assigned_entity: job.assigned_entity,
//     quantity_order: job.quantity_order,
//     planned_start_time: job.planned_start_time,
//     job_lifecycle_state: job.job_lifecycle_state,
//     assigned_operator_1: job.assigned_operator_1.full_name,
//     assigned_operator_2: job.assigned_operator_2?.full_name,
//   };
// }

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// type Order = "asc" | "desc";

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key,
// ): (
//   a: { [key in Key]: number | string },
//   b: { [key in Key]: number | string },
// ) => number {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// export default function AccountTableManagement() {
//   const [order, setOrder] = useState<Order>("asc");
//   const [orderBy, setOrderBy] = useState<keyof JobRowData>("planned_start_time");
//   const [page, setPage] = useState<number>(0);
//   const [dense, setDense] = useState<boolean>(false);
//   const [rowsPerPage, setRowsPerPage] = useState<number>(5);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [activeRow, setActiveRow] = useState<UserRowData | null>(null);
//   const [modalType, setModalType] = useState<
//     | "edit"
//     | "suspend"
//     | "delete"
//     | "disable"
//     | "reset"
//     | "reactivate"
//     | "bulk-delete"
//     | null
//   >(null);
//   const [step, setStep] = useState<"form" | "success">("form");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [workFilter, setWorkFilter] = useState<string>("All");
//   const [salesFilter, setSalesFilter] = useState<string>("All");
//   const [equipmentFilter, setEquipmentFilter] = useState<string>("All");
//   const [statusFilter, setStatusFilter] = useState<string>("All");
//   const [operatorFilter_1, setOperatorFilter_1] = useState<string>("All");
//   const [operatorFilter_2, setOperatorFilter_2] = useState<string>("All");
//   const [startDate, setStartDate] = useState<Dayjs | null>(null);
//   const [endDate, setEndDate] = useState<Dayjs | null>(null);
//   const [resetResult, setResetResult] = useState<any>(null);

//   const {
//     data: users,
//     error,
//     mutate,
//     isValidating,
//     isLoading,
//   } = useSwr<IJobOffsetPrinter[]>("/user/all", fetcher, {
//     refreshInterval: 5000,
//     revalidateOnFocus: false,
//     keepPreviousData: true,
//   });

//   const rows = useMemo(() => {
//     if (!users || !Array.isArray(users)) {
//       return [];
//     }
//     console.log(users);

//     return users.map((user) =>
//       createData({
//         work_order: user.work_order,
//         sales_order: user.sales_order,
//         product_name: user.product_name,
//         assigned_entity: user.assigned_entity.label,
//         quantity_order: user.quantity_order,
//         planned_start_time: user.planned_start_time,
//         job_lifecycle_state: user.job_lifecycle_state.label,
//         assigned_operator_1: user.assigned_operator_1?.full_name,
//         assigned_operator_2: user.assigned_operator_2?.full_name,
//       }),
//     );
//   }, [users]);

//   const showSnackbar = useSnackbar();

//   const handleOpenMenu = (
//     event: React.MouseEvent<HTMLButtonElement>,
//     row: UserRowData,
//   ) => {
//     setAnchorEl(event.currentTarget);
//     setActiveRow(row);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   const closeAll = () => {
//     setModalType(null);
//     setActiveRow(null);
//     setStep("form");
//     setResetResult(null);
//   };

//   const handleAction = (
//     type: "edit" | "suspend" | "delete" | "disable" | "reset" | "reactivate",
//     row: UserRowData,
//   ) => {
//     setAnchorEl(null);
//     setModalType(type);
//     setActiveRow(row);
//   };

//   const filteredRows = useMemo(() => {
//     return rows.filter((row) => {
//       const matchesSearch = row.assigned_entity
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());
//       const matchesWork = workFilter === "All" || row.work_order === workFilter;
//       const matchesSales =
//         salesFilter === "All" || row.sales_order === salesFilter;
//       const matchesEquipment =
//         equipmentFilter === "All" || row.product_name === equipmentFilter;
//       const matchesStatus =
//         statusFilter === "All" || row.job_lifecycle_state === statusFilter;
//       const matchesOperator_1 =
//         operatorFilter_1 === "All" ||
//         row.assigned_operator_1 === operatorFilter_1;
//       const matchesOperator_2 =
//         operatorFilter_2 === "All" ||
//         row.assigned_operator_2 === operatorFilter_2;

//       const rowDate = dayjs(row.planned_start_time);

//       const isAfterStart = startDate
//         ? rowDate.isAfter(startDate.startOf("day")) ||
//           rowDate.isSame(startDate.startOf("day"))
//         : true;

//       const isBeforeEnd = endDate
//         ? rowDate.isBefore(endDate.endOf("day")) ||
//           rowDate.isSame(endDate.endOf("day"))
//         : true;

//       return (
//         matchesSearch &&
//         matchesWork &&
//         matchesSales &&
//         matchesEquipment &&
//         matchesStatus &&
//         matchesOperator_1 &&
//         matchesOperator_2 &&
//         isAfterStart &&
//         isBeforeEnd
//       );
//     });
//   }, [
//     rows,
//     searchQuery,
//     workFilter,
//     salesFilter,
//     equipmentFilter,
//     statusFilter,
//     startDate,
//     endDate,
//   ]);

//   const handleReactivateUser = async (id: string) => {
//     try {
//       setLoading(true);
//       // await apiClient.patch(`/user/reactivate/`, { id });
//       showSnackbar("User reactivated successfully", "success");
//       closeAll();
//       mutate();
//     } catch (error) {
//       showSnackbar("Failed to reactivate user", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleBulkDelete = async () => {
//   //   const selectedUsersData = rows.filter((row) => selected.includes(row.id));

//   //   const hasActiveUser = selectedUsersData.some(
//   //     (user) => user.status !== "disabled",
//   //   );

//   //   if (hasActiveUser) {
//   //     showSnackbar(
//   //       "Some users are not disabled, you need to disable them first",
//   //       "error",
//   //     );
//   //     return;
//   //   }

//   //   try {
//   //     setLoading(true);
//   //     // await apiClient.post(`/user/bulk-delete`, { ids: selected });

//   //     showSnackbar(`${selected.length} users deleted successfully`, "success");
//   //     setSelected([]);
//   //     closeAll();
//   //     mutate();
//   //   } catch (error) {
//   //     showSnackbar("Failed to delete users", "error");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const handleDeleteUser = async (id: string, status: string) => {
//     try {
//       setLoading(true);
//       if (status !== "disabled") {
//         showSnackbar(
//           "User is not disabled, you need to disable the user first",
//           "error",
//         );
//         return;
//       }
//       // await apiClient.delete(`/user/delete/${id}`);
//       showSnackbar("User deleted successfully", "success");
//       closeAll();
//       mutate();
//     } catch (error) {
//       showSnackbar("Failed to delete user", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRequestSort = (
//     event: React.MouseEvent<unknown>,
//     property: keyof JobRowData,
//   ) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (event.target.checked) {
//   //     const newSelected = filteredRows.map((n: JobRowData) => n.id);
//   //     setSelected(newSelected);
//   //     return;
//   //   }
//   //   setSelected([]);
//   // };

//   // const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
//   //   const selectedIndex = selected.indexOf(id);
//   //   let newSelected: readonly string[] = [];

//   //   if (selectedIndex === -1) {
//   //     newSelected = [...selected, id];
//   //   } else {
//   //     newSelected = selected.filter((item) => item !== id);
//   //   }
//   //   setSelected(newSelected);
//   // };

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDense(event.target.checked);
//   };

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const visibleRows = React.useMemo(
//     () =>
//       [...filteredRows]
//         .sort(getComparator(order, orderBy))
//         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [filteredRows, order, orderBy, page, rowsPerPage],
//   );

//   return (
//     <>
//       <Box sx={{ width: "100%" }}>
//         <Paper sx={{ width: "100%", mb: 2, boxShadow: 3, overflow: "hidden" }}>
//           <EnhancedTableToolbar
//             onRefresh={mutate}
//             workFilter={workFilter}
//             salesFilter={salesFilter}
//             equipmentFilter={equipmentFilter}
//             operator_1Filter={operatorFilter_1}
//             operator_2Filter={operatorFilter_2}
//             statusFilter={statusFilter}
//             startDate={startDate}
//             onSearch={(val) => setSearchQuery(val)}
//             onFilterWork={(work) => {
//               setWorkFilter(work), setPage(0);
//             }}
//             onFilterSales={(sales) => {
//               setSalesFilter(sales), setPage(0);
//             }}
//             onFilterEquipment={(equipment) => {
//               setEquipmentFilter(equipment), setPage(0);
//             }}
//             onFilterOperator_1={(operator_1) => {
//               setOperatorFilter_1(operator_1), setPage(0);
//             }}
//             onFilterOperator_2={(operator_2) => {
//               setOperatorFilter_2(operator_2), setPage(0);
//             }}
//             onFilterStatus={(status) => {
//               setStatusFilter(status), setPage(0);
//             }}
//             endDate={endDate}
//             onFilterDate={(start, end) => {
//               setStartDate(start);
//               setEndDate(end);
//               setPage(0);
//             }}
//             onDelete={() => setModalType("bulk-delete")}
//           />
//           <Box sx={{ height: 4 }}>{loading && <LinearProgress />}</Box>
//           <TableContainer sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
//             <Table
//               sx={{ minWidth: 1100, tableLayout: "auto" }}
//               aria-labelledby="tableTitle"
//               size={dense ? "small" : "medium"}
//             >
//               <EnhancedTableHead
//                 order={order}
//                 orderBy={orderBy}
//                 // onSelectAllClick={handleSelectAllClick}
//                 onRequestSort={handleRequestSort}
//                 rowCount={rows.length}
//               />
//               <TableBody>
//                 {(isLoading && rows.length === 0) || loading ? (
//                   <TableRowSkeleton rows={rowsPerPage} />
//                 ) : (
//                   visibleRows.map((row, index) => (
//                     <JobTableRow
//                       key={row.work_order}
//                       row={row}
//                       labelId={`enhanced-table-checkbox-${index}`}
//                       onOpenMenu={handleOpenMenu}
//                     />
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//         <FormControlLabel
//           control={<Switch checked={dense} onChange={handleChangeDense} />}
//           label="Dense padding"
//         />
//       </Box>

//       <TableActionMenu
//         anchorEl={anchorEl}
//         activeRow={activeRow}
//         onClose={handleCloseMenu}
//         onEdit={(row) => handleAction("edit", row)}
//         onSuspend={(row) => handleAction("suspend", row)}
//         onDisable={(row) => handleAction("disable", row)}
//         onReset={(row) => handleAction("reset", row)}
//         onReactivate={(row) => handleAction("reactivate", row)}
//         onDelete={(row) => handleAction("delete", row)}
//       />

//       <GenericDialog
//         open={
//           modalType === "disable" ||
//           modalType === "delete" ||
//           modalType === "reactivate"
//         }
//         onClose={closeAll}
//         title={
//           modalType === "disable"
//             ? "Disable Account"
//             : modalType === "reactivate"
//               ? "Reactivate Account"
//               : "Delete Account"
//         }
//         content={
//           modalType === "reactivate"
//             ? "Are you sure you want to reactivate this user?"
//             : "Are you sure you want to delete this user?"
//         }
//         subContent={
//           modalType === "delete" ? "This user will be deleted permanently!" : ""
//         }
//         negativeText="Cancel"
//         positiveText={
//           modalType === "reactivate"
//             ? "Reactivate"
            
//               : "Delete"
//         }
//         onConfirm={() => {

//           if (!activeRow) return;
//           if (modalType === "reactivate") handleReactivateUser(activeRow.id);
//           if (modalType === "delete")
//             handleDeleteUser(activeRow.id, activeRow.status);
//         }}
//         onRefresh={mutate}
//       />

//       <GenericModal
//         open={
//           modalType === "edit" ||
//           modalType === "disable" ||
//           modalType === "reset"
//         }
//         onClose={closeAll}
//         title={
//           modalType === "edit"
//             ? "Edit Role"
//             : modalType === "reset"
//               ? "Reset Password"
//               : "Disable Account"
//         }
//       >
//         {activeRow && (
//           <>
//             {modalType === "edit" ? (
//               <>
//                 <Box
//                   sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
//                 >
//                   <Typography>Current Role: </Typography>
//                   <GenericChips value={activeRow.role} variant="filled" />
//                 </Box>
//                 <EditForm
//                   data={activeRow}
//                   onCancel={closeAll}
//                   onSuccess={() => {
//                     mutate();
//                     closeAll();
//                   }}
//                 />
//               </>
//             ) : modalType === "disable" ? (
//               <>
//                 <Box sx={{ mb: 2 }}>
//                   <Typography>
//                     Username: <strong>{activeRow.username}</strong>
//                   </Typography>
//                   <Typography>
//                     Full Name: <strong>{activeRow.full_name}</strong>
//                   </Typography>
//                 </Box>
//                 <DisableForm
//                   data={activeRow}
//                   onCancel={closeAll}
//                   onSuccess={() => {
//                     mutate();
//                     closeAll();
//                   }}
//                 />
//               </>
//             ) : (
//               <>
//                 {step === "form" ? (
//                   <>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography>
//                         Username: <strong>{activeRow.username}</strong>
//                       </Typography>
//                       <Typography>
//                         Full Name: <strong>{activeRow.full_name}</strong>
//                       </Typography>
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                       >
//                         <Typography>Role:</Typography>
//                         <GenericChips value={activeRow.role} variant="filled" />
//                       </Box>
//                     </Box>
//                     <Divider sx={{ mb: 2 }} />
//                     <Box
//                       sx={{
//                         mb: 2,
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                       }}
//                     >
//                       <WarningIcon color="warning" fontSize="large" />
//                       <Typography
//                         sx={{ my: 4 }}
//                         fontSize={18}
//                         align="center"
//                         color="warning.light"
//                       >
//                         This will generate a new temporary password!
//                       </Typography>
//                     </Box>

//                     <ResetPasswordAdminForm
//                       onCancel={closeAll}
//                       onSuccess={(formValues) => {
//                         mutate();
//                         setResetResult({ ...activeRow, ...formValues });
//                         setStep("success");
//                       }}
//                     />
//                   </>
//                 ) : (
//                   <SuccessResetPasswordView
//                     data={resetResult}
//                     onClose={closeAll}
//                   />
//                 )}
//               </>
//             )}
//           </>
//         )}
//       </GenericModal>
//     </>
//   );
// }
