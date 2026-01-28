import { useSetAtom } from "jotai";
import { snackbarAtom } from "@/atoms/snackbar.atom";

export function useSnackbar() {
  const setSnackbar = useSetAtom(snackbarAtom);

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info" | "warning" = "success",
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  return showSnackbar;
}
