// docs/build_guide/build_guide.md（人間が編集する唯一のソース。GitHub上の表示もそのまま）を
// Astro Starlight が読める src/content/docs/index.md へ変換生成する。
// ソースは一切書き換えない。生成物（src/content/docs/）は .gitignore 済み。
//
//   - 先頭 H1 を frontmatter の title へ昇格し、本文からは除去（Starlight が title を H1 描画するため）
//   - GitHub アラート（> [!CAUTION] など）を Starlight アサイド（:::danger など）へ変換
//   - 画像参照 images/... を ./images/... へ正規化し、Astro の画像最適化に乗せる
//   - docs/build_guide/images/ を src/content/docs/images/ へコピー
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_MD = path.join(root, 'docs/build_guide/build_guide.md');
const SRC_IMAGES = path.join(root, 'docs/build_guide/images');
const OUT_DIR = path.join(root, 'src/content/docs');
const OUT_MD = path.join(OUT_DIR, 'index.md');
const OUT_IMAGES = path.join(OUT_DIR, 'images');

// GitHub アラート種別 → Starlight アサイド種別
const ALERT_MAP = {
  NOTE: 'note',
  TIP: 'tip',
  IMPORTANT: 'note',
  WARNING: 'caution',
  CAUTION: 'danger',
};

// 先頭 H1 を抜き出して frontmatter title にし、本文から取り除く
function extractTitle(lines) {
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^#\s+(.+?)\s*$/);
    if (m) {
      lines.splice(i, 1);
      // 直後の空行も1つ詰める
      if (lines[i] !== undefined && lines[i].trim() === '') lines.splice(i, 1);
      return m[1];
    }
    if (lines[i].trim() !== '') break; // H1 より前に本文が来たら探索終了
  }
  return 'tws_lp_jis60 ビルドガイド';
}

// GitHub アラート（[!TYPE] で始まる引用ブロック）を Starlight アサイドへ変換
function convertAlerts(lines) {
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const head = lines[i].match(/^>\s*\[!(\w+)\]\s*$/);
    if (!head) {
      out.push(lines[i]);
      continue;
    }
    const type = ALERT_MAP[head[1].toUpperCase()] || 'note';
    const body = [];
    i++; // [!TYPE] 行の次へ
    while (i < lines.length && /^>/.test(lines[i])) {
      body.push(lines[i].replace(/^>\s?/, ''));
      i++;
    }
    i--; // 外側 for の i++ と相殺
    out.push(`:::${type}`);
    out.push(...body);
    out.push(':::');
  }
  return out;
}

async function main() {
  const raw = await fs.readFile(SRC_MD, 'utf8');
  let lines = raw.replace(/\r\n/g, '\n').split('\n');

  const title = extractTitle(lines);
  lines = convertAlerts(lines);

  let body = lines.join('\n');
  // 画像参照を Astro が最適化できる相対パスへ正規化（images/ → ./images/）
  body = body.replace(/\]\(images\//g, '](./images/');

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    'description: JIS配列・ロープロファイル・完全無線の左右分割60%キーボード tws_lp_jis60 のビルドガイド',
    '---',
    '',
  ].join('\n');

  // 生成先を作り直す
  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUT_IMAGES, { recursive: true });
  await fs.writeFile(OUT_MD, frontmatter + body, 'utf8');

  // 画像コピー
  const files = await fs.readdir(SRC_IMAGES);
  await Promise.all(
    files.map((f) => fs.copyFile(path.join(SRC_IMAGES, f), path.join(OUT_IMAGES, f))),
  );

  console.log(
    `synced: ${path.relative(root, OUT_MD)} (title="${title}", images=${files.length})`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
