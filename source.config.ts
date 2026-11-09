import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import remarkDoubleBrackets from './src/lib/remark-double-brackets.js';
import remarkGlossary from './src/lib/remark-glossary.js';
import { dictionary } from './src/lib/dictionary';
import remarkSeeMain from './src/lib/remark-see-main.js';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: (v) => [remarkMath, ...v, remarkDoubleBrackets, [remarkGlossary, { dictionary }], remarkSeeMain],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});
