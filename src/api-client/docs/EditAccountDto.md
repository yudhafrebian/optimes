# EditAccountDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**username** | **string** | Username rules: unique, lowercase, alphanumeric + underscore, length 4–20, regex ^[a-z][a-z0-9_]{3,19}$ | [optional] [default to undefined]
**full_name** | **string** |  | [optional] [default to undefined]
**phone_number** | **string** |  | [optional] [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**attribute** | **object** |  | [optional] [default to undefined]

## Example

```typescript
import { EditAccountDto } from './api';

const instance: EditAccountDto = {
    username,
    full_name,
    phone_number,
    email,
    attribute,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
