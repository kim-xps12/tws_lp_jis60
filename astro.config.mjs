// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// GitHub Pages（プロジェクトサイト）は https://kim-xps12.github.io/tws_lp_jis60/ で公開される。
// そのため site + base を設定する。
export default defineConfig({
  site: 'https://kim-xps12.github.io',
  base: '/tws_lp_jis60/',
  integrations: [
    starlight({
      title: 'tws_lp_jis60',
      description:
        'JIS配列・ロープロファイル・完全無線の左右分割60%キーボード tws_lp_jis60 のビルドガイド',
      // 日本語UI
      locales: {
        root: { label: '日本語', lang: 'ja' },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/kim-xps12/tws_lp_jis60',
        },
      ],
      // 単一ガイドのため、左サイドバーは1ページのみ。本文の節は右側の目次で辿れる。
      sidebar: [{ label: 'ビルドガイド', link: '/' }],
      // CC-BY-SA-4.0 のフッター表記
      credits: false,
    }),
  ],
});
