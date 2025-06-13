"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = capitalize;
exports.showUsage = showUsage;
function capitalize(str) {
    if (!str)
        return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function showUsage() {
    console.log(`
Usage:
  create-next page <name> [--with-layout] [--client]
  create-next component <name> [--client]

Exemples:
  create-next page notes --with-layout --client
  create-next component Button --client
`);
}
