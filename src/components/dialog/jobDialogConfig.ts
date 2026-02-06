export type JobDialogType = "edit" | "disable" | "enable" | "delete" | null;

export const getJobDialogConfig = (modalType: JobDialogType) => {
  if (modalType === "disable") {
    return {
      title: "Disable Job",
      content: "Are you sure you want to disable this job?",
      positiveText: "Disable",
      subContent: "",
    };
  }

  if (modalType === "enable") {
    return {
      title: "Enable Job",
      content: "Are you sure you want to enable this job?",
      positiveText: "Enable",
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
