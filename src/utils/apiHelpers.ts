// src/utils/apiHelpers.ts

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface ApiOptions extends AxiosRequestConfig {
  authToken?: string;
  isInternal?: boolean; // if calling /api/ internal routes
}

/**
 * Get Authorization Header
 */
const getAuthHeader = (token?: string) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Handle API Response
 */
const handleResponse = async <T>(promise: Promise<AxiosResponse<T>>) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error: any) {
    console.error("[API ERROR]", error?.response || error);
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

/**
 * GET Request
 */
export const apiGet = <T = any>(
  endpoint: string,
  options?: ApiOptions
): Promise<T> => {
  const url = options?.isInternal ? endpoint : `${BASE_URL}${endpoint}`;
  return handleResponse(
    axios.get<T>(url, {
      ...options,
      headers: {
        ...(options?.headers || {}),
        ...getAuthHeader(options?.authToken),
      },
    })
  );
};

/**
 * POST Request
 */
export const apiPost = <T = any>(
  endpoint: string,
  data: any = {},
  options?: ApiOptions
): Promise<T> => {
  const url = options?.isInternal ? endpoint : `${BASE_URL}${endpoint}`;
  return handleResponse(
    axios.post<T>(url, data, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
        ...getAuthHeader(options?.authToken),
      },
    })
  );
};

/**
 * PUT Request
 */
export const apiPut = <T = any>(
  endpoint: string,
  data: any = {},
  options?: ApiOptions
): Promise<T> => {
  const url = options?.isInternal ? endpoint : `${BASE_URL}${endpoint}`;
  return handleResponse(
    axios.put<T>(url, data, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
        ...getAuthHeader(options?.authToken),
      },
    })
  );
};

/**
 * DELETE Request
 */
export const apiDelete = <T = any>(
  endpoint: string,
  options?: ApiOptions
): Promise<T> => {
  const url = options?.isInternal ? endpoint : `${BASE_URL}${endpoint}`;
  return handleResponse(
    axios.delete<T>(url, {
      ...options,
      headers: {
        ...(options?.headers || {}),
        ...getAuthHeader(options?.authToken),
      },
    })
  );
};
