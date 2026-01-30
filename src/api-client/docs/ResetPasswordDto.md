# ResetPasswordDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**newPassword** | **string** | Password complexity: min 12 chars, upper/lower/number/symbol. Regex: ^(?&#x3D;.*[a-z])(?&#x3D;.*[A-Z])(?&#x3D;.*d)(?&#x3D;.*[@$!%*?&amp;#^()_+-&#x3D;[]{}|;:,.&lt;&gt;])[A-Za-zd@$!%*?&amp;#^()_+-&#x3D;[]{}|;:,.&lt;&gt;]{12,}$ | [default to undefined]

## Example

```typescript
import { ResetPasswordDto } from './api';

const instance: ResetPasswordDto = {
    newPassword,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
