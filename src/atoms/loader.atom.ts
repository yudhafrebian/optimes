import { LookupResponseDto } from "@/api-client";
import { atomWithStorage } from "jotai/utils";

interface ILoader {
  id: string;
  isLoaded: boolean;
}

export interface ILoaderData {
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

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const toStringValue = (value: unknown): string =>
  typeof value === "string" ? value : "";

const toNumberValue = (value: unknown): number =>
  typeof value === "number" ? value : 0;

const normalizeLookup = (value: unknown): LookupResponseDto => {
  if (typeof value === "string") {
    return {
      ...EMPTY_LOOKUP,
      code: value,
      label: value,
    };
  }

  if (!isRecord(value)) {
    return EMPTY_LOOKUP;
  }

  return {
    id: typeof value.id === "number" ? value.id : 0,
    lookup_type: typeof value.lookup_type === "string" ? value.lookup_type : "",
    code: typeof value.code === "string" ? value.code : "",
    label: typeof value.label === "string" ? value.label : "",
    description:
      typeof value.description === "string" ? value.description : undefined,
    sort_order: typeof value.sort_order === "number" ? value.sort_order : undefined,
    is_active: typeof value.is_active === "boolean" ? value.is_active : false,
  };
};

export const INITIAL_LOADER_DATA: ILoaderData = {
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

export const normalizeLoaderData = (value: unknown): ILoaderData => {
  if (!isRecord(value)) {
    return INITIAL_LOADER_DATA;
  }

  return {
    id: toStringValue(value.id),
    work_center: normalizeLookup(value.work_center),
    work_order: toStringValue(value.work_order),
    sales_order: toStringValue(value.sales_order),
    quantity_order: toNumberValue(value.quantity_order),
    quantity_unit: normalizeLookup(value.quantity_unit),
    planned_start_time: toStringValue(value.planned_start_time),
    job_lifecycle_state: normalizeLookup(value.job_lifecycle_state),
    notes: toStringValue(value.notes),
  };
};
