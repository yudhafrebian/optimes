"use client";
import { loadedDataAtom } from "@/atoms/loader.atom";
import { Paper } from "@mui/material";
import { useAtom } from "jotai";
import * as React from "react";

interface IMachineInfoCardProps {
  isExpanded: boolean;
}

const MachineInfoCard: React.FunctionComponent<IMachineInfoCardProps> = (
  props,
) => {
  const [loaderData, setLoaderData] = useAtom(loadedDataAtom);
  return (
    <Paper
      variant="outlined"
      sx={{
        p: props.isExpanded ? 2 : 1,
        borderRadius: 2,
        height: "100%",
      }}
    >
      <iframe
        // style="border:1px #FFFFFF none"
        src={`http://192.168.68.99:3002/d/taiyooperatormachinedashboard/embed?wo=${loaderData.work_order}&wc=${loaderData.work_center.code}`}
        title="iFrame"
        width="100%"
        height="250px"
        scrolling="yes"
        frameBorder={0}
        allow="fullscreen"
      ></iframe>
    </Paper>
  );
};

export default MachineInfoCard;
