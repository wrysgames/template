#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Usage: node scripts/update-local-package.js <app> <package1> [package2 ...]
const [app, ...packages] = process.argv.slice(2);

if (!app || packages.length === 0) {
  console.error("Usage: node scripts/update-local-package.js <app> <package1> [package2 ...]");
  process.exit(1);
}

for (const pkg of packages) {
  const pkgPath = path.join(__dirname, "..", "packages", pkg);
  execSync("pnpm build", { cwd: pkgPath, stdio: "inherit" });
  execSync("pnpm pack", { cwd: pkgPath, stdio: "inherit" });
  const tarball = fs.readdirSync(pkgPath).find(f => f.endsWith(".tgz"));
  const appPath = path.join(__dirname, "..", "apps", app);
  execSync(`pnpm add ${path.join(pkgPath, tarball)}`, { cwd: appPath, stdio: "inherit" });
}