
import { atom } from "jotai";
import { UserRole } from "@/interface/user.interface";

export type AuthUser = {
  id: number;
  username: string;
  role: UserRole;
};

export const authAtom = atom<AuthUser | null>(null);
