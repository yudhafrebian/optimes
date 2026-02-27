import dayjs from "dayjs";

  export const formatDateTime = (value?: string | null) => {
    if (!value || !dayjs(value).isValid()) {
      return "-";
    }

    return dayjs(value).format("HH:mm:ss - DD/MM/YYYY");
  };