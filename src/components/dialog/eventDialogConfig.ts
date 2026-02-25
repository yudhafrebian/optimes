export type EventDialogType = "Setup" | "Production" | "Idle" | "delete" | null;

export const getEventDialogConfig = (modalType: EventDialogType) => {
  if (modalType === "Setup") {
    return {
      title: "Setup Event",
      content: "Are you sure you want to create event Setup?",
      positiveText: "Create Setup",
      subContent: "This will end the current active event",
    };
  }

  if (modalType === "Production") {
    return {
      title: "Production Event",
      content: "Are you sure you want to create event Production?",
      positiveText: "Create Production",
      subContent: "This will end the current active event",
    };
  }

  if (modalType === "Idle") {
    return {
      title: "Idle Event",
      content: "Are you sure you want to create event Idle?",
      positiveText: "Create Idle",
      subContent: "This will end the current active event",
    };
  }

  return {
    title: "",
    content: "",
    positiveText: "",
    subContent: "",
  };
};
