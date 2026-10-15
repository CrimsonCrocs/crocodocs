---
name: studyvault-article-writer
description: Create, revise, or audit syllabus-aligned StudyVault MDX revision articles in posts/. Use for article scope, explanations, examples, structure, voice, diagrams, components, metadata, and post acceptance. Do not use for past-paper transcription or application-renderer engineering.
---

# StudyVault Article Writer

Produce revision articles that a student can open directly, understand without reading another page first, and trust as an original explanation of the syllabus.

## CrocoDocs adaptation

Installed from StudyVault's project-local skill on 2026-10-14 at the user's request. Keep its editorial, standalone-explanation, originality, provenance, and final Deslop gates. This copy is scoped to CrocoDocs robotics documentation.

- Read `CONTRIBUTING.md` and representative `content/docs/` pages for this repository's MDX/frontmatter/component contract. Do not add StudyVault-only components or curriculum metadata.
- FTC engineering and programming tasks and the user's requested audience replace syllabus objectives; current official FIRST documents govern rules and manufacturer documents govern hardware specifications.
- Use the appropriate Engineering or Programming source register and exact linked source passages as the research base. Record unsupported or unfinished source coverage honestly.
- Articles live in `content/docs/`; ordering lives in `meta.json`. Do not modify StudyVault's `posts/`, `incomplete/`, or curriculum plan.
- Put source citations and image attribution in a compact Sources footer at the bottom, following `CONTRIBUTING.md`. Keep explanatory paragraphs free of source links; retain version context, rule IDs, technical qualifications, and internal article links where useful.
- Run `bun run check:docs`, `bun run build`, and inspect affected rendered articles instead of StudyVault's `cl`/`lint-posts.ts` commands.
- The original StudyVault-specific instructions below remain provenance and editorial context; these repository substitutions apply here.

## Required context

Before drafting or editing prose:

1. Read `internal/meta/post-guidelines.md` completely. It remains the canonical source for MDX syntax, component choices, diagram tooling, metadata, subject keys, ordering, math pitfalls, and checklist updates.
2. Read the relevant syllabus PDF in `public/syllabi/`. Use it to establish scope, objectives, expected skills, practical work, and assessment demands.
3. Read [voice and article shape](references/voice-and-article-shape.md). It records StudyVault-specific editorial decisions learned from review feedback.
4. Use the installed `$deslop` skill for the final prose pass. Read its `SKILL.md` before applying it. Preserve technical meaning and StudyVault's teacherly voice; a Deslop pass must not make the article stiff, generic, choppy, or lifeless.

Use the acquired corpus under `internal/resources/` as the supporting information base, alongside the relevant syllabus. Inspect relevant source passages before substantive edits; record the private source path and pages in the audit ledger. If no suitable corpus source exists, record that gap explicitly rather than claiming corpus verification. Supporting notes and internal textbooks do not determine scope, and their phrasing must not enter the article. When they conflict with the syllabus, follow the syllabus and record the discrepancy.

## Establish the article contract

Before writing, determine:

- the exact syllabus objectives the article owns;
- what the student should be able to explain, calculate, compare, interpret, or evaluate after reading it;
- which prerequisite ideas must be defined locally so the page stands alone;
- which applications, practical skills, and exam demands belong on the page;
- whether a diagram, table, worked example, or flashcard set materially improves learning.

Respect an existing article boundary unless the user asks to change it or the syllabus scope genuinely cannot fit one revision session. Do not split an article merely to repair its prose or continuity.

### Curriculum expansion workstream

For the user-authorised whole-collection topic restructuring, follow
`CURRICULUM-CORPUS-PLAN.md` and its source-ready topic packets. The user has
authorised changing inadequate boundaries; that does not authorise a uniform
rewrite of strong articles. Audit first and choose keep, repair, expand, split
or add based on demonstrated teaching gaps. CAPE Economics' compression is not
a growth target for CSEC Biology or other better-developed subjects.

Use reviewed syllabus objectives **and content requirements**, not raw extracted
IDs or heading counts, to determine completeness. An article covering one facet
of a broad objective does not cover every facet. Preserve existing URLs and
use the shared study-topic identity planned for Notes and Tutor. Reference
pages and module overviews do not replace detailed topic teaching. Do not
declare content source-verified from a catalogue book recommendation or an
uninspected local file. Do not shorten advanced reasoning to fit a fixed
generation word budget.

## Write the article

Build a connected explanation, not a catalogue of facts and not a sequence of commands.

- Open with the topic itself in one or two short sentences, usually no more than about 45 words. State the idea directly; do not delay it with an anecdote, elaborate Caribbean scenario, sweeping significance claim, or list of everything the article covers. Put a useful example beside the concept it teaches.
- Make the opening self-contained. Do not refer to a previous article, lesson, chapter, or an assumed reading order.
- Keep the introduction to one short paragraph. In the body, give each paragraph one clear teaching job. Separate a definition, its explanation, and a developed example when combining them would make a dense block. Do not mechanically merge related paragraphs or split every sentence onto its own line.
- Do not begin with a bare subject label, "In this article", "This page covers", or similar throat-clearing. A direct definition such as "Economics studies how people make choices with limited resources" is appropriate when the subject itself is the topic. Do not add a generic subject definition to an unrelated topic page.
- Define terms where they become useful, then explain their mechanism, consequence, limitation, or application.
- Write CAPE explanations with the same clarity as CSEC explanations. Preserve advanced concepts, exact terminology, reasoning and exam demands; the qualification level does not justify inflated vocabulary or long sentences.
- Use selective **bold** for a term at its first useful definition, an essential condition, or a distinction a scanning reader needs. Do not bold every occurrence, whole paragraphs, or arbitrary keywords. Use lists or compact tables for genuine sets, steps and comparisons.
- Shorten overloaded titles, headings and descriptions where possible while preserving topic scope and existing URLs. Remove unnecessary expository text and repeated explanations; do not replace them with empty summaries or delete required teaching.
- Explain why a rule works and how a student recognises when it applies.
- Prefer one demanding, well-chosen example to several near-duplicates.
- Use headings when the subject changes, not to decorate every small idea.
- End when the last useful explanation, application, distinction, or exam consequence is complete. Do not append a generic recap or motivational slogan.

Chemistry and Additional Mathematics articles may be inspected for coverage, sequencing, and component patterns. They are structural references, not prose templates; their wording still requires independent editorial judgement.

## Use sources and assets responsibly

- Write every explanation, definition, example, table, caption, and question in original language.
- Do not copy, trace, crop, or recreate a copyrighted book's diagram closely enough to reproduce its expression.
- Copyrighted internal sources may inform understanding but must remain internal and must not be linked or hosted publicly.
- Prefer an original diagram built with the repository's diagram tools. Otherwise use an explicitly open-licensed or public-domain source and retain its provenance and licence.
- Do not invent missing labels, source facts, syllabus requirements, or experimental results. Record unresolved gaps instead.

## Integrate the page

Follow the canonical guidelines for frontmatter, exact subject keys, tags, media locations, MDX components, and `src/lib/post-orders.ts`. When creating a page, update the appropriate `incomplete/meta/` record with coverage and remaining gaps.

Use components only when their specialised presentation helps comprehension. A one-sentence clarification usually belongs in prose. Figures must have descriptive alt text, and every local asset path must resolve.

## Acceptance gates

Do not report completion until all of these pass:

1. **Syllabus:** Every claimed objective and fact is in scope; required application or practical skills are represented.
2. **Standalone:** The page makes sense when opened directly. Remove continuity language and supply any essential local definition.
3. **Originality and provenance:** No copied phrasing or unlicensed published asset remains.
4. **Article shape:** The introduction is very short and direct. The body is easy to scan, with selective emphasis and manageable paragraphs. There are no long scene-setting openings, unnecessary exposition, artificial one-sentence stacks, sparse filler sections, or walls of text. Readability metrics are review prompts, never automatic rewrite rules or proof of quality.
5. **Deslop:** The prose is specific, natural, calm, and teacherly without formulaic rhythm, generic framing, inflated claims, or a sterile rewrite.
6. **MDX:** Frontmatter, components, math, tables, Mermaid syntax, and local asset paths are valid.
7. **Repository integration:** Ordering and the relevant meta checklist are current.

Run at minimum:

```bash
bun run cl
bun scripts/lint-posts.ts posts/<subject-folder>
```

When the development server is available, load the changed route and verify that it returns successfully and that the rendered hierarchy, components, equations, tables, and figures are readable. Report changed paths and any remaining content or asset gaps.
