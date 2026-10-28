import { useEffect, useState, type CSSProperties } from 'react'
import { createHighlighterCore, type HighlighterCore, type ThemedToken } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

import { cn } from '@dkrasniy/ui/lib/utils'

type CodeLanguage = 'tsx' | 'css' | 'json'

let highlighter: Promise<HighlighterCore> | undefined

function loadHighlighter() {
  highlighter ??= createHighlighterCore({
    themes: [
      import('shiki/themes/github-light.mjs'),
      import('shiki/themes/github-dark.mjs'),
    ],
    langs: [
      import('shiki/langs/tsx.mjs'),
      import('shiki/langs/css.mjs'),
      import('shiki/langs/json.mjs'),
    ],
    engine: createJavaScriptRegexEngine(),
  })
  return highlighter
}

function CodeBlock({
  code,
  language,
  className,
}: {
  code: string
  language: CodeLanguage
  className?: string
}) {
  const [highlighted, setHighlighted] = useState<{
    code: string
    language: CodeLanguage
    lines: ThemedToken[][]
  } | null>(null)

  useEffect(() => {
    let current = true
    void loadHighlighter().then((loaded) => {
      if (!current) return
      const { tokens } = loaded.codeToTokens(code, {
        lang: language,
        themes: { light: 'github-light', dark: 'github-dark' },
        defaultColor: false,
      })
      setHighlighted({ code, language, lines: tokens })
    })
    return () => {
      current = false
    }
  }, [code, language])

  const lines: ThemedToken[][] =
    highlighted?.code === code && highlighted.language === language
      ? highlighted.lines
      : code.split('\n').map((line) => [{ content: line, offset: 0 }])

  return (
    <pre
      data-slot="code-block"
      className={cn('overflow-auto py-4 font-mono text-xs leading-6', className)}
    >
      {lines.map((tokens, index) => (
        <div key={index} className="flex">
          <span className="text-subtle-foreground/70 w-12 shrink-0 pr-5 text-right select-none">
            {index + 1}
          </span>
          <span className="pr-4 whitespace-pre">
            {tokens.map((token, at) => (
              <span
                key={at}
                style={token.htmlStyle as CSSProperties | undefined}
                className="text-(--shiki-light) dark:text-(--shiki-dark)"
              >
                {token.content}
              </span>
            ))}
          </span>
        </div>
      ))}
    </pre>
  )
}

export { CodeBlock, type CodeLanguage }
