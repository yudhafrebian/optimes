import { atom } from "jotai";
import { AccountResponseDto } from "@/api/generated/common-service";

export const authAtom = atom<AccountResponseDto | null>(null);

export const loggingOutAtom = atom<boolean>(false);