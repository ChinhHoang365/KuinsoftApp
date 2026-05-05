/**
 * App Configuration
 * Main application configuration settings
 */

export const appConfig = {
  appName: 'KuinsoftApp',
  version: '1.0.0',
  author: 'Hoang Cong Chinh',
  environment: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,

  // API Configuration
  apiBaseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
  apiTimeout: 30000,

  // Feature Flags
  enableLogging: import.meta.env.DEV,
  enableErrorBoundary: true,
};
