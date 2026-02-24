---
description: Fix Vite 'operation not permitted' error on macOS
---
If you run into an "operation not permitted" error when running `npm run dev` with Vite on macOS (usually related to Vite's esbuild trying to write into `.vite` cache within protected directories like Desktop), perform the following steps to resolve it quickly.

1. Locate the Vite configuration file (`vite.config.js` or `vite.config.ts`).
2. Add a `cacheDir` property to the root of the configuration object that points to a temporary folder outside of the restricted project path (for example: `/tmp/vite_cache`).
3. Increment the `server.port` to something else (e.g. `4001`) to avoid potential clashes if the previous locked server didn't exit cleanly.

Example solution for `vite.config.js`:
```javascript
export default defineConfig({
  // ... other configuration ...
  cacheDir: '/tmp/novareach_vite_cache', // Bypasses macOS folder security policies Let esbuild write to /tmp
  server: {
    host: '0.0.0.0',
    port: 4001 // Try a new port to avoid in-use conflicts
  }
})
```

// turbo-all
4. Delete the broken cache directory in `node_modules` just in case.
Remove via run_command: `rm -rf node_modules/.vite`

5. Verify that the changes resolved the issue.
Start server via run_command: `npm run dev`
