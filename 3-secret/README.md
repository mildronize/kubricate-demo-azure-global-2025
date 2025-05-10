# 🔐 3. Managing Secrets with Kubricate

**Demo from: *“Type-Safe Infrastructure: Reimagining Kubernetes with Kubricate — Live on AKS”* (Azure Global 2025)**

This project demonstrates how to manage **secrets declaratively** with [Kubricate](https://github.com/thaitype/kubricate), using a backend-agnostic design.

Rather than hardcoding secrets or scattering them across environments, Kubricate lets you **declare what secrets your app needs**, then **configure how to fetch and inject them**.

## 🧠 Core Concepts

Kubricate separates the concern of **where secrets come from** and **where they go**:

### 🔌 **Connectors** – Where secrets come from

Connectors know how to fetch secrets.

```ts
new EnvConnector() // Reads from .env or process.env
```

### 🚚 **Providers** – Where secrets go

Providers know how to deliver secrets into the infrastructure.

```ts
new OpaqueSecretProvider() // Generates Kubernetes Secret YAML
```

### 🧰 **SecretManager** – The contract

The `SecretManager` ties Connectors and Providers together in a single place. You define which secrets your stack depends on.

```ts
.addSecret({ name: 'APP_SECRET' })
```

## 💡 useSecrets – Injecting into your stack

With `useSecrets`, you can map your declared secrets into the environment or files of your Kubernetes resources.

```ts
.useSecrets(secretManager, (c) => {
  c.secrets('APP_SECRET').forName('APP_KEY').inject();
  c.secrets('DATABASE_CONNECTION_STRING').forName('POSTGRES_CONNECTION_STRING').inject('env');
});
```

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Validate and Apply Secrets

```bash
npx kubricate secret validate
npx kubricate secret apply
```

This will fetch secrets using the configured connector and apply them using the provider.

### 3. Generate Kubernetes YAML

```bash
npx kubricate generate
```

### 4. Deploy to Kubernetes

```bash
npx kubricate generate --stdout | kubectl apply -f -
```

### 5. Restart Your App to Apply Secrets

```bash
kubectl rollout restart deployment my-app -n demo-azure-global
```

## 📁 File Overview

* `src/setup-secrets.ts` — defines `SecretManager`, connector, provider, and secrets
* `src/compose-stacks.ts` — configures the app stack and injects secrets via `useSecrets`
* `src/stacks/WebAppStack.ts` — defines the app Deployment and Service
* `kubricate.config.ts` — entry point that registers stacks for generation
* `output/` — contains generated YAML output

Kubricate lets you keep **infrastructure, secrets, and logic in sync** — securely, and without hardcoding anything 🔒