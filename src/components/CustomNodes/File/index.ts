import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import Component from './component'

export default Node.create({
  name: 'file',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      src: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'file',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['file', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component)
  },
})
