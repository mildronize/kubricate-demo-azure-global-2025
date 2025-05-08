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