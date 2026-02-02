# AccountChangePasswordResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**username** | **string** |  | [default to undefined]
**full_name** | **string** |  | [default to undefined]
**phone_number** | **string** |  | [optional] [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**attribute** | **object** |  | [optional] [default to undefined]
**account_lifecycle** | [**LookupResponseDto**](LookupResponseDto.md) | Populated lookup object for account_lifecycle | [default to undefined]
**account_type** | [**LookupResponseDto**](LookupResponseDto.md) | Populated lookup object for account_type | [default to undefined]
**account_role** | [**LookupResponseDto**](LookupResponseDto.md) | Populated lookup object for account_role | [optional] [default to undefined]
**account_expiry_date** | **string** |  | [optional] [default to undefined]
**password_last_changed** | **string** |  | [optional] [default to undefined]
**password_expiry_time** | **string** |  | [optional] [default to undefined]
**must_change_password** | **boolean** |  | [default to undefined]
**last_login_time** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { AccountChangePasswordResponseDto } from './api';

const instance: AccountChangePasswordResponseDto = {
    id,
    username,
    full_name,
    phone_number,
    email,
    attribute,
    account_lifecycle,
    account_type,
    account_role,
    account_expiry_date,
    password_last_changed,
    password_expiry_time,
    must_change_password,
    last_login_time,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
