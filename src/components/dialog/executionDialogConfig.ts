export type ExecutionDialogType = "load" | "unload" | "completed" | null;

export const getExecutionDialogConfig = (modalType: ExecutionDialogType) => {
  if (modalType === "load") {
    return {
      title: "Load Job",
      content: "Are you sure you want to load this job?",
      positiveText: "Load",
      subContent: "",
    };
  }

  if (modalType === "unload") {
    return {
      title: "Unload Job",
      content: "Are you sure you want to unload this job?",
      positiveText: "Unload",
      subContent: "",
    };
  }

  if (modalType === "completed") {
    return {
      title: "Complete Job",
      content: "Are you sure you want to complete this job?",
      positiveText: "Completed",
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
