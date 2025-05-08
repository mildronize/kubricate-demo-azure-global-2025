import { defineConfig } from 'kubricate';
import myStacks from './src/compose-stacks';

export default defineConfig({
  stacks: {
    ...myStacks,
  },
});
