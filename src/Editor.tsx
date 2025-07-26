import { App, ConfigProvider, Form } from 'antd'
import zh_CN from 'antd/locale/zh_CN'
import { Color } from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import Highlight from '@tiptap/extension-highlight'
import ListItem from '@tiptap/extension-list-item'
import { TextStyle } from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Placeholder from '@tiptap/extension-placeholder'
import { Table } from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { Editor as TiptapEditor, EditorProvider, ReactNodeViewRenderer } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './components/MenuBar'
import { useStyles } from './style'
import { useEffect, useRef } from 'react'
import CustomTaskItem from './components/CustomNodes/CustomTaskItem'
import CustomImage from './components/CustomNodes/CustomImage'
import Shiki from './plugins/shiki'

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as any),
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
  Placeholder.configure({
    placeholder: () => {
      return 'Can you add some further context?'
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
  Image.extend({
    addAttributes() {
      return {
        src: {
          default: null,
        },
        alt: {
          default: null,
        },
        title: {
          default: null,
        },
        style: {
          default: 'display:block;margin:0 auto 0;width:100%;',
        },
      }
    },
    addNodeView() {
      return ReactNodeViewRenderer(CustomImage)
    },
  }),
  Underline,
  Table.configure({ resizable: true }),
  TableRow,
  TableHeader,
  TableCell,
  Shiki,
]

export interface EditorProps {
  value?: string
  onChange?: (value: string) => void
  readonly?: boolean
}

export function Editor(props: EditorProps) {
  const { value, onChange, readonly } = props
  const { styles, cx } = useStyles()
  const editorRef = useRef<TiptapEditor>()
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
    <ConfigProvider locale={zh_CN}>
      <App>
        <div className={cx(styles.editor, status === 'error' && styles.invalid)}>
          <EditorProvider
            slotBefore={!readonly && <MenuBar />}
            autofocus={false}
            extensions={extensions}
            editable={!readonly}
            editorContainerProps={{ className: styles.editorContent, spellCheck: false }}
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
      </App>
    </ConfigProvider>
  )
}
