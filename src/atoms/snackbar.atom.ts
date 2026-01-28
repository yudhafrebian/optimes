import { atom } from "jotai";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export const snackbarAtom = atom<SnackbarState>({
  open: false,
  message: "",
  severity: "success",
});
