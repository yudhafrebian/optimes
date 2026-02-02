# CreateAccountDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**username** | **string** | Username rules: unique, lowercase, alphanumeric + underscore, length 4–20, regex ^[a-z][a-z0-9_]{3,19}$ | [default to undefined]
**full_name** | **string** |  | [default to undefined]
**phone_number** | **string** |  | [optional] [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**attribute** | **object** |  | [optional] [default to undefined]
**account_type** | **number** | Lookup id for account_type (int). If WITH_EXPIRATION, account_expiry_date is required. | [default to undefined]
**account_role** | **number** | Lookup id for account_role (int) | [default to undefined]
**account_expiry_date** | **string** | Required if account_type is WITH_EXPIRATION. Must be null for PERMANENT. | [optional] [default to undefined]
**password_expiry_time** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { CreateAccountDto } from './api';

const instance: CreateAccountDto = {
    username,
    full_name,
    phone_number,
    email,
    attribute,
    account_type,
    account_role,
    account_expiry_date,
    password_expiry_time,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
