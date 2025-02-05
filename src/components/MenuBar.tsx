import {
  BoldOutlined,
  CaretDownOutlined,
  HeartOutlined,
  ItalicOutlined,
  RedoOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import { useCurrentEditor } from '@tiptap/react'
import { Button, Divider, Dropdown, MentionProps, MenuItemProps, MenuProps, Space, Tooltip } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { HeadingLevel } from '../types'
import { getOptionsFromEnum } from '../utils'
import IconFont from '../utils/icon'
import TooltipButton from './TooltipButton'

export default function MenuBar() {
  const { editor } = useCurrentEditor()
  const [currentHeading, setCurrentHeading] = useState(HeadingLevel.正文)

  if (!editor) {
    return null
  }

  const headingMenu: MenuProps['items'] = getOptionsFromEnum(HeadingLevel).map(item => {
    return {
      key: item.value,
      label: item.label,
      // icon: <IconFont type={item.value === HeadingLevel.正文 ? 'icon-text' : `icon-h-${item.value}`} />,
      extra: <span>⌥ ⌘ {item.value}</span>,
      onClick: () => {
        if (item.value === HeadingLevel.正文) {
          editor.chain().focus().setParagraph().run()
        } else {
          editor
            .chain()
            .focus()
            .toggleHeading({ level: Number(String(item.value).replace('heading', '')) as any })
            .run()
        }
        setCurrentHeading(item.value as any)
      },
      active: currentHeading === item.value,
    }
  })

  useEffect(() => {
    editor.on('selectionUpdate', e => {
      if (editor.isActive('paragraph')) {
        return setCurrentHeading(HeadingLevel.正文)
      }
      if (editor.isActive('heading', { level: 1 })) {
        return setCurrentHeading(HeadingLevel.一级标题)
      }
      if (editor.isActive('heading', { level: 2 })) {
        return setCurrentHeading(HeadingLevel.二级标题)
      }
      if (editor.isActive('heading', { level: 3 })) {
        return setCurrentHeading(HeadingLevel.三级标题)
      }
      if (editor.isActive('heading', { level: 4 })) {
        return setCurrentHeading(HeadingLevel.四级标题)
      }
      if (editor.isActive('heading', { level: 5 })) {
        return setCurrentHeading(HeadingLevel.五级标题)
      }
      if (editor.isActive('heading', { level: 6 })) {
        return setCurrentHeading(HeadingLevel.六级标题)
      }
    })
  }, [])

  return (
    <div>
      <Space size={2}>
        <TooltipButton
          title='撤销'
          shortcut='⌘ Z'
          icon={<IconFont type='icon-undo' />}
          onClick={editor.chain().focus().undo().run}
          disabled={!editor.can().chain().focus().undo().run()}
        />
        <TooltipButton
          title='重做'
          shortcut='⌘ Y'
          icon={<IconFont type='icon-redo' />}
          onClick={editor.chain().focus().redo().run}
          disabled={!editor.can().chain().focus().redo().run()}
        />
        <Divider type='vertical' />
        <Dropdown menu={{ items: headingMenu, activeKey: String(currentHeading) }}>
          <Button type='text' iconPosition='end' icon={<CaretDownOutlined />}>
            {HeadingLevel[currentHeading]}
          </Button>
        </Dropdown>
        <TooltipButton
          title='加粗'
          shortcut='⌘ B'
          icon={<BoldOutlined />}
          active={editor.isActive('bold')}
          onClick={editor.chain().focus().toggleBold().run}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        />
        <TooltipButton
          title='倾斜'
          shortcut='⌘ I'
          icon={<ItalicOutlined />}
          active={editor.isActive('italic')}
          onClick={editor.chain().focus().toggleItalic().run}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        />
        {/* <TooltipButton
          title='下划线'
          shortcut='⌘ U'
          icon={<UnderlineOutlined />}
          active={editor.isActive('underline')}
          onClick={editor.chain().focus().under().run}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
        /> */}
        <TooltipButton
          title='删除线'
          shortcut='⌘ D'
          icon={<StrikethroughOutlined />}
          active={editor.isActive('strike')}
          onClick={editor.chain().focus().toggleStrike().run}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        />
        <TooltipButton
          title='代码'
          shortcut='⌘ E'
          icon={<IconFont type='icon-inlinecode' />}
          active={editor.isActive('code')}
          onClick={editor.chain().focus().toggleCode().run}
          disabled={!editor.can().chain().focus().toggleCode().run()}
        />
      </Space>
    </div>
  )

  return (
    <div className='control-group'>
      <div className='button-group'>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>Clear marks</button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes</button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          Blockquote
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>Horizontal rule</button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>Hard break</button>
        <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
        >
          Purple
        </button>
      </div>
    </div>
  )
}
