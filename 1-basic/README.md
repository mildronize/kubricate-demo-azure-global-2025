# 🧱 1. Basic Kubricate – Using Prebuilt Stacks

**Demo for: *“Type-Safe Infrastructure: Reimagining Kubernetes with Kubricate — Live on AKS”***
🎤 *Presented at Azure Global 2025*

This project demonstrates how to define Kubernetes infrastructure using **prebuilt reusable stacks** from [Kubricate](https://github.com/thaitype/kubricate), a type-safe, TypeScript-based framework for managing Kubernetes configs.

> ✅ **Kubricate Version:** `v0.19.0`
> 🧩 Uses **ready-to-use stacks** like `SimpleAppStack` and `NamespaceStack`
> ☁️ Instantly deployable to any Kubernetes cluster (like AKS)

## 💡 Concept

Kubricate lets you build and manage your infrastructure using **composable stacks** — think of them as reusable building blocks for Kubernetes.

With just a few lines of code, you can define:

* A new namespace
* A full app deployment with container image, port, replicas
* A service with LoadBalancer type

### 🧱 Example Code (in `src/main.ts`)

```ts
import { NamespaceStack, SimpleAppStack } from '@kubricate/stacks';
import { config } from './shared-config';

const namespace = new NamespaceStack().from({
  name: config.namespace,
});

const myApp = new SimpleAppStack()
  .from({
    namespace: config.namespace,
    imageRegistry: 'ghcr.io',
    imageName: 'mildronize/kubricate-demo-azure-global-2025:main',
    name: 'my-app',
    port: 8080,
  })
  .override({
    service: {
      spec: {
        type: 'LoadBalancer',
      },
    },
  });

export default { namespace, myApp };
```

> ✨ You can think of this like “infrastructure as code” but with autocomplete, reuse, and type safety.

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Generate Kubernetes manifests

This will compile the TypeScript stack definitions into YAML files:

```bash
npx kubricate generate
```

Output is saved to `./dist`

### 3. Deploy to Kubernetes

Apply the generated manifests directly:

```bash
npx kubricate generate --stdout | kubectl apply -f -
```

> 🔐 Make sure `kubectl` is configured for your target cluster and namespace.

## 🌍 Access the App

Check the running service:

```bash
kubectl get services -n demo-azure-global
```

Example output:

```bash
NAME     TYPE           CLUSTER-IP     EXTERNAL-IP       PORT(S)          AGE
my-app   LoadBalancer   10.0.97.84     123.222.223.197    8080:31217/TCP   45s
```

Open in your browser:

```
http://123.222.223.197:8080
```

And you’re live! 🎉

## 📁 File Overview

* `src/compose-stacks.ts` – defines how to **compose and configure stacks** using prebuilt building blocks
* `src/shared-config.ts` – central place for shared values like namespace, image registry, etc.
* `kubricate.config.ts` – Kubricate entry point that **registers stacks** and maps them into the generation system
* `output/` – generated Kubernetes YAML manifests
