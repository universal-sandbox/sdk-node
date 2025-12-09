# Universal Sandbox Node.js SDK

Node.js SDK for Universal Sandbox API.

## Installation

```bash
npm install universal-sandbox
```

## Usage

```typescript
import { SandboxClient } from 'universal-sandbox';

// Initialize client
const client = new SandboxClient({
  baseUrl: 'https://api.sandbox.ai-infra.org',
  token: 'your-token', // optional if auth is disabled
});

// Create a code interpreter sandbox
const sandbox = await client.createCodeInterpreter({
  provider: 'e2b',
  timeout_minutes: 10,
});

// Execute code
const result = await client.execute(sandbox.id, "print('Hello, World!')");
console.log(result.stdout);

// Delete sandbox
await client.deleteSandbox(sandbox.id);
```

## API Reference

### SandboxClient

- `createCodeInterpreter(options)` - Create a code interpreter sandbox
- `createBrowser(options)` - Create a browser sandbox
- `createAio(options)` - Create an all-in-one sandbox
- `getSandbox(sandboxId)` - Get sandbox by ID
- `listSandboxes()` - List all sandboxes
- `deleteSandbox(sandboxId)` - Delete a sandbox
- `execute(sandboxId, command, timeout)` - Execute command in sandbox
- `health()` - Check API health
- `getRegions()` - Get available regions
- `getLimits()` - Get resource limits

### CreateSandboxOptions

```typescript
interface CreateSandboxOptions {
  provider?: 'e2b' | 'volcengine' | 'aws';
  region?: string;
  timeout_minutes?: number;
  metadata?: Record<string, any>;
}
```
