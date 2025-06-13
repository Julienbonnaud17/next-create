import fs from 'fs'
import path from 'path'

export type Options = {
  client?: boolean
}

function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function createComponent(name: string, options: Options) {
  const baseDir = path.join(process.cwd(), 'src', 'components')
  const componentPath = path.join(baseDir, `${name}.tsx`)

  if (fs.existsSync(componentPath)) {
    console.error(`❌ Le composant "${name}" existe déjà.`)
    process.exit(1)
  }

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true })
  }

  const directive = options.client ? `'use client';\n\n` : ''

  const componentName = capitalize(name)

  const componentContent = `${directive}import React from 'react'

export default function ${componentName}() {
  return (
    <div>
      <h2>${componentName} component</h2>
    </div>
  )
}
`

  fs.writeFileSync(componentPath, componentContent)
  console.log(`✅ Composant créé : ${componentPath}`)
}
