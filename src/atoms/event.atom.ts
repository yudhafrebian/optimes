import { atom } from "jotai";

interface IEvent {
  name: "Production" | "Setup" | "Idle" | null;
  bgColor: string;
  subColor: string;
}

export const getEventBgColor = (name: IEvent["name"]) => {
  if (name === "Production") return "success.light";
  if (name === "Setup") return "primary.light";
  if (name === "Idle") return "warning.light";
  return "";
};

export const getEventSubColor = (name: IEvent["name"]) => {
  if (name === "Production") return "success.main";
  if (name === "Setup") return "primary.main";
  if (name === "Idle") return "warning.main";
  return "";
}


export const eventAtom = atom<IEvent>({
  name: null,
  bgColor: getEventBgColor(null),
  subColor: getEventSubColor(null),
});
