import { atom } from "jotai";
import { AccountResponseDto } from "@/api-client";

export const authAtom = atom<AccountResponseDto | null>(null);