import { readFileSync } from 'node:fs';
import path from 'node:path';

export function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function mergeNamedObjects(target, source, label) {
  for (const [name, value] of Object.entries(source ?? {})) {
    if (target[name] === undefined) {
      target[name] = value;
      continue;
    }
    if (JSON.stringify(target[name]) !== JSON.stringify(value)) {
      throw new Error(`${label} collision: ${name}`);
    }
  }
}

export function loadAuthority(workspaceRoot, sources) {
  if (!Array.isArray(sources) || sources.length === 0) {
    throw new Error('authority sources must not be empty');
  }
  const documents = sources.map((source) =>
    JSON.parse(readFileSync(path.resolve(workspaceRoot, source), 'utf8')),
  );
  const authority = structuredClone(documents[0]);
  authority.paths ??= {};
  authority.components ??= {};
  for (const document of documents.slice(1)) {
    mergeNamedObjects(authority.paths, document.paths, 'OpenAPI path');
    for (const [section, entries] of Object.entries(document.components ?? {})) {
      authority.components[section] ??= {};
      mergeNamedObjects(authority.components[section], entries, `OpenAPI component ${section}`);
    }
    const tags = new Map((authority.tags ?? []).map((tag) => [tag.name, tag]));
    for (const tag of document.tags ?? []) tags.set(tag.name, tag);
    if (tags.size > 0) authority.tags = [...tags.values()];
  }
  return authority;
}
