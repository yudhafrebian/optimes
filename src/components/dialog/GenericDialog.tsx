import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import * as React from "react";

interface IGenericDialogProps {
  open: boolean;
  title: string;
  content: string;
  negativeText?: string;
  positiveText?: string;
  onConfirm: () => void;
  onClose: () => void;
  onRefresh: () => void;
}

const GenericDialog: React.FunctionComponent<IGenericDialogProps> = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="generic-dialog-title"
      aria-describedby="generic-dialog-description"
    >
      <DialogTitle id="generic-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="generic-dialog-description">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            props.onClose();
            props.onRefresh();
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
