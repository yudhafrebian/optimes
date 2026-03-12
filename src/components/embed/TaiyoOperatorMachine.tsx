"use client";
import { authAtom } from "@/atoms/auth.atom";
import { loadedDataAtom } from "@/atoms/loader.atom";
import workCenterAtom from "@/atoms/wc.atom";
import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import * as React from "react";
import { json } from "stream/consumers";

interface ITaiyoOperatorMachineEmbedProps {
  isExpanded: boolean;
}

const TaiyoOperatorMachineEmbed: React.FunctionComponent<
  ITaiyoOperatorMachineEmbedProps
> = (props) => {
  const workCenterPath = useAtom(workCenterAtom)
  const [auth, setAuth] = useAtom(authAtom);
  const op = {
    label: auth?.full_name,
    value: auth?.id,
  };
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
        src={`http://192.168.68.9:3000/d/taiyooperatormesattributecontrol/embed?operator=${JSON.stringify(op)}&wc=${workCenterPath[0]}`}
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

export default TaiyoOperatorMachineEmbed;
