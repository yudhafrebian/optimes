# JobOffsetPrinterTaiyoApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**jobOffsetPrinterTaiyoControllerBatchCreate**](#joboffsetprintertaiyocontrollerbatchcreate) | **POST** /api/jobs/offset-printer-taiyo/batch-create | Batch create jobs from reviewed JSON array|
|[**jobOffsetPrinterTaiyoControllerClose**](#joboffsetprintertaiyocontrollerclose) | **PATCH** /api/jobs/offset-printer-taiyo/{id}/close | Close job|
|[**jobOffsetPrinterTaiyoControllerComplete**](#joboffsetprintertaiyocontrollercomplete) | **PATCH** /api/jobs/offset-printer-taiyo/{id}/complete | Complete job|
|[**jobOffsetPrinterTaiyoControllerCreate**](#joboffsetprintertaiyocontrollercreate) | **POST** /api/jobs/offset-printer-taiyo | Create job|
|[**jobOffsetPrinterTaiyoControllerDownloadExcelTemplate**](#joboffsetprintertaiyocontrollerdownloadexceltemplate) | **GET** /api/jobs/offset-printer-taiyo/excel/template | Download excel template for job import|
|[**jobOffsetPrinterTaiyoControllerGetAll**](#joboffsetprintertaiyocontrollergetall) | **GET** /api/jobs/offset-printer-taiyo | Get all jobs|
|[**jobOffsetPrinterTaiyoControllerGetById**](#joboffsetprintertaiyocontrollergetbyid) | **GET** /api/jobs/offset-printer-taiyo/{id} | Get job by id|
|[**jobOffsetPrinterTaiyoControllerGetDashboard**](#joboffsetprintertaiyocontrollergetdashboard) | **GET** /api/jobs/offset-printer-taiyo/dashboard | Job dashboard summary|
|[**jobOffsetPrinterTaiyoControllerRelease**](#joboffsetprintertaiyocontrollerrelease) | **PATCH** /api/jobs/offset-printer-taiyo/{id}/release | Release job|
|[**jobOffsetPrinterTaiyoControllerRemove**](#joboffsetprintertaiyocontrollerremove) | **DELETE** /api/jobs/offset-printer-taiyo/{id} | Delete job|
|[**jobOffsetPrinterTaiyoControllerRun**](#joboffsetprintertaiyocontrollerrun) | **PATCH** /api/jobs/offset-printer-taiyo/{id}/run | Run job|
|[**jobOffsetPrinterTaiyoControllerSuspend**](#joboffsetprintertaiyocontrollersuspend) | **PATCH** /api/jobs/offset-printer-taiyo/{id}/suspend | Suspend job|
|[**jobOffsetPrinterTaiyoControllerUpdate**](#joboffsetprintertaiyocontrollerupdate) | **PUT** /api/jobs/offset-printer-taiyo/{id} | Edit job|
|[**jobOffsetPrinterTaiyoControllerUploadExcelPreview**](#joboffsetprintertaiyocontrolleruploadexcelpreview) | **POST** /api/jobs/offset-printer-taiyo/excel/upload-preview | Upload excel (.xlsx/.xls) and preview valid jobs + row errors|

# **jobOffsetPrinterTaiyoControllerBatchCreate**
> JobOffsetPrinterTaiyoBatchCreateResponseDto jobOffsetPrinterTaiyoControllerBatchCreate(requestBody)


### Example

```typescript
import {
    JobOffsetPrinterTaiyoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobOffsetPrinterTaiyoApi(configuration);

let requestBody: Array<object>; //

const { status, data } = await apiInstance.jobOffsetPrinterTaiyoControllerBatchCreate(
    requestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestBody** | **Array<object>**|  | |


### Return type

**JobOffsetPrinterTaiyoBatchCreateResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | JSON array is invalid |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **jobOffsetPrinterTaiyoControllerClose**
> JobOffsetPrinterTaiyoLifecycleResponseDto jobOffsetPrinterTaiyoControllerClose()

Allowed transition: RELEASED/COMPLETED -> CLOSED

### Example

```typescript
import {
    JobOffsetPrinterTaiyoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobOffsetPrinterTaiyoApi(configuration);

let id: string; //Job ID (UUID) (default to undefined)

const { status, data } = await apiInstance.jobOffsetPrinterTaiyoControllerClose(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Job ID (UUID) | defaults to undefined|


### Return type

**JobOffsetPrinterTaiyoLifecycleResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Invalid UUID format |  -  |
|**403** | Transition not allowed |  -  |
|**404** | Job not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **jobOffsetPrinterTaiyoControllerComplete**
> JobOffsetPrinterTaiyoLifecycleResponseDto jobOffsetPrinterTaiyoControllerComplete()

Allowed transition: RUNNING/SUSPENDED -> COMPLETED

### Example

```typescript
import {
    JobOffsetPrinterTaiyoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobOffsetPrinterTaiyoApi(configuration);

let id: string; //Job ID (UUID) (default to undefined)

const { status, data } = await apiInstance.jobOffsetPrinterTaiyoControllerComplete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Job ID (UUID) | defaults to undefined|


### Return type

**JobOffsetPrinterTaiyoLifecycleResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Invalid UUID format |  -  |
|**403** | Transition not allowed |  -  |
|**404** | Job not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **jobOffsetPrinterTaiyoControllerCreate**
> JobOffsetPrinterTaiyoCreateResponseDto jobOffsetPrinterTaiyoControllerCreate(createJobOffsetPrinterTaiyoDto)

Business rules: work_order must be unique; planned_start_time cannot be the same if work_center is the same. Initial lifecycle is always SCHEDULED.

### Example

```typescript
import {
    JobOffsetPrinterTaiyoApi,
    Configuration,
    CreateJobOffsetPrinterTaiyoDto
} from './api';

const configuration = new Configuration();
const apiInstance = new JobOffsetPrinterTaiyoApi(configuration);

let createJobOffsetPrinterTaiyoDto: CreateJobOffsetPrinterTaiyoDto; //

const { status, data } = await apiInstance.jobOffsetPrinterTaiyoControllerCreate(
    createJobOffsetPrinterTaiyoDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createJobOffsetPrinterTaiyoDto** | **CreateJobOffsetPrinterTaiyoDto**|  | |


### Return type

**JobOffsetPrinterTaiyoCreateResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |
|**400** | Validation failed |  -  |
|**409** | work_order duplicate or schedule conflict |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **jobOffsetPrinterTaiyoControllerDownloadExcelTemplate**
> jobOffsetPrinterTaiyoControllerDownloadExcelTemplate()


### Example

```typescript
import {
    JobOffsetPrinterTaiyoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobOffsetPrinterTaiyoApi(configuration);

const { status, data } = await apiInstance.jobOffsetPrinterTaiyoControllerDownloadExcelTemplate();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **jobOffsetPrinterTaiyoControllerGetAll**
> Array<JobOffsetPrinterTaiyoListResponseDto> jobOffsetPrinterTaiyoControllerGetAll()


### Example

```typescript
import {
    JobOffsetPrinterTaiyoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobOffsetPrinterTaiyoApi(configuration);

const { status, data } = await apiInstance.jobOffsetPrinterTaiyoControllerGetAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<JobOffsetPrinterTaiyoListResponseDto>**

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

# **jobOffsetPrinterTaiyoControllerGetById**
> JobOffsetPrinterTaiyoGetResponseDto jobOffsetPrinterTaiyoControllerGetById()


### Example

```typescript
import {
    JobOffsetPrinterTaiyoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobOffsetPrinterTaiyoApi(configuration);

let id: string; //Job ID (UUID) (default to undefined)

const { status, data } = await apiInstance.jobOffsetPrinterTaiyoControllerGetById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Job ID (UUID) | defaults to undefined|


### Return type

**JobOffsetPrinterTaiyoGetResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Invalid UUID format |  -  |
|**404** | Job not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **jobOffsetPrinterTaiyoControllerGetDashboard**
> JobOffsetPrinterTaiyoDashboardResponseDto jobOffsetPrinterTaiyoControllerGetDashboard()


### Example

```typescript
import {
    JobOffsetPrinterTaiyoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobOffsetPrinterTaiyoApi(configuration);

const { status, data } = await apiInstance.jobOffsetPrinterTaiyoControllerGetDashboard();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**JobOffsetPrinterTaiyoDashboardResponseDto**

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

# **jobOffsetPrinterTaiyoControllerRelease**
> JobOffsetPrinterTaiyoLifecycleResponseDto jobOffsetPrinterTaiyoControllerRelease()

Allowed transition: SCHEDULED -> RELEASED

### Example

```typescript
import {
    JobOffsetPrinterTaiyoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobOffsetPrinterTaiyoApi(configuration);

let id: string; //Job ID (UUID) (default to undefined)

const { status, data } = await apiInstance.jobOffsetPrinterTaiyoControllerRelease(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Job ID (UUID) | defaults to undefined|


### Return type

**JobOffsetPrinterTaiyoLifecycleResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Invalid UUID format |  -  |
|**403** | Transition not allowed |  -  |
|**404** | Job not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **jobOffsetPrinterTaiyoControllerRemove**
> JobOffsetPrinterTaiyoDeleteResponseDto jobOffsetPrinterTaiyoControllerRemove()

Delete is allowed only when job status is SCHEDULED.

### Example

```typescript
import {
    JobOffsetPrinterTaiyoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobOffsetPrinterTaiyoApi(configuration);

let id: string; //Job ID (UUID) (default to undefined)

const { status, data } = await apiInstance.jobOffsetPrinterTaiyoControllerRemove(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Job ID (UUID) | defaults to undefined|


### Return type

**JobOffsetPrinterTaiyoDeleteResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Invalid UUID format |  -  |
|**403** | Job is not SCHEDULED |  -  |
|**404** | Job not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **jobOffsetPrinterTaiyoControllerRun**
> JobOffsetPrinterTaiyoLifecycleResponseDto jobOffsetPrinterTaiyoControllerRun()

Allowed transition: RELEASED -> RUNNING

### Example

```typescript
import {
    JobOffsetPrinterTaiyoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobOffsetPrinterTaiyoApi(configuration);

let id: string; //Job ID (UUID) (default to undefined)

const { status, data } = await apiInstance.jobOffsetPrinterTaiyoControllerRun(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Job ID (UUID) | defaults to undefined|


### Return type

**JobOffsetPrinterTaiyoLifecycleResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Invalid UUID format |  -  |
|**403** | Transition not allowed |  -  |
|**404** | Job not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **jobOffsetPrinterTaiyoControllerSuspend**
> JobOffsetPrinterTaiyoLifecycleResponseDto jobOffsetPrinterTaiyoControllerSuspend()

Allowed transition: RELEASED/RUNNING -> SUSPENDED

### Example

```typescript
import {
    JobOffsetPrinterTaiyoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobOffsetPrinterTaiyoApi(configuration);

let id: string; //Job ID (UUID) (default to undefined)

const { status, data } = await apiInstance.jobOffsetPrinterTaiyoControllerSuspend(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Job ID (UUID) | defaults to undefined|


### Return type

**JobOffsetPrinterTaiyoLifecycleResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Invalid UUID format |  -  |
|**403** | Transition not allowed |  -  |
|**404** | Job not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **jobOffsetPrinterTaiyoControllerUpdate**
> JobOffsetPrinterTaiyoUpdateResponseDto jobOffsetPrinterTaiyoControllerUpdate(updateJobOffsetPrinterTaiyoDto)

Edit is allowed only when job status is SCHEDULED.

### Example

```typescript
import {
    JobOffsetPrinterTaiyoApi,
    Configuration,
    UpdateJobOffsetPrinterTaiyoDto
} from './api';

const configuration = new Configuration();
const apiInstance = new JobOffsetPrinterTaiyoApi(configuration);

let id: string; //Job ID (UUID) (default to undefined)
let updateJobOffsetPrinterTaiyoDto: UpdateJobOffsetPrinterTaiyoDto; //

const { status, data } = await apiInstance.jobOffsetPrinterTaiyoControllerUpdate(
    id,
    updateJobOffsetPrinterTaiyoDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateJobOffsetPrinterTaiyoDto** | **UpdateJobOffsetPrinterTaiyoDto**|  | |
| **id** | [**string**] | Job ID (UUID) | defaults to undefined|


### Return type

**JobOffsetPrinterTaiyoUpdateResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Validation failed or invalid UUID |  -  |
|**403** | Job is not SCHEDULED |  -  |
|**404** | Job not found |  -  |
|**409** | work_order duplicate or schedule conflict |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **jobOffsetPrinterTaiyoControllerUploadExcelPreview**
> JobOffsetPrinterTaiyoUploadPreviewResponseDto jobOffsetPrinterTaiyoControllerUploadExcelPreview()


### Example

```typescript
import {
    JobOffsetPrinterTaiyoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobOffsetPrinterTaiyoApi(configuration);

let file: File; // (default to undefined)

const { status, data } = await apiInstance.jobOffsetPrinterTaiyoControllerUploadExcelPreview(
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**File**] |  | defaults to undefined|


### Return type

**JobOffsetPrinterTaiyoUploadPreviewResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Invalid file or invalid rows |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

