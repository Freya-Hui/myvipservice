// @ts-check
import { defineConfig } from 'eslint/config';
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // .netlify/ is Netlify CLI's local cache (function bundles, a local Blobs
  // DB) — gitignored already, but eslint doesn't share that ignore file, so
  // a local `netlify dev`/`deploy` run left it linting ~45MB of bundled
  // vendor code and drowning real results in noise until this was added.
  // .claude/worktrees/ holds sibling git worktrees for parallel Claude Code
  // sessions — each has its own tsconfig.json, which confuses eslint's
  // typescript parser ("multiple candidate TSConfigRootDirs") if left
  // unignored while another session's worktree exists alongside this one.
  { ignores: ['dist/', '.astro/', '.netlify/', '.claude/worktrees/'] },
  tseslint.configs.recommended,
  eslintPluginAstro.configs['flat/recommended'],
]);
