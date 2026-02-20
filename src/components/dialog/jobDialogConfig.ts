export type JobDialogType = "edit" | "close" | "release" | "delete" | null;

export const getJobDialogConfig = (modalType: JobDialogType) => {
  if (modalType === "edit") {
    return {
      title: "Edit Job",
      content: "Are you sure you want to edit this job?",
      positiveText: "Edit",
      subContent: "",
    };
  }

  if (modalType === "close") {
    return {
      title: "Close Job",
      content: "Are you sure you want to close this job?",
      positiveText: "Close",
      subContent: "",
    };
  }

  if (modalType === "release") {
    return {
      title: "Release Job",
      content: "Are you sure you want to release this job?",
      positiveText: "Release",
      subContent: "",
    };
  }

  if (modalType === "delete") {
    return {
      title: "Delete Job",
      content: "Are you sure you want to delete this job?",
      positiveText: "Delete",
      subContent: "This job will be deleted permanently!",
    };
  }

  return {
    title: "",
    content: "",
    positiveText: "",
    subContent: "",
  };
};
