# UpdateJobOffsetPrinterTaiyoDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**work_order** | **string** |  | [optional] [default to undefined]
**sales_order** | **string** |  | [optional] [default to undefined]
**quantity_order** | **number** |  | [optional] [default to undefined]
**quantity_unit** | **number** | Lookup id for QUANTITY_UNIT (BK, EA) | [optional] [default to undefined]
**work_center** | **number** | Lookup id for WORK_CENTER (MACHINE_A, MACHINE_B) | [optional] [default to undefined]
**planned_start_time** | **string** |  | [optional] [default to undefined]
**release_date** | **string** |  | [optional] [default to undefined]
**due_date** | **string** |  | [optional] [default to undefined]
**job_priority** | **number** | Lookup id for JOB_PRIORITY (HIGH, MEDIUM, LOW) | [optional] [default to undefined]
**notes** | **string** |  | [optional] [default to undefined]
**attribute** | **object** |  | [optional] [default to undefined]

## Example

```typescript
import { UpdateJobOffsetPrinterTaiyoDto } from './api';

const instance: UpdateJobOffsetPrinterTaiyoDto = {
    work_order,
    sales_order,
    quantity_order,
    quantity_unit,
    work_center,
    planned_start_time,
    release_date,
    due_date,
    job_priority,
    notes,
    attribute,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
