import { NamespaceStack } from '@kubricate/stacks';
import { config } from './shared-config';
import { WebAppStack } from './stackts/WebAppStack';
import { secretManager } from './setup-secrets';

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
    env: [
      { name: 'APP_ID', value: 'Kubricate App' },
    ]
  })
  .useSecrets(secretManager, c => {
    c.secrets('APP_SECRET').forName('APP_KEY').inject();
    c.secrets('DATABASE_CONNECTION_STRING').forName('POSTGRES_CONNECTION_STRING').inject('env');
  });

export default { namespace, myApp };