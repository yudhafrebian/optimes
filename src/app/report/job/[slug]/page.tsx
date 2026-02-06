import GenericChips from "@/components/core/GenericChips";
import { IJobOffsetPrinter } from "@/interface/job.interface";
import { apiServer } from "@/utils/apiHelper";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const res = await apiServer.get(`/job/${params.slug}`);
    const data: IJobOffsetPrinter = res.data;

    return (
      <Box>
        <Typography variant="h4">Job Report</Typography>
        <Typography variant="body1">Work Order: {data.work_order}</Typography>
        <Typography variant="body1">Sales Order: {data.sales_order}</Typography>
        <Typography variant="body1">
          Machine: {data.machine_id.label}
        </Typography>
        <Typography variant="body1">
          Quantity Order: {data.quantity_order} {data.quantity_unit.label}
        </Typography>
        <Typography variant="body1">
          Planned Start Time:{" "}
          {dayjs(data.planned_start_time).format("HH:mm:ss - DD/MM/YYYY")}
        </Typography>
        <Typography variant="body1">
          Release Date:{" "}
          {dayjs(data.release_date).format("HH:mm:ss - DD/MM/YYYY")}
        </Typography>
        <Typography variant="body1">
          Due Date: {dayjs(data.due_date).format("HH:mm:ss - DD/MM/YYYY")}
        </Typography>
        <Typography variant="body1">
          Job Lifecycle State: {data.job_lifecycle_state.label}
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography variant="body1">Job Priority:</Typography>
          <GenericChips variant="filled" value={data.job_priority.label} />
        </Box>
        <Typography variant="body1">Notes: {data.notes}</Typography>
      </Box>
    );
  } catch (err) {
    return <Typography variant="body1">Data not found</Typography>;
  }
}
