# PostsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**appControllerCreateDraft**](#appcontrollercreatedraft) | **POST** /api/post | |
|[**appControllerDeletePost**](#appcontrollerdeletepost) | **DELETE** /api/post/{id} | |
|[**appControllerGetAllUsers**](#appcontrollergetallusers) | **GET** /api/users | |
|[**appControllerGetDraftsByUser**](#appcontrollergetdraftsbyuser) | **GET** /api/user/{id}/drafts | |
|[**appControllerGetFilteredPosts**](#appcontrollergetfilteredposts) | **GET** /api/feed | |
|[**appControllerGetPostById**](#appcontrollergetpostbyid) | **GET** /api/post/{id} | |
|[**appControllerIncrementPostViewCount**](#appcontrollerincrementpostviewcount) | **PUT** /api/post/{id}/views | |
|[**appControllerSignupUser**](#appcontrollersignupuser) | **POST** /api/signup | |
|[**appControllerTogglePublishPost**](#appcontrollertogglepublishpost) | **PUT** /api/publish/{id} | |

# **appControllerCreateDraft**
> PostDto appControllerCreateDraft()


### Example

```typescript
import {
    PostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PostsApi(configuration);

const { status, data } = await apiInstance.appControllerCreateDraft();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**PostDto**

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

# **appControllerDeletePost**
> PostDto appControllerDeletePost()


### Example

```typescript
import {
    PostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PostsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.appControllerDeletePost(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**PostDto**

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

# **appControllerGetAllUsers**
> Array<UserDto> appControllerGetAllUsers()


### Example

```typescript
import {
    PostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PostsApi(configuration);

const { status, data } = await apiInstance.appControllerGetAllUsers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<UserDto>**

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

# **appControllerGetDraftsByUser**
> Array<PostDto> appControllerGetDraftsByUser()


### Example

```typescript
import {
    PostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PostsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.appControllerGetDraftsByUser(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Array<PostDto>**

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

# **appControllerGetFilteredPosts**
> appControllerGetFilteredPosts()


### Example

```typescript
import {
    PostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PostsApi(configuration);

let take: number; // (default to undefined)
let skip: number; // (default to undefined)
let searchString: string; // (default to undefined)
let orderBy: string; // (default to undefined)

const { status, data } = await apiInstance.appControllerGetFilteredPosts(
    take,
    skip,
    searchString,
    orderBy
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **take** | [**number**] |  | defaults to undefined|
| **skip** | [**number**] |  | defaults to undefined|
| **searchString** | [**string**] |  | defaults to undefined|
| **orderBy** | [**string**] |  | defaults to undefined|


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

# **appControllerGetPostById**
> PostDto appControllerGetPostById()


### Example

```typescript
import {
    PostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PostsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.appControllerGetPostById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**PostDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**404** | Post not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **appControllerIncrementPostViewCount**
> PostDto appControllerIncrementPostViewCount()


### Example

```typescript
import {
    PostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PostsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.appControllerIncrementPostViewCount(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**PostDto**

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

# **appControllerSignupUser**
> UserDto appControllerSignupUser()


### Example

```typescript
import {
    PostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PostsApi(configuration);

const { status, data } = await apiInstance.appControllerSignupUser();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserDto**

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

# **appControllerTogglePublishPost**
> PostDto appControllerTogglePublishPost()


### Example

```typescript
import {
    PostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PostsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.appControllerTogglePublishPost(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**PostDto**

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

