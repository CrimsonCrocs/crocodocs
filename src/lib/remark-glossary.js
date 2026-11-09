import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { findAndReplace } from 'mdast-util-find-and-replace';

const glossaryPaths = {
  'starter-guide': 'starter-guide/glossary.mdx',
  engineering: 'engineering/glossary.mdx',
  design: 'design/glossary.mdx',
};

// These words also have everyday meanings. Only annotate an author's emphasized
// introduction, rather than, for example, defining "current season" as electricity.
const ambiguous = new Set([
  'current', 'power', 'part', 'document', 'instance', 'feature', 'pattern',
  'mirror', 'parameter', 'configuration', 'variable', 'input', 'output',
  'condition', 'loop', 'function', 'module', 'support', 'grip', 'version',
  'revision', 'recovery', 'pitch', 'force', 'constraint',
]);

const aliases = {
  ftc: ['FIRST Tech Challenge'],
  cad: ['computer-aided design'],
  imu: ['inertial measurement unit'],
  bom: ['bill of materials'],
  cots: ['commercial off-the-shelf'],
};

function keyFor(term) {
  const key = term.split(/\s+\/\s+|,\s*/)[0].toLowerCase();
  return Object.entries(aliases).find(([, names]) => names.includes(key))?.[0] ?? key;
}

function plainText(value) {
  return value.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\\tau\b/g, 'τ').replace(/\\omega\b/g, 'ω')
    .replace(/[`*$]/g, '').trim();
}

export function readGlossary(section, root = resolve('content/docs')) {
  const entries = [];
  const file = glossaryPaths[section];
  if (!file) return entries;
  const source = readFileSync(resolve(root, file), 'utf8');
  let category = '';
  for (const line of source.split('\n')) {
    if (line.startsWith('## ')) category = line.slice(3).trim();
    const pair = line.match(/<dt>([^<]+)<\/dt><dd>([^<]+)<\/dd>/)
      ?? line.match(/^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/);
    if (!pair || pair[1] === 'Term' || /^[- :]+$/.test(pair[1])) continue;
    entries.push({
      term: plainText(pair[1]),
      definition: plainText(pair[2]),
      category,
      href: `/docs/${section}/glossary`,
    });
  }
  return entries;
}

function plural(word) {
  if (/[^aeiou]y$/i.test(word)) return word.slice(0, -1) + 'ies';
  return word.endsWith('s') ? word : word + 's';
}

export default function remarkGlossary({ dictionary = {} } = {}) {
  const common = [
    ...Object.values(dictionary).map(entry => ({ ...entry, href: entry.mainPage })),
    ...readGlossary('starter-guide'),
  ];
  const engineering = readGlossary('engineering');
  const design = readGlossary('design');

  return (tree, file) => {
    const path = String(file.path ?? '').replaceAll('\\', '/');
    const match = path.match(/(?:^|\/)content\/docs\/(.*)\.mdx$/);
    if (!match || /(?:^|\/)(glossary|dictionary-demo)$/.test(match[1])) return;
    const section = match[1].split('/')[0];
    const entries = new Map(common.map(entry => [keyFor(entry.term), entry]));
    for (const entry of section === 'design' ? [...engineering, ...design] : section === 'engineering' ? engineering : []) {
      entries.set(keyFor(entry.term), entry);
    }

    const terms = new Map();
    for (const [key, entry] of entries) {
      const names = [...entry.term.split(/\s+\/\s+|,\s*/), ...(aliases[key] ?? [])];
      for (const name of names) {
        if (name.length < 3) continue;
        for (const text of [name, plural(name)]) {
          terms.set(text.toLowerCase(), { key, entry, spelling: text });
        }
      }
    }
    const alternatives = [...terms.keys()].sort((a, b) => b.length - a.length)
      .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = new RegExp(`(?<![\\p{L}\\p{N}_])(${alternatives.join('|')})(?![\\p{L}\\p{N}_])`, 'giu');
    const seen = new Set();

    findAndReplace(tree, [[pattern, (text, _capture, info) => {
      const { key, entry, spelling } = terms.get(text.toLowerCase());
      if (seen.has(key)) return false;
      if (/^[A-Z&]{2,}s?$/.test(spelling) && text !== spelling) return false;
      if (ambiguous.has(key) && !info.stack.some(node => node.type === 'strong' || node.type === 'emphasis')) return false;
      seen.add(key);
      return {
        type: 'mdxJsxTextElement',
        name: 'GlossaryTerm',
        attributes: Object.entries({ term: entry.term, definition: entry.definition, href: entry.href })
          .filter(([, value]) => value)
          .map(([name, value]) => ({ type: 'mdxJsxAttribute', name, value })),
        children: [{ type: 'text', value: text }],
      };
    }]], {
      ignore: node => ['heading', 'link', 'linkReference', 'image', 'imageReference', 'code', 'inlineCode', 'html', 'mdxJsxTextElement', 'mdxJsxFlowElement'].includes(node.type),
    });
  };
}
