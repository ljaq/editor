import CodeBlock, { CodeBlockOptions } from '@tiptap/extension-code-block'
import { BundledLanguage, BundledTheme } from 'shiki'

import { ShikiPlugin } from './shiki-plugin'
import { ReactNodeViewRenderer } from '@tiptap/react'
import CustomCodeBlock from './CustomCodeBlock.tsx'

export interface CodeBlockShikiOptions extends CodeBlockOptions {
  defaultLanguage: BundledLanguage | null | undefined
  defaultTheme: BundledTheme
}

export const Shiki = CodeBlock.extend<CodeBlockShikiOptions>({
  addAttributes() {
    return {
      ...this.parent?.(),
      theme: {
        default: 'ayu-light',
      },
    }
  },
  addOptions() {
    return {
      ...this.parent?.(),
      defaultLanguage: null,
      defaultTheme: 'github-light',
    }
  },

  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() || []),
      ShikiPlugin({
        name: this.name,
        defaultLanguage: this.options.defaultLanguage,
        defaultTheme: this.options.defaultTheme,
      }),
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomCodeBlock)
  },
})
