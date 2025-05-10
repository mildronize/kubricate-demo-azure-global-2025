# 🧱 2. Kubricate with Custom Stacks

**Demo from: *“Type-Safe Infrastructure: Reimagining Kubernetes with Kubricate — Live on AKS”* (Azure Global 2025)**

This demo shows how to **create your own reusable infrastructure stack** with [Kubricate](https://github.com/thaitype/kubricate) — a type-safe, TypeScript-first framework for Kubernetes infrastructure.

## 💡 Why Custom Stacks?

With **`createStack`**, you can build modular Kubernetes stacks using familiar TypeScript patterns.
This makes it easier to:

* ✅ Reuse infrastructure logic across environments and teams
* 📦 Bundle multiple Kubernetes resources as a single unit
* 🧠 Maintain type safety and autocompletion throughout
* 🔧 Override configs in a clean and structured way

## ✨ Stack in Action

Here’s an example of a custom `WebAppStack` built using `createStack`:

```ts
export const WebAppStack = createStack('WebAppStack', (data) => {
  return new ResourceComposer()
    .addClass({ id: 'deployment', type: Deployment, config: { ... } })
    .addClass({ id: 'service', type: Service, config: { ... } });
});
```

This stack generates:

* A `Deployment` with customizable image, replicas, and port
* A `Service` of type `LoadBalancer` that exposes your app externally

### Usage Example

```ts
WebAppStack({
  name: "my-app",
  imageName: "ghcr.io/your-org/your-app",
  port: 8080,
  replicas: 3,
  namespace: "demo-azure-global",
});
```

> 🔁 Now you can use the same stack across multiple environments with just a config change.

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Generate Kubernetes YAML

```bash
npx kubricate generate
```

Outputs will be saved in the `./output` folder.

### 3. Deploy to Your Cluster

Pipe directly into your current `kubectl` context:

```bash
npx kubricate generate --stdout | kubectl apply -f -
```

> 🔐 Make sure you're connected to the right cluster and namespace.

## 🌍 Access Your App

Check the service:

```bash
kubectl get services -n demo-azure-global
```

Sample output:

```bash
NAME     TYPE           CLUSTER-IP     EXTERNAL-IP       PORT(S)          AGE
my-app   LoadBalancer   10.0.97.84     123.222.223.197    8080:31217/TCP   45s
```

Then open your browser:

```
http://123.222.223.197:8080
```

🎉 And you're live!

## 📁 File Overview

* `src/stacks/WebAppStack.ts` — defines your reusable stack using `createStack`
* `src/compose-stacks.ts` — composes and configures the stack for deployment
* `src/shared-config.ts` — holds shared values like namespace and image registry
* `kubricate.config.ts` — registers your stack and wires it into the CLI
* `output/` — generated Kubernetes YAML output
