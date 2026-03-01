const fs = require('fs');
const path = require('path');

const root = process.cwd();
const exts = new Set(['.js','.jsx','.ts','.tsx','.mjs','.cjs','.py']);
const excludeDirs = new Set(['node_modules','.git','.next','dist','build','coverage','out','jobmatcher-env','__pycache__']);

function shouldExclude(p){
  const parts = p.split(/[\\/]+/);
  return parts.some(part => excludeDirs.has(part));
}

function listFiles(dir){
  const out = [];
  function walk(cur){
    let entries;
    try { entries = fs.readdirSync(cur, {withFileTypes:true}); } catch { return; }
    for (const e of entries){
      const full = path.join(cur, e.name);
      const rel = path.relative(root, full).replace(/\\/g,'/');
      if (shouldExclude(rel)) continue;
      if (e.isDirectory()) walk(full);
      else if (exts.has(path.extname(e.name))) out.push(full);
    }
  }
  walk(dir);
  return out;
}

function scanJS(lines){
  let seenCode = false;
  let inBlockComment = false;
  const flagged = [];

  const isImport = (s)=> /^\s*import\b/.test(s) && !/^\s*import\s*\(/.test(s);
  const isDirective = (s)=> /^\s*(['"])use\s+[\w-]+\1\s*;?\s*$/.test(s);

  for (let i=0;i<lines.length;i++){
    const line = lines[i];
    const t = line.trim();
    if (!t) continue;

    if (inBlockComment){
      if (t.includes('*/')) inBlockComment = false;
      continue;
    }
    if (/^\/\*/.test(t)){
      if (!t.includes('*/')) inBlockComment = true;
      continue;
    }
    if (/^\/\//.test(t)) continue;

    if (!seenCode && isDirective(line)) continue;

    if (isImport(line)){
      if (seenCode) flagged.push({line: i+1, text: line});
      continue;
    }

    seenCode = true;
  }
  return flagged;
}

function scanPy(lines){
  let seenCode = false;
  let inDoc = false;
  let docDelim = null;
  const flagged = [];
  let atStart = true;

  const isImport = (s)=> /^\s*(import\s+\S+|from\s+\S+\s+import\s+)/.test(s);

  for (let i=0;i<lines.length;i++){
    const line = lines[i];
    const t = line.trim();
    if (!t) continue;

    if (atStart && /^#!/.test(t)) continue;

    if (inDoc){
      if (t.includes(docDelim)) {
        const idx = t.indexOf(docDelim);
        const after = t.slice(idx + 3).trim();
        inDoc = false;
        if (!after) { atStart = false; continue; }
      } else {
        continue;
      }
    }

    if (atStart && (t.startsWith('"""') || t.startsWith("'''"))){
      const delim = t.startsWith('"""') ? '"""' : "'''";
      const rest = t.slice(3);
      if (rest.includes(delim)) {
        atStart = false;
        continue;
      }
      inDoc = true;
      docDelim = delim;
      atStart = false;
      continue;
    }

    if (/^#/.test(t)) continue;

    if (isImport(line)){
      if (seenCode) flagged.push({line: i+1, text: line});
      atStart = false;
      continue;
    }

    seenCode = true;
    atStart = false;
  }
  return flagged;
}

const files = listFiles(root);
const results = [];
let totalImports = 0;
for (const file of files){
  let content;
  try { content = fs.readFileSync(file, 'utf8'); } catch { continue; }
  const lines = content.split(/\r?\n/);
  const ext = path.extname(file).toLowerCase();
  const flagged = ext === '.py' ? scanPy(lines) : scanJS(lines);
  if (flagged.length){
    const rel = path.relative(root, file).replace(/\\/g,'/');
    totalImports += flagged.length;
    results.push({file: rel, flagged});
  }
}

results.sort((a,b)=> a.file.localeCompare(b.file));

for (const r of results){
  console.log(r.file);
  for (const f of r.flagged){
    console.log(`  L${f.line}: ${f.text}`);
  }
}
console.log('---SUMMARY---');
console.log(`files=${results.length}`);
console.log(`imports=${totalImports}`);
