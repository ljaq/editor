import { createContext, useContext, useEffect, useRef } from 'react'
import { App, ConfigProvider, Form, UploadProps } from 'antd'
import zh_CN from 'antd/locale/zh_CN'
import { Editor as TiptapEditor, EditorProvider } from '@tiptap/react'
import MenuBar from './components/MenuBar'
import { useStyles } from './style'
import extensions from './extensions'

export interface EditorProps {
  value?: string
  onChange?: (value: string) => void
  readonly?: boolean
  uploadProps?: UploadProps
  mode?: 'card' | 'fullPage'
}

const JQEditorContext = createContext<EditorProps>({})

export function useJQEditor() {
  return useContext(JQEditorContext)
}

export function Editor(props: EditorProps) {
  const { value, onChange, readonly, mode = 'card' } = props
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
        <JQEditorContext.Provider value={{ ...props }}>
          <div className={cx(styles.editor, status === 'error' && styles.invalid, mode)}>
            <EditorProvider
              slotBefore={!readonly && <MenuBar />}
              autofocus={false}
              extensions={extensions}
              editable={!readonly}
              editorContainerProps={{ className: cx(styles.editorContent, mode), spellCheck: false }}
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
        </JQEditorContext.Provider>
      </App>
    </ConfigProvider>
  )
}
