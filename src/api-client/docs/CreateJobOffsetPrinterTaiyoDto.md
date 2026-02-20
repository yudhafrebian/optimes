# CreateJobOffsetPrinterTaiyoDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**work_order** | **string** | Must be unique | [default to undefined]
**sales_order** | **string** |  | [default to undefined]
**quantity_order** | **number** |  | [optional] [default to 1]
**quantity_unit** | **number** | Lookup id for QUANTITY_UNIT (BK, EA) | [default to undefined]
**work_center** | **number** | Lookup id for WORK_CENTER (MACHINE_A, MACHINE_B) | [default to undefined]
**planned_start_time** | **string** |  | [default to undefined]
**release_date** | **string** |  | [optional] [default to undefined]
**due_date** | **string** |  | [optional] [default to undefined]
**job_priority** | **number** | Lookup id for JOB_PRIORITY (HIGH, MEDIUM, LOW) | [default to undefined]
**notes** | **string** |  | [optional] [default to '-']
**attribute** | **object** |  | [optional] [default to undefined]

## Example

```typescript
import { CreateJobOffsetPrinterTaiyoDto } from './api';

const instance: CreateJobOffsetPrinterTaiyoDto = {
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
