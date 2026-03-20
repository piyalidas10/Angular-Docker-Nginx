import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

/**
 * Server-side configuration (Angular 19 SSR)
 * Combines browser config with server-specific providers.
 */
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),          // ✅ enables SSR (transfer state, hydration, etc.)
    provideServerRouting(serverRoutes) // ✅ provides server routing for prerender/serve
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
