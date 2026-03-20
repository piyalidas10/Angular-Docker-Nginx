import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Root page and static routes will be prerendered at build time
  {
    path: '', // This renders the "/" route on the client (CSR)
    renderMode: RenderMode.Client,
  },
  {
    path: 'products/home', // This page is static, so we prerender it (SSG)
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'products/create', // This page is static, so we prerender it (SSG)
    renderMode: RenderMode.Prerender,
  },

  // Dynamic route (with parameter) must be rendered on the server at runtime
  {
    path: 'products/edit/:id', // This page requires user-specific data, so we use SSR
    renderMode: RenderMode.Server,
  },

  {
    path: '**', // All other routes will be rendered on the server (SSR)
    renderMode: RenderMode.Server,
  },
];

/**
 * 💡 Important notes:
 * Dynamic routes with params (:id) cannot be prerendered unless you explicitly define getPrerenderParams.
 * Angular’s prerender extractor expects at least one static prerendered route ('' or 'products/home').
 * This combination (3 prerendered + 2 server routes) works in Angular 19.1 – 19.2 builds.
 */