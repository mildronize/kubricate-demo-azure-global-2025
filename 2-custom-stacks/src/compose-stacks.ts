import { NamespaceStack } from '@kubricate/stacks';
import { config } from './shared-config';
import { WebAppStack } from './stackts/WebAppStack';

const namespace = new NamespaceStack().from({
  name: config.namespace,
});

const myApp = WebAppStack
  .from({
    namespace: config.namespace,
    imageRegistry: 'ghcr.io',
    imageName: 'mildronize/kubricate-demo-azure-global-2025:main',
    name: 'my-app',
    port: 8080,
  });
  
export default { namespace, myApp };