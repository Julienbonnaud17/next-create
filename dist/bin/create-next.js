#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createPage_1 = __importDefault(require("../commands/createPage"));
const createComponent_1 = __importDefault(require("../commands/createComponent"));
const utils_1 = require("../utils");
const args = process.argv.slice(2);
const command = args[0];
const name = args[1];
if (!command || !name) {
    console.error('Erreur : commande et nom sont obligatoires.');
    (0, utils_1.showUsage)();
    process.exit(1);
}
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
