// "use client";
// import * as React from "react";
// import { TableRow, TableCell, Checkbox, IconButton, Chip } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import GenericChips from "@/components/core/GenericChips";
// import dayjs from "dayjs";
// import { UserRowData } from "@/interface/row-table.interface";

// interface UserTableRowProps {
//   row: UserRowData;
//   isSelected: boolean;
//   labelId: string;
//   onSelect: (event: React.MouseEvent<unknown>, id: string) => void;
//   onOpenMenu: (
//     event: React.MouseEvent<HTMLButtonElement>,
//     row: UserRowData,
//   ) => void;
// }

// const UserTableRow: React.FC<UserTableRowProps> = ({
//   row,
//   isSelected,
//   labelId,
//   onSelect,
//   onOpenMenu,
// }) => {
//   return (
//     <TableRow
//       hover
//       role="checkbox"
//       aria-checked={isSelected}
//       tabIndex={-1}
//       key={row.id}
//       selected={isSelected}
//       onClick={(event) => onSelect(event, row.id)}
//       sx={{ cursor: "pointer" }}
//     >

//       <TableCell component="th" id={labelId} scope="row" padding="normal" sx={{minWidth:150}}>
//         {row.id}
//       </TableCell>
//       <TableCell component="th" id={labelId} scope="row" padding="none" sx={{minWidth:250}}>
//         {row.full_name}
//       </TableCell>
//       <TableCell component="th" id={labelId} scope="row" padding="none" sx={{minWidth:200}}>
//         {row.username}
//       </TableCell>

//       <TableCell component="th" scope="row" padding="none" align="left" sx={{minWidth:200}}>
//         <GenericChips value={row.role} variant="filled" />
//       </TableCell>

//       <TableCell component="th" scope="row" padding="none" align="left">
//         <GenericChips value={row.status} />
//       </TableCell>
//       <TableCell
//         component="th"
//         scope="row"
//         padding="normal"
//         align="left"
//         sx={{ textTransform: "capitalize", minWidth: 200 }}
//       >
//         {row.password_status}
//       </TableCell>
//       <TableCell component="th" scope="row" padding="none" align="left" sx={{minWidth:150}}>
//         {dayjs(row.last_login).format("DD/MM/YYYY HH:mm")}
//       </TableCell>

//       <TableCell align="center" sx={{ width: 50 }}>
//         <IconButton
//           size="small"
//           onClick={(e) => {
//             e.stopPropagation();
//             onOpenMenu(e, row);
//           }}
//         >
//           <MoreVertIcon fontSize="small" />
//         </IconButton>
//       </TableCell>
//     </TableRow>
//   );
// };

// export default React.memo(UserTableRow);
