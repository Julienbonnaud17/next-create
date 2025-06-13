#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createPage_1 = __importDefault(require("../commands/createPage"));
const createComponent_1 = __importDefault(require("../commands/createComponent"));
const utils_1 = require("../utils");
// Vérifie qu'on est bien dans un projet Next.js
function ensureNextProject() {
    const cwd = process.cwd();
    const hasNextConfig = fs_1.default.existsSync(path_1.default.join(cwd, 'next.config.js')) ||
        fs_1.default.existsSync(path_1.default.join(cwd, 'next.config.mjs'));
    if (!hasNextConfig) {
        console.error('❌ Vous devez être dans un projet Next.js (avec un fichier next.config.js)');
        process.exit(1);
    }
}
const args = process.argv.slice(2);
const command = args[0];
const name = args[1];
if (!command || !name) {
    console.error('Erreur : commande et nom sont obligatoires.');
    (0, utils_1.showUsage)();
    process.exit(1);
}
// Vérification Next.js avant exécution
ensureNextProject();
const options = {};
args.slice(2).forEach(opt => {
    if (opt === '--with-layout')
        options.withLayout = true;
    if (opt === '--client')
        options.client = true;
});
switch (command) {
    case 'page':
        (0, createPage_1.default)(name, options);
        break;
    case 'component':
        (0, createComponent_1.default)(name, options);
        break;
    default:
        console.error(`Commande inconnue : ${command}`);
        (0, utils_1.showUsage)();
        process.exit(1);
}
