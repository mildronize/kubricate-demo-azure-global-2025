import { defineConfig } from 'kubricate';
import myStacks from './src/compose-stacks';
import { secretManager } from './src/setup-secrets';

export default defineConfig({
  stacks: {
    ...myStacks,
  },
  secret: {
    secretSpec: secretManager,
  }
});
