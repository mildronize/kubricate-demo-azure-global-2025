# 2. Kubricate with Custom Stacks

Note: this using kubricate v0.19.0,
However, 

### Installation

```bash
npm install
```

### Apply Secrets

```bash
npx kbr secret validate
npx kbr secret apply
```

### Generate into files

```bash
npx kbr generate
```

### Generate and Apply to Kubernetes Cluster

```bash
npx kbr generate --stdout | kubectl apply -f -  
``` 