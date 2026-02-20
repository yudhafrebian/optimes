import * as Yup from "yup";

export const createJobValidationSchema = Yup.object().shape({
  work_order: Yup.string().required("Work Order is required"),
  sales_order: Yup.string().required("Sales Order is required"),
  quantity_order: Yup.number()
    .min(1, "Quantity Order must be at least 1")
    .required("Quantity Order is required"),
  quantity_unit: Yup.number()
    .typeError("Quantity Unit is required")
    .min(1, "Quantity Unit is required")
    .required("Quantity Unit is required"),
  planned_start_time: Yup.string().required("Planned Start Time is required"),
  due_date: Yup.string().required("Due Date is required"),
  job_priority: Yup.number()
    .typeError("Job Priority is required")
    .min(1, "Job Priority is required")
    .required("Job Priority is required"),
  work_center: Yup.number()
    .typeError("Machine is required")
    .min(1, "Machine is required")
    .required("Machine is required"),
});
