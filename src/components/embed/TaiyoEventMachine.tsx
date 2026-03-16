"use client";
import { loadedDataAtom } from "@/atoms/loader.atom";
import { Box } from "@mui/material";
import { useAtom } from "jotai";
import * as React from "react";

interface TaiyoEventMachineEmbedProps {
  isExpanded: boolean;
}

const TaiyoEventMachineEmbed: React.FunctionComponent<TaiyoEventMachineEmbedProps> = (
  props,
) => {
  const [loaderData, setLoaderData] = useAtom(loadedDataAtom);
  return (
    <Box
      sx={{
        p: props.isExpanded ? 2 : 1,
        borderRadius: 2,
        height: "100%",
      }}
    >
      <iframe
        // style="border:1px #FFFFFF none"
        src={`http://192.168.68.9:3000/d/taiyooperatorevent/embed?wo=${loaderData.work_order}&wc=${loaderData.work_center.code}`}
        title="iFrame"
        width="100%"
        height="250px"
        scrolling="yes"
        frameBorder={0}
        allow="fullscreen"
      ></iframe>
    </Box>
  );
};

export default TaiyoEventMachineEmbed;
