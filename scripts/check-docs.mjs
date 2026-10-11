import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { compile } from "@mdx-js/mdx";

const root = resolve("content/docs");
const publicRoot = resolve("public");
const errors = [];
const pages = [];

function walk(folder) {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    const file = join(folder, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith(".mdx")) pages.push(file);
  }
}

function pageExists(base) {
  return (
    existsSync(base + ".mdx") ||
    existsSync(join(base, "index.mdx"))
  );
}

walk(root);

for (const file of pages) {
  const source = readFileSync(file, "utf8");
  try {
    await compile(source);
  } catch (error) {
    errors.push(`${file}: MDX syntax error: ${error.message}`);
  }
  const withoutCode = source.replace(/\x60\x60\x60[\s\S]*?\x60\x60\x60/g, "");
  const links = [...withoutCode.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)];
  for (const [, raw] of links) {
    const target = raw.trim().split("#")[0];
    if (!target || /^(https?:|mailto:|tel:)/.test(target)) continue;
    const valid = target.startsWith("/docs/")
      ? pageExists(join(root, decodeURIComponent(target.slice(6))))
      : target.startsWith("/")
        ? existsSync(join(publicRoot, decodeURIComponent(target.slice(1))))
        : pageExists(resolve(dirname(file), decodeURIComponent(target)));
    if (!valid) errors.push(`${file}: unresolved link ${raw}`);
  }
}

function checkMeta(folder) {
  const meta = join(folder, "meta.json");
  if (existsSync(meta)) {
    const { pages: entries = [] } = JSON.parse(readFileSync(meta, "utf8"));
    for (const entry of entries) {
      if (entry.startsWith("---")) continue;
      const name = entry.startsWith("...") ? entry.slice(3) : entry;
      if (!pageExists(join(folder, name)) && !existsSync(join(folder, name, "meta.json"))) {
        errors.push(`${meta}: missing page or group ${entry}`);
      }
    }
  }
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    if (entry.isDirectory()) checkMeta(join(folder, entry.name));
  }
}

checkMeta(root);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${pages.length} MDX pages: syntax, local links, images, and navigation resolve.`);
}
