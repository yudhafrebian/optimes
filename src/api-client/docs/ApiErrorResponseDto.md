# ApiErrorResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**statusCode** | **number** |  | [default to undefined]
**error** | **string** |  | [default to undefined]
**message** | **object** |  | [default to undefined]
**details** | [**Array&lt;ApiErrorDetailDto&gt;**](ApiErrorDetailDto.md) |  | [optional] [default to undefined]
**path** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ApiErrorResponseDto } from './api';

const instance: ApiErrorResponseDto = {
    statusCode,
    error,
    message,
    details,
    path,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
