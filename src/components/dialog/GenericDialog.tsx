import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import * as React from "react";

interface IGenericDialogProps {
  open: boolean;
  title: string;
  content: string;
  subContent?: string;
  negativeText?: string;
  positiveText?: string;
  isTriggerDrawer?: boolean;
  triggerLabel?: string;
  onTriggerDrawer?: () => void;
  onConfirm: () => void;
  onClose: () => void;
  onRefresh: () => void;
  sx?: SxProps<Theme>;
}

const GenericDialog: React.FunctionComponent<IGenericDialogProps> = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="generic-dialog-title"
      aria-describedby="generic-dialog-description"
      sx={props.sx}
    >
      <DialogTitle id="generic-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{props.content}</Typography>
        {props.subContent && (
          <Typography variant="body2" color="warning">
            {props.subContent}
          </Typography>
        )}
        {props.isTriggerDrawer && (
          <Button sx={{mt:2}} variant="outlined" onClick={props.onTriggerDrawer}>
            {props.triggerLabel}
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            props.onClose();
          }}
        >
          {props.negativeText || "Cancel"}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            props.onConfirm();
            props.onRefresh();
          }}
          autoFocus
        >
          {props.positiveText || "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
