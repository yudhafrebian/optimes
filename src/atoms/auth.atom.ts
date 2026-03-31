import { atom } from "jotai";
import { AccountResponseDto } from "@/api/generated/common-service";
import { atomWithStorage } from "jotai/utils";

export const authAtom = atomWithStorage<AccountResponseDto | null>("auth",null);

export const loggingOutAtom = atom<boolean>(false);