# Universal Sandbox Node.js SDK

Node.js SDK for Universal Sandbox API.

📖 **[API Documentation](https://api.sandbox.ai-infra.org/docs)**

## Installation

```bash
npm install @universal-sandbox/sdk
```

## Usage

```typescript
import { SandboxClient } from '@universal-sandbox/sdk';

// Initialize client
const client = new SandboxClient({
  baseUrl: 'https://api.sandbox.ai-infra.org',
  token: 'your-token', // optional if auth is disabled
});

// Create a code interpreter sandbox
const sandbox = await client.codeInterpreter.create({
  provider: 'e2b',
  timeout_minutes: 10,
});

// Execute code
const result = await client.sandboxes.execute(sandbox.id, { command: "print('Hello, World!')" });
console.log(result.stdout);

// Get sandbox info
const info = await client.sandboxes.get(sandbox.id);
console.log(info.status);

// List all sandboxes
const list = await client.sandboxes.list();
console.log(list.total);

// Delete sandbox
await client.sandboxes.delete(sandbox.id);
```

## API to SDK Mapping

| API Endpoint | SDK Interface |
|-------------|---------------|
| `GET /health` | `client.checkHealth()` |
| `GET /regions` | `client.listRegions()` |
| `GET /limits` | `client.getLimits()` |
| `POST /sandboxes/code-interpreter` | `client.codeInterpreter.create(request)` |
| `POST /sandboxes/browser` | `client.browser.create(request)` |
| `POST /sandboxes/aio` | `client.aio.create(request)` |
| `GET /sandboxes` | `client.sandboxes.list()` |
| `GET /sandboxes/{id}` | `client.sandboxes.get(sandboxId)` |
| `DELETE /sandboxes/{id}` | `client.sandboxes.delete(sandboxId)` |
| `POST /sandboxes/{id}/execute` | `client.sandboxes.execute(sandboxId, request)` |
| `POST /sandboxes/code-interpreter/{id}/execute` | `client.codeInterpreter.execute(sandboxId, request)` |

**Note**: AIO sandboxes only support `provider: "volcengine"`

## API Reference

### Root Methods

- `client.checkHealth()` - Check API health status
- `client.listRegions()` - List available regions for all providers
- `client.getLimits()` - Get resource limits and current usage

### Sandbox Creation

- `client.codeInterpreter.create(request)` - Create code interpreter sandbox
- `client.browser.create(request)` - Create browser sandbox
- `client.aio.create(request)` - Create all-in-one sandbox (Volcengine only)

### Sandbox Management

- `client.sandboxes.list()` - List all sandboxes
- `client.sandboxes.get(sandboxId)` - Get sandbox by ID
- `client.sandboxes.delete(sandboxId)` - Delete a sandbox
- `client.sandboxes.execute(sandboxId, request)` - Execute command (code_interpreter/aio only)
- `client.codeInterpreter.execute(sandboxId, request)` - Execute command (alias)

**Important**: Browser sandboxes cannot execute commands

### CreateSandboxRequest

```typescript
interface CreateSandboxRequest {
  provider?: 'e2b' | 'volcengine' | 'aws';
  region?: string;
  timeout_minutes?: number;
  metadata?: Record<string, any>;
}
```

### ExecuteRequest

```typescript
interface ExecuteRequest {
  command: string;
  timeout?: number;
}
```
