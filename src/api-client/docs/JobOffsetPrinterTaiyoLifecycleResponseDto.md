# JobOffsetPrinterTaiyoLifecycleResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**work_order** | **string** |  | [default to undefined]
**sales_order** | **string** |  | [default to undefined]
**quantity_order** | **number** |  | [default to undefined]
**quantity_unit** | [**LookupResponseDto**](LookupResponseDto.md) | Populated lookup object for quantity_unit | [default to undefined]
**work_center** | [**LookupResponseDto**](LookupResponseDto.md) | Populated lookup object for work_center | [default to undefined]
**planned_start_time** | **string** |  | [default to undefined]
**release_date** | **string** |  | [optional] [default to undefined]
**due_date** | **string** |  | [optional] [default to undefined]
**job_priority** | [**LookupResponseDto**](LookupResponseDto.md) | Populated lookup object for job_priority | [default to undefined]
**job_lifecycle_state** | [**LookupResponseDto**](LookupResponseDto.md) | Populated lookup object for job_lifecycle_state | [default to undefined]
**notes** | **string** |  | [default to undefined]
**attribute** | **object** |  | [optional] [default to undefined]

## Example

```typescript
import { JobOffsetPrinterTaiyoLifecycleResponseDto } from './api';

const instance: JobOffsetPrinterTaiyoLifecycleResponseDto = {
    id,
    work_order,
    sales_order,
    quantity_order,
    quantity_unit,
    work_center,
    planned_start_time,
    release_date,
    due_date,
    job_priority,
    job_lifecycle_state,
    notes,
    attribute,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
