# LookupsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**lookupControllerActivate**](#lookupcontrolleractivate) | **PATCH** /api/lookups/{id}/activate | Activate or deactivate a lookup|
|[**lookupControllerCreate**](#lookupcontrollercreate) | **POST** /api/lookups | Create a new lookup|
|[**lookupControllerFindAll**](#lookupcontrollerfindall) | **GET** /api/lookups | List lookups|
|[**lookupControllerFindOne**](#lookupcontrollerfindone) | **GET** /api/lookups/{id} | Get lookup by id|
|[**lookupControllerUpdate**](#lookupcontrollerupdate) | **PUT** /api/lookups/{id} | Replace an existing lookup|

# **lookupControllerActivate**
> LookupResponseDto lookupControllerActivate(lookupControllerActivateRequest)


### Example

```typescript
import {
    LookupsApi,
    Configuration,
    LookupControllerActivateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new LookupsApi(configuration);

let id: string; //Lookup id (uuid) (default to undefined)
let lookupControllerActivateRequest: LookupControllerActivateRequest; //

const { status, data } = await apiInstance.lookupControllerActivate(
    id,
    lookupControllerActivateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lookupControllerActivateRequest** | **LookupControllerActivateRequest**|  | |
| **id** | [**string**] | Lookup id (uuid) | defaults to undefined|


### Return type

**LookupResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lookupControllerCreate**
> LookupResponseDto lookupControllerCreate(createLookupDto)


### Example

```typescript
import {
    LookupsApi,
    Configuration,
    CreateLookupDto
} from './api';

const configuration = new Configuration();
const apiInstance = new LookupsApi(configuration);

let createLookupDto: CreateLookupDto; //

const { status, data } = await apiInstance.lookupControllerCreate(
    createLookupDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createLookupDto** | **CreateLookupDto**|  | |


### Return type

**LookupResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lookupControllerFindAll**
> Array<LookupResponseDto> lookupControllerFindAll()


### Example

```typescript
import {
    LookupsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LookupsApi(configuration);

let type: string; //Filter by lookup_type (e.g. ACCOUNT_LIFECYCLE) (optional) (default to undefined)

const { status, data } = await apiInstance.lookupControllerFindAll(
    type
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **type** | [**string**] | Filter by lookup_type (e.g. ACCOUNT_LIFECYCLE) | (optional) defaults to undefined|


### Return type

**Array<LookupResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lookupControllerFindOne**
> LookupResponseDto lookupControllerFindOne()


### Example

```typescript
import {
    LookupsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LookupsApi(configuration);

let id: string; //Lookup id (uuid) (default to undefined)

const { status, data } = await apiInstance.lookupControllerFindOne(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Lookup id (uuid) | defaults to undefined|


### Return type

**LookupResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lookupControllerUpdate**
> LookupResponseDto lookupControllerUpdate(updateLookupDto)


### Example

```typescript
import {
    LookupsApi,
    Configuration,
    UpdateLookupDto
} from './api';

const configuration = new Configuration();
const apiInstance = new LookupsApi(configuration);

let id: string; //Lookup id (uuid) (default to undefined)
let updateLookupDto: UpdateLookupDto; //

const { status, data } = await apiInstance.lookupControllerUpdate(
    id,
    updateLookupDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateLookupDto** | **UpdateLookupDto**|  | |
| **id** | [**string**] | Lookup id (uuid) | defaults to undefined|


### Return type

**LookupResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

