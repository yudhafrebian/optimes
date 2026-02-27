// src/lib/api.ts
import { getKufayekaRuntimeAPI } from "@/api/generated/assets-service";
import { getOptimesNESTAPI } from "@/api/generated/common-service";
import { AXIOS_INSTANCE_1 } from "@/api/mutator";

const generatedApi = getOptimesNESTAPI();

export const commonApi = {
  ...generatedApi,
  jobOffsetPrinterTaiyoControllerDownloadExcelTemplate: () =>
    AXIOS_INSTANCE_1.get<Blob>(
      "/api/jobs/offset-printer-taiyo/excel/template",
      { responseType: "blob" },
    ),
};

export const assetsApi = getKufayekaRuntimeAPI();