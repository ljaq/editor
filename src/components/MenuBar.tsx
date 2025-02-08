import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  CaretDownOutlined,
  ItalicOutlined,
  LineOutlined,
  OrderedListOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { InsertTable, Picture, Quote, Back, Next, Code, List } from '@icon-park/react'
import { useCurrentEditor } from '@tiptap/react'
import { Button, ColorPicker, Divider, Dropdown, MenuProps, Popover, Space } from 'antd'
import { useEffect, useState } from 'react'
import { HeadingLevel } from '../types'
import { getOptionsFromEnum } from '../utils'
import TooltipButton from './TooltipButton'
import { useStyles } from '../style'
import { colorList } from '../config'
import FontColorIcon from './FontColorIcon'
import moreColorIcon from '../assets/more-color.png'
import BgColorIcon from './BgColorIcon'
import TableSizeSelector from './TableSizeSelector'
import '@icon-park/react/styles/index.css'

export default function MenuBar() {
  const { styles } = useStyles()
  const { editor } = useCurrentEditor()
  const [currentHeading, setCurrentHeading] = useState(HeadingLevel.正文)
  const [lastCustomColor, setLastCustomColor] = useState<string>('#df2a3f')
  const [lastCustomBg, setLastCustomBg] = useState<string>('#FBDE28')

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
        return setCurrentHeading(HeadingLevel.标题1)
      }
      if (editor.isActive('heading', { level: 2 })) {
        return setCurrentHeading(HeadingLevel.标题2)
      }
      if (editor.isActive('heading', { level: 3 })) {
        return setCurrentHeading(HeadingLevel.标题3)
      }
      if (editor.isActive('heading', { level: 4 })) {
        return setCurrentHeading(HeadingLevel.标题4)
      }
      if (editor.isActive('heading', { level: 5 })) {
        return setCurrentHeading(HeadingLevel.标题5)
      }
      if (editor.isActive('heading', { level: 6 })) {
        return setCurrentHeading(HeadingLevel.标题6)
      }
    })
  }, [])

  return (
    <div className={styles.menuBar}>
      <Space wrap>
        <TooltipButton
          title='撤销'
          shortcut='⌘ Z'
          icon={<Back />}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        />
        <TooltipButton
          title='重做'
          shortcut='⌘ Y'
          icon={<Next />}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        />
        <Divider type='vertical' style={{ margin: 2 }} />
        <Dropdown
          trigger={['click']}
          menu={{ selectable: true, items: headingMenu, selectedKeys: [String(currentHeading)] }}
        >
          <Button
            type='text'
            iconPosition='end'
            icon={<CaretDownOutlined />}
            size='small'
            style={{ width: 70, justifyContent: 'start' }}
          >
            {HeadingLevel[currentHeading]}
          </Button>
        </Dropdown>
        <TooltipButton
          title='加粗'
          shortcut='⌘ B'
          icon={<BoldOutlined />}
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        />
        <TooltipButton
          title='倾斜'
          shortcut='⌘ I'
          icon={<ItalicOutlined />}
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        />
        <TooltipButton
          title='下划线'
          shortcut='⌘ U'
          icon={<UnderlineOutlined />}
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
        />
        <TooltipButton
          title='删除线'
          shortcut='⌘ D'
          icon={<StrikethroughOutlined />}
          active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        />
        <TooltipButton
          title='代码'
          shortcut='⌘ E'
          icon={<Code />}
          active={editor.isActive('code')}
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
        />
        <Divider type='vertical' style={{ margin: 2 }} />
        <Space.Compact>
          <TooltipButton
            title='字体颜色'
            icon={<FontColorIcon currentColor={lastCustomColor} />}
            onClick={() => editor.chain().focus().setColor(lastCustomColor).run()}
          />

          <Dropdown
            trigger={['click']}
            getPopupContainer={e => e.parentElement!}
            dropdownRender={() => (
              <div className='ant-dropdown-menu'>
                <div className='ant-dropdown-menu-item' onClick={() => editor.chain().focus().unsetColor().run()}>
                  <Space>
                    <div className='color-preview default' />
                    <span>默认</span>
                  </Space>
                </div>
                <Divider style={{ margin: '4px 0' }} />
                <div className='color-preview-menu'>
                  {colorList.map((item, index) => (
                    <Space key={index} className='color-preview-row'>
                      {item.map((color, index) => (
                        <div
                          className={`color-preview clickable ${
                            editor.isActive('textStyle', { color }) ? 'active' : ''
                          }`}
                          style={{ backgroundColor: color }}
                          key={color}
                          onClick={() => {
                            editor.chain().focus().setColor(color).run()
                            setLastCustomColor(color)
                          }}
                        />
                      ))}
                    </Space>
                  ))}
                </div>
                <Divider style={{ margin: '4px 0' }} />
                <ColorPicker
                  value={editor.getAttributes('textStyle').color || '#000000'}
                  onChange={value => {
                    const color = value.toHexString()
                    editor.chain().focus().setColor(color).run()
                    setLastCustomColor(color)
                  }}
                  disabledAlpha
                  disabledFormat
                  placement='rightTop'
                  getPopupContainer={el => el.parentNode as HTMLElement}
                >
                  <div className='ant-dropdown-menu-item'>
                    <Space>
                      <img src={moreColorIcon} className='more-color-icon' />
                      更多颜色
                    </Space>
                  </div>
                </ColorPicker>
              </div>
            )}
          >
            <TooltipButton title='字体颜色' icon={<CaretDownOutlined />} style={{ width: 12 }} />
          </Dropdown>
        </Space.Compact>
        <Space.Compact>
          <TooltipButton
            title='背景颜色'
            icon={<BgColorIcon currentColor={lastCustomBg} />}
            onClick={() => editor.chain().focus().setHighlight({ color: lastCustomBg }).run()}
          />

          <Dropdown
            trigger={['click']}
            getPopupContainer={e => e.parentElement!}
            dropdownRender={() => (
              <div className='ant-dropdown-menu'>
                <div className='ant-dropdown-menu-item' onClick={() => editor.chain().focus().unsetHighlight().run()}>
                  <Space>
                    <div className='color-preview default' />
                    <span>无填充色</span>
                  </Space>
                </div>
                <Divider style={{ margin: '4px 0' }} />
                <div className='color-preview-menu'>
                  {colorList.map((item, index) => (
                    <Space key={index} className='color-preview-row'>
                      {item.map((color, index) => (
                        <div
                          className={`color-preview clickable ${
                            editor.isActive('textStyle', { color }) ? 'active' : ''
                          }`}
                          style={{ backgroundColor: color }}
                          key={color}
                          onClick={() => {
                            editor.chain().focus().setHighlight({ color }).run()
                            setLastCustomBg(color)
                          }}
                        />
                      ))}
                    </Space>
                  ))}
                </div>
                <Divider style={{ margin: '4px 0' }} />
                <ColorPicker
                  value={editor.getAttributes('textStyle').color || '#000000'}
                  onChange={value => {
                    const color = value.toHexString()
                    editor.chain().focus().setHighlight({ color }).run()
                    setLastCustomColor(color)
                  }}
                  disabledAlpha
                  disabledFormat
                  placement='rightTop'
                  getPopupContainer={el => el.parentNode as HTMLElement}
                >
                  <div className='ant-dropdown-menu-item'>
                    <Space>
                      <img src={moreColorIcon} className='more-color-icon' />
                      更多颜色
                    </Space>
                  </div>
                </ColorPicker>
              </div>
            )}
          >
            <TooltipButton title='背景颜色' icon={<CaretDownOutlined />} style={{ width: 12 }} />
          </Dropdown>
        </Space.Compact>
        <TooltipButton
          title='插入图片'
          shortcut='⌘ E'
          icon={<Picture />}
          onClick={() =>
            editor.chain().focus().setImage({ src: 'https://cn.bing.com/rp/kAwiv9gc4HPfHSU3xUQp2Xqm5wA.png' }).run()
          }
          disabled={!editor.can().chain().focus().toggleCode().run()}
        />
        <Divider type='vertical' style={{ margin: 2 }} />
        <Dropdown
          trigger={['click']}
          dropdownRender={() => (
            <div className='ant-dropdown-menu'>
              <Space>
                <TooltipButton
                  title='左对齐'
                  icon={<AlignLeftOutlined />}
                  active={editor.isActive({ textAlign: 'left' })}
                  onClick={() => editor.chain().focus().setTextAlign('left').run()}
                />
                <TooltipButton
                  title='居中对齐'
                  icon={<AlignCenterOutlined />}
                  active={editor.isActive({ textAlign: 'center' })}
                  onClick={() => editor.chain().focus().setTextAlign('center').run()}
                />
                <TooltipButton
                  title='右对齐'
                  icon={<AlignRightOutlined />}
                  active={editor.isActive({ textAlign: 'right' })}
                  onClick={() => editor.chain().focus().setTextAlign('right').run()}
                />
              </Space>
            </div>
          )}
        >
          <Button type='text' size='small' autoInsertSpace={false}>
            <div>
              {editor.isActive({ textAlign: 'center' }) ? (
                <AlignCenterOutlined />
              ) : editor.isActive({ textAlign: 'right' }) ? (
                <AlignRightOutlined />
              ) : (
                <AlignLeftOutlined />
              )}
              <CaretDownOutlined />
            </div>
          </Button>
        </Dropdown>
        <TooltipButton
          title='无序列表'
          shortcut='⌘ ⇧ 7'
          icon={<UnorderedListOutlined />}
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
        />
        <TooltipButton
          title='有序列表'
          shortcut='⇧ ⌘ 8'
          icon={<OrderedListOutlined />}
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        />
        <TooltipButton
          title='任务列表'
          shortcut='⇧ ⌘ 8'
          icon={<List />}
          active={editor.isActive('taskList')}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          disabled={!editor.can().chain().focus().toggleTaskList().run()}
        />
        <Divider type='vertical' style={{ margin: 2 }} />
        <Popover
          destroyTooltipOnHide
          placement='bottom'
          content={() => (
            <TableSizeSelector
              onChange={(rows, cols) => editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()}
            />
          )}
        >
          <Button
            size='small'
            icon={<InsertTable />}
            type='text'
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          />
        </Popover>
        <TooltipButton
          title='插入引用'
          shortcut='⇧ ⌘ U'
          icon={<Quote />}
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={!editor.can().chain().focus().toggleBlockquote().run()}
        />
        <TooltipButton
          title='插入分隔线'
          shortcut='⇧ ⌘ U'
          icon={<LineOutlined />}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </Space>
    </div>
  )
}
