import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    browserName: 'chromium',
    headless: false,
    baseURL: 'http://localhost:8090',
    // Uncomment the following lines as needed
    // viewport: { width: 1280, height: 768 },
    // video: "on-first-retry",
  },
};

export default config;
