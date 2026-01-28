"use client";
import { Snackbar, Alert } from "@mui/material";
import { useAtom } from "jotai";
import { snackbarAtom } from "@/atoms/snackbar.atom";

export function GlobalSnackbar() {
  const [snackbar, setSnackbar] = useAtom(snackbarAtom);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
