import { atom } from "jotai";
import { IUser } from "@/interface/user.interface";

export const authAtom = atom<IUser | null>(null);