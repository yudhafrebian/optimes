export type JobDialogType = "edit" | "cancel" | "close" | "release" | "delete" | "completed" | null;

export const getJobDialogConfig = (modalType: JobDialogType) => {
  if (modalType === "edit") {
    return {
      title: "Edit Job",
      content: "Are you sure you want to edit this job?",
      positiveText: "Edit",
      subContent: "",
    };
  }

  if (modalType === "cancel") {
    return {
      title: "Cancel Job",
      content: "Are you sure you want to cancel this job?",
      positiveText: "Cancel",
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
