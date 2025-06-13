import fs from 'fs'
import path from 'path'

export type Options = {
  withLayout?: boolean
  client?: boolean
}

function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function createPage(name: string, options: Options) {
  const baseDir = path.join(process.cwd(), 'src', 'app', name)
  const pagePath = path.join(baseDir, 'page.tsx')
  const layoutPath = path.join(baseDir, 'layout.tsx')

  if (fs.existsSync(pagePath)) {
    console.error(`❌ La page "${name}" existe déjà.`)
    process.exit(1)
  }

  fs.mkdirSync(baseDir, { recursive: true })

  const directive = options.client ? `'use client';\n\n` : ''

  const componentName = capitalize(name.replace(/\[|\]/g, ''))

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
`

  fs.writeFileSync(pagePath, pageContent)
  console.log(`✅ Page créée : ${pagePath}`)

  if (options.withLayout && !fs.existsSync(layoutPath)) {
    const layoutContent = `import type { ReactNode } from 'react'

export default function ${componentName}Layout({ children }: { children: ReactNode }) {
  return (
    <section className="p-6">
      {children}
    </section>
  )
}
`
    fs.writeFileSync(layoutPath, layoutContent)
    console.log(`📦 Layout généré : ${layoutPath}`)
  }
}
