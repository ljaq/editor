import { mergeAttributes } from '@tiptap/core'
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
        parseHTML: element => {
          const language = element.getAttribute('data-theme')
          if (!language) {
            return 'ayu-light'
          }
          return language
        },
        rendered: false,
      },
      language: {
        default: 'plaintext',
        parseHTML: element => {
          const language = element.getAttribute('data-language')
          if (!language) {
            return 'plaintext'
          }
          return language
        },
        rendered: false,
      },
      name: {
        default: '',
        parseHTML: element => {
          const name = element.getAttribute('data-name')
          if (!name) {
            return ''
          }
          return name
        },
        rendered: false,
      },
    }
  },
  addOptions() {
    return {
      ...this.parent?.(),
      defaultLanguage: null,
      defaultTheme: 'ayu-light' as any,
    }
  },

  addProseMirrorPlugins() {
    return [...(this.parent?.() || []), ShikiPlugin({ name: this.name })]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'pre',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-language': node.attrs.language || null,
        'data-theme': node.attrs.theme || null,
        'data-name': node.attrs.name || null,
      }),
      ['code', {}, 0],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomCodeBlock)
  },
})
