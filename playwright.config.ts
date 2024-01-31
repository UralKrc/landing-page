import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'e2e',  // Specify the directory where your test files are.
  timeout: 30000,  // Specify a timeout of 30 seconds.
  webServer: {
    command: 'npm run dev',  // Command to start your local server
    port: 5173,  // Port to use
  },
};

export default config;