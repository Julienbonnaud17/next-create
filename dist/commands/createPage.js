"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createPage;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function capitalize(str) {
    if (!str)
        return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function createPage(name, options) {
    const baseDir = path_1.default.join(process.cwd(), 'src', 'app', name);
    const pagePath = path_1.default.join(baseDir, 'page.tsx');
    const layoutPath = path_1.default.join(baseDir, 'layout.tsx');
    if (fs_1.default.existsSync(pagePath)) {
        console.error(`❌ La page "${name}" existe déjà.`);
        process.exit(1);
    }
    fs_1.default.mkdirSync(baseDir, { recursive: true });
    const directive = options.client ? `'use client';\n\n` : '';
    const componentName = capitalize(name.replace(/\[|\]/g, ''));
    const pageContent = `${directive}import { useParams } from 'next/navigation';

export default function ${componentName}() {
  const params = useParams();
  const slug = params?.slug ?? '${componentName}';

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{slug}</h1>
    </div>
  );
}
`;
    fs_1.default.writeFileSync(pagePath, pageContent);
    console.log(`✅ Page créée : ${pagePath}`);
    if (options.withLayout && !fs_1.default.existsSync(layoutPath)) {
        const layoutContent = `import type { ReactNode } from 'react'

export default function ${componentName}Layout({ children }: { children: ReactNode }) {
  return (
    <section className="p-6">
      {children}
    </section>
  )
}
`;
        fs_1.default.writeFileSync(layoutPath, layoutContent);
        console.log(`📦 Layout généré : ${layoutPath}`);
    }
}
