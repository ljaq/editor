import { Form } from 'antd'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { Editor, EditorProvider, ReactNodeViewRenderer } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './components/MenuBar'
import { useStyles } from './style'
import { useEffect, useRef } from 'react'
import CustomTaskItem from './components/CustomNodes/CustomTaskItem'

import './basic.less'

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Highlight.configure({ multicolor: true }),
  TaskList,
  TaskItem.extend({
    addNodeView() {
      return ReactNodeViewRenderer(CustomTaskItem)
    },
  }).configure({ nested: true }),
  Underline,
]

interface IProps {
  value?: string
  onChange?: (value: string) => void
  readonly?: boolean
}

export default (props: IProps) => {
  const { value, onChange, readonly } = props
  const { styles, cx } = useStyles()
  const editorRef = useRef<Editor>()
  const { status } = Form.Item.useStatus()

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getHTML()) {
      editorRef.current.commands.setContent(value || '')
    }
  }, [value])

  useEffect(() => {
    const editorDom = document.querySelector(`.${styles.editorContent}`) as HTMLDivElement
    editorDom!.onclick = e => {
      if (e.target === editorDom) {
        editorRef.current?.commands.focus()
      }
    }
  }, [])

  return (
    <div className={cx(styles.editor, status === 'error' && styles.invalid)}>
      <EditorProvider
        slotBefore={!readonly && <MenuBar />}
        autofocus={false}
        extensions={extensions}
        editable={!readonly}
        editorContainerProps={{ className: styles.editorContent }}
        onBeforeCreate={e => (editorRef.current = e.editor)}
        onUpdate={({ editor }) => {
          const html = editor.getHTML()
          if (html.match(/^<p><\/p>$/)) {
            onChange?.('')
          } else {
            onChange?.(html)
          }
        }}
      ></EditorProvider>
    </div>
  )
}
