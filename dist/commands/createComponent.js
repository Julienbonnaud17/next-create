"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createComponent;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function capitalize(str) {
    if (!str)
        return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function createComponent(name, options) {
    const baseDir = path_1.default.join(process.cwd(), 'src', 'components');
    const componentPath = path_1.default.join(baseDir, `${name}.tsx`);
    if (fs_1.default.existsSync(componentPath)) {
        console.error(`❌ Le composant "${name}" existe déjà.`);
        process.exit(1);
    }
    if (!fs_1.default.existsSync(baseDir)) {
        fs_1.default.mkdirSync(baseDir, { recursive: true });
    }
    const directive = options.client ? `'use client';\n\n` : '';
    const componentName = capitalize(name);
    const componentContent = `${directive}import React from 'react'

export default function ${componentName}() {
  return (
    <div>
      <h2>${componentName} component</h2>
    </div>
  )
}
`;
    fs_1.default.writeFileSync(componentPath, componentContent);
    console.log(`✅ Composant créé : ${componentPath}`);
}
