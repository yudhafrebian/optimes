"use client";
import { authAtom } from "@/atoms/auth.atom";
import workCenterAtom from "@/atoms/wc.atom";
import { Paper, Typography } from "@mui/material";
import { useAtom } from "jotai";
import * as React from "react";

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
        borderRadius: 2,
        height: "100%",
        border: "none"
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>MES Settings</Typography>
      <iframe
        // style="border:1px #FFFFFF none"
        src={`http://192.168.68.99:3002/d/taiyooperatormesattributecontrol/embed?operator=${JSON.stringify(op)}&wc=${workCenterPath[0]}`}
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
