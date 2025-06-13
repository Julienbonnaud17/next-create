#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import createPage from '../commands/createPage'
import createComponent from '../commands/createComponent'
import { showUsage } from '../utils'

// Vérifie qu'on est bien dans un projet Next.js
function ensureNextProject() {
  const cwd = process.cwd()
  const configFiles = [
    'next.config.js',
    'next.config.mjs',
    'next.config.ts',
    'next.config.mts',
  ]
  
  const hasNextConfig = configFiles.some(file =>
    fs.existsSync(path.resolve(cwd, file))
  )
  
  if (!hasNextConfig) {
    console.error('❌ Vous devez être dans un projet Next.js (fichier next.config.* manquant)')
    process.exit(1)
  }
  
}

const args = process.argv.slice(2)
const command = args[0]
const name = args[1]

if (!command || !name) {
  console.error('Erreur : commande et nom sont obligatoires.')
  showUsage()
  process.exit(1)
}

// Vérification Next.js avant exécution
ensureNextProject()

type Options = {
  withLayout?: boolean
  client?: boolean
}

const options: Options = {}
args.slice(2).forEach(opt => {
  if (opt === '--with-layout') options.withLayout = true
  if (opt === '--client') options.client = true
})

switch (command) {
  case 'page':
  createPage(name, options)
  break
  case 'component':
  createComponent(name, options)
  break
  default:
  console.error(`Commande inconnue : ${command}`)
  showUsage()
  process.exit(1)
}
