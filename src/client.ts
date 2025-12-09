import {
  Sandbox,
  ExecutionResult,
  CreateSandboxOptions,
  SandboxClientOptions,
  HealthResponse,
  DeleteResponse,
  LimitsResponse,
  RegionsResponse,
} from './types';

export class SandboxClient {
  private baseUrl: string;
  private token?: string;
  private timeout: number;

  constructor(options: SandboxClientOptions = {}) {
    this.baseUrl = (options.baseUrl || 'https://api.sandbox.ai-infra.org').replace(/\/$/, '');
    this.token = options.token;
    this.timeout = options.timeout || 30000;
  }

  private headers(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: any
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const options: RequestInit = {
      method,
      headers: this.headers(),
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    options.signal = controller.signal;

    try {
      const response = await fetch(url, options);
      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP ${response.status}: ${error}`);
      }

      return response.json();
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  async health(): Promise<HealthResponse> {
    return this.request<HealthResponse>('GET', '/health');
  }

  async createCodeInterpreter(options: CreateSandboxOptions = {}): Promise<Sandbox> {
    return this.createSandbox('code-interpreter', options);
  }

  async createBrowser(options: CreateSandboxOptions = {}): Promise<Sandbox> {
    return this.createSandbox('browser', options);
  }

  async createAio(options: CreateSandboxOptions = {}): Promise<Sandbox> {
    return this.createSandbox('aio', options);
  }

  private async createSandbox(
    type: string,
    options: CreateSandboxOptions
  ): Promise<Sandbox> {
    return this.request<Sandbox>('POST', `/sandboxes/${type}`, options);
  }

  async getSandbox(sandboxId: string): Promise<Sandbox> {
    return this.request<Sandbox>('GET', `/sandboxes/${sandboxId}`);
  }

  async listSandboxes(): Promise<Sandbox[]> {
    const response = await this.request<{ sandboxes: Sandbox[] }>('GET', '/sandboxes');
    return response.sandboxes;
  }

  async deleteSandbox(sandboxId: string): Promise<boolean> {
    const response = await this.request<DeleteResponse>('DELETE', `/sandboxes/${sandboxId}`);
    return response.success;
  }

  async execute(
    sandboxId: string,
    command: string,
    timeout?: number
  ): Promise<ExecutionResult> {
    const body: { command: string; timeout?: number } = { command };
    if (timeout) {
      body.timeout = timeout;
    }
    return this.request<ExecutionResult>('POST', `/sandboxes/${sandboxId}/execute`, body);
  }

  async getRegions(): Promise<Record<string, Record<string, any>>> {
    const response = await this.request<RegionsResponse>('GET', '/regions');
    return response.regions;
  }

  async getLimits(): Promise<LimitsResponse> {
    return this.request<LimitsResponse>('GET', '/limits');
  }
}
