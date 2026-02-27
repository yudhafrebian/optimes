import { LookupResponseDto } from "@/api-client";
import { atomWithStorage } from "jotai/utils";

interface ILoader {
  id: string;
  isLoaded: boolean;
}

interface ILoaderData {
  id: string;
  work_center: LookupResponseDto;
  work_order: string;
  sales_order: string;
  quantity_order: number;
  quantity_unit: LookupResponseDto; 
  planned_start_time: string;
  job_lifecycle_state: LookupResponseDto;
  notes: string;
}

const EMPTY_LOOKUP: LookupResponseDto = {
  id: 0,
  lookup_type: "",
  code: "",
  label: "",
  is_active: false,
};

const INITIAL_LOADER: ILoader = {
  id: "",
  isLoaded: false,
};

const INITIAL_LOADER_DATA: ILoaderData = {
  id: "",
  work_center: EMPTY_LOOKUP,
  work_order: "",
  sales_order: "",
  quantity_order: 0,
  quantity_unit: EMPTY_LOOKUP,
  planned_start_time: "",
  job_lifecycle_state: EMPTY_LOOKUP,
  notes: "",
};

export const loaderAtom = atomWithStorage<ILoader>(
  "operator-loader",
  INITIAL_LOADER,
);

export const loadedDataAtom = atomWithStorage<ILoaderData>(
  "operator-loader-data",
  INITIAL_LOADER_DATA,
);
