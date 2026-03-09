export type ExecutionDialogType =
  | "create"
  | "custom"
  | "start"
  | "delete"
  | null;

export const eventDialogConfig = (modalType: ExecutionDialogType) => {
  if (modalType === "create") {
    return {
      title: "Create Event",
      content: "Are you sure you want to create this event?",
      positiveText: "create",
      subContent: "",
    };
  }

  if (modalType === "custom") {
    return {
      title: "Custom Event",
      content: "Are you sure you want to custom this event?",
      positiveText: "custom",
      subContent: "",
    };
  }

  if (modalType === "start") {
    return {
      title: "Start Event",
      content: "Are you sure you want to start this event?",
      positiveText: "start",
      subContent: "",
    };
  }
  if (modalType === "delete") {
    return {
      title: "Delete Event",
      content: "Are you sure you want to delete this event?",
      positiveText: "delete",
      subContent: "",
    };
  }

  return {
    title: "",
    content: "",
    positiveText: "",
    subContent: "",
  };
};
