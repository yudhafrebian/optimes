"use client";
import EventPalleteModule from "@/components/view/pages/operator/EventPalette";
import * as React from "react";

interface IEventPaletteManagerProps {}

const EventPaletteManager: React.FunctionComponent<
  IEventPaletteManagerProps
> = (props) => {
  return <EventPalleteModule onRefresh={() => {}} />;
};

export default EventPaletteManager;
