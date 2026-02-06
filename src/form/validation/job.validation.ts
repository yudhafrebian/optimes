import * as Yup from "yup";

export const createJobValidationSchema = Yup.object().shape({
  work_order: Yup.string().required("Work Order is required"),
  sales_order: Yup.string().required("Sales Order is required"),
  quantity_order: Yup.number()
    .min(1, "Quantity Order must be at least 1")
    .required("Quantity Order is required"),
  quantity_unit: Yup.string().required("Quantity Unit is required"),
  planned_start_time: Yup.string().required("Planned Start Time is required"),
  due_date: Yup.string().required("Due Date is required"),
  job_priority: Yup.string().required("Job Priority is required"),
  machine_id: Yup.string().required("Machine is required"),
});
