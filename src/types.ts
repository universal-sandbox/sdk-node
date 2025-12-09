export interface SandboxUrls {
  wss_url?: string;
  vnc_url?: string;
  mcp_url?: string;
  api_url?: string;
}

export interface Sandbox {
  id: string;
  type: string;
  provider: string;
  status: string;
  created_at: string;
  region?: string;
  expires_at?: string;
  urls?: SandboxUrls;
  timeout?: number;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exit_code: number;
  error?: string;
}

export interface CreateSandboxOptions {
  provider?: 'e2b' | 'volcengine' | 'aws';
  region?: string;
  timeout_minutes?: number;
  metadata?: Record<string, any>;
}

export interface SandboxClientOptions {
  baseUrl?: string;
  token?: string;
  timeout?: number;
}

export interface HealthResponse {
  is_healthy: boolean;
  status: string;
  details: Record<string, any>;
  checked_at: string;
}

export interface SandboxListResponse {
  sandboxes: Sandbox[];
  total: number;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
  sandbox_id: string;
}

export interface LimitsResponse {
  limits: Record<string, number>;
  current_usage: Record<string, number>;
  timestamp: string;
}

export interface RegionsResponse {
  regions: Record<string, Record<string, any>>;
}
