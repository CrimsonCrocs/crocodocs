import assert from 'node:assert/strict';
import test from 'node:test';
import { compile } from '@mdx-js/mdx';
import remarkGlossary, { readGlossary } from '../src/lib/remark-glossary.js';

async function annotate(source, path = 'content/docs/starter-guide/test.mdx') {
  const terms = [];
  await compile({ value: source, path }, {
    remarkPlugins: [remarkGlossary, () => tree => {
      function walk(node) {
        if (node.type === 'mdxJsxTextElement' && node.name === 'GlossaryTerm') {
          terms.push({
            text: node.children[0].value,
            ...Object.fromEntries(node.attributes.map(attr => [attr.name, attr.value])),
          });
        }
        for (const child of node.children ?? []) walk(child);
      }
      walk(tree);
    }],
  });
  return terms;
}

test('reads the existing glossary definitions without copying their contents', () => {
  assert.equal(readGlossary('starter-guide').length, 102);
  assert.equal(readGlossary('engineering').length, 41);
  assert.equal(readGlossary('design').length, 79);
});

test('annotates the first occurrence per article, including plurals and bold text', async () => {
  const result = await annotate('**Servos** move a mechanism. A servo and other servos move it again.');
  assert.deepEqual(result.map(term => term.text), ['Servos', 'mechanism']);
  assert.equal(result[0].definition, 'An actuator commonly commanded by position, or by speed in continuous-rotation mode.');
  assert.deepEqual((await annotate('Servo.')).map(term => term.text), ['Servo']);
});

test('uses the longest alias and shares first-mention state across aliases', async () => {
  const result = await annotate('FIRST Tech Challenge (FTC) includes FIRST and other programs.');
  assert.deepEqual(result.map(term => term.text), ['FIRST Tech Challenge', 'FIRST']);
});

test('does not treat ordinary first and step as acronyms or current as electricity', async () => {
  const result = await annotate('Your first step in the current season. FIRST supports FTC. **Current** is measured in amperes.');
  assert.deepEqual(result.map(term => term.text), ['season', 'FIRST', 'FTC', 'Current']);
});

test('skips headings, code, links and component contents, without consuming a mention', async () => {
  const result = await annotate('# Servo\n\n`servo` [servo](/docs/starter-guide)\n\n```java\nservo.setPosition(0.5);\n```\n\n<Bracket term="servo">servo</Bracket>\n\nServo moves.\n\n<footer>Torque source.</footer>');
  assert.deepEqual(result.map(term => term.text), ['Servo']);
});

test('uses section-specific meanings for an emphasized technical introduction', async () => {
  const engineering = await annotate('A **constraint** limits the design.', 'content/docs/engineering/design/test.mdx');
  const design = await annotate('A **constraint** limits the design.', 'content/docs/design/test.mdx');
  assert.equal(engineering[0].definition, 'Requirement a feasible design must satisfy');
  assert.equal(design[0].definition, 'A relationship such as parallel, equal, or coincident');
});

test('leaves glossary pages and unknown terms alone', async () => {
  assert.deepEqual(await annotate('Servo and IMU.', 'content/docs/starter-guide/glossary.mdx'), []);
  assert.deepEqual(await annotate('Unfamiliarword and servomotor.'), []);
});

test('recognizes whole words with punctuation and preserves quotation marks', async () => {
  const result = await annotate('“Part Studio”, CAD, and CAD again.', 'content/docs/design/test.mdx');
  assert.deepEqual(result.map(term => term.text), ['Part Studio', 'CAD']);
  assert.equal(result[0].href, '/docs/design/glossary');
});
