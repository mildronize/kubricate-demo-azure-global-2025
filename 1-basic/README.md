# 1. Basic Kubricate

Note: this using kubricate v0.19.0,
However, 

### Installation

```bash
npm install
```

### Generate into files

```bash
npx kbr generate
```

### Generate and Apply to Kubernetes Cluster

```bash
npx kbr generate --stdout | kubectl apply -f -  
``` 