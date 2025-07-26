// src/types/backend.d.ts

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any';
  required: boolean;
  description?: string;
  defaultValue?: any;
}

export interface ApiSchema {
  // Simplified JSON Schema shape for requests/responses
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'any';
  properties?: Record<string, ApiParameter>;
  required?: string[];
  items?: ApiSchema; // for arrays
  description?: string;
  example?: any;
}

export interface ApiEndpoint {
  id: string;
  name: string;
  method: HttpMethod;
  route: string;                     // e.g., "/users/login"
  description?: string;
  authRequired: boolean;
  requestSchema?: ApiSchema;         // shape of expected request body/query
  responseSchema?: ApiSchema;        // shape of response body
  headers?: Record<string, string>;  // optional headers to send/expect
}

export interface BackendFlow {
  id: string;
  name: string;
  description?: string;
  createdBy: string;                 // user ID who created this flow
  endpoints: ApiEndpoint[];
  triggers: string[];                // e.g., ["manual", "webhook", "scheduled"]
  createdAt: string;                 // ISO timestamp
  updatedAt: string;                 // ISO timestamp
}
