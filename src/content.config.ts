import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// 実体は scripts/sync-content.mjs が docs/build_guide/build_guide.md から
// src/content/docs/ へ生成する（生成物は git 管理外）。
export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
