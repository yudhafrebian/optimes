export type AccountDialogType =
  | "edit"
  | "suspend"
  | "delete"
  | "disable"
  | "reset"
  | "reactivate"
  | "bulk-delete"
  | null;

export const getAccountDialogConfig = (modalType: AccountDialogType) => {
  if (modalType === "disable") {
    return {
      title: "Disable Account",
      content: "Are you sure you want to disable this user?",
      positiveText: "Disable",
      subContent: "",
    };
  }

  if (modalType === "reactivate") {
    return {
      title: "Reactivate Account",
      content: "Are you sure you want to reactivate this user?",
      positiveText: "Reactivate",
      subContent: "",
    };
  }

  if (modalType === "bulk-delete") {
    return {
      title: "Delete Accounts",
      content: "Are you sure you want to delete selected users?",
      positiveText: "Delete Selected",
      subContent: "These users will be deleted permanently",
    };
  }

  if (modalType === "delete") {
    return {
      title: "Delete Account",
      content: "Are you sure you want to delete this user?",
      positiveText: "Delete",
      subContent: "This user will be deleted permanently!",
    };
  }

  return {
    title: "",
    content: "",
    positiveText: "",
    subContent: "",
  };
};
