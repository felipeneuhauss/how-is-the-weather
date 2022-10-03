import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '5vvtw9',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
