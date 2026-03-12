import { Box, Drawer, IconButton } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";

interface IGenericDrawerProps {
  anchor: "left" | "top" | "right" | "bottom";
  open: boolean;
  closeDrawer: () => void;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const GenericDrawer: React.FunctionComponent<IGenericDrawerProps> = (props) => {
  return (
    <Drawer
      open={props.open}
      onClose={props.closeDrawer}
      anchor={props.anchor}
      sx={props.sx}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton color="error" onClick={props.closeDrawer}>
          <CloseIcon />
        </IconButton>
      </Box>
      {props.children}
    </Drawer>
  );
};

export default GenericDrawer;
