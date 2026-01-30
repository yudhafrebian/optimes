// src/lib/api.ts
import { Configuration, AccountsApi, LookupsApi } from '../api-client';

const apiConfig = new Configuration({
  basePath: 'http://192.168.68.99:2000', // Sesuaikan dengan URL Backend
  baseOptions:{
    withCredentials: true
  }
});

export const lookupApi = new LookupsApi(apiConfig);
export const accountsApi = new AccountsApi(apiConfig);