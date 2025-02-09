import { NodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { CaretDownOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Collapse, ConfigProvider, Divider, Input, Row, Select, Space, Tooltip, theme as antTheme } from 'antd'
import { Fragment, useMemo } from 'react'
import { getShiki, loadTheme } from './highlighter'
import { createStyles } from 'antd-style'
import lanIcons from './icons'
import { languages, themes } from './config'

export default function CustomCodeBlock({ node, updateAttributes, deleteNode, editor }: NodeViewProps) {
  const language = useMemo(() => node.attrs['language'], [node])
  const theme = useMemo(() => node.attrs['theme'], [node])
  const codeName = useMemo(() => node.attrs['name'], [node])
  const { styles } = useStyles({ theme })
  const editable = useMemo(() => editor.isEditable, [editor])

  const isDark = useMemo(() => {
    const shiki = getShiki()
    if (!shiki?.getLoadedThemes()?.includes(theme)) return false
    return shiki.getTheme(theme)?.type === 'dark'
  }, [theme])

  return (
    <NodeViewWrapper>
      <ConfigProvider theme={{ algorithm: isDark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm }}>
        <Collapse
          size='small'
          className={styles.codeBlock}
          expandIcon={({ isActive }) => (
            <Tooltip title={isActive ? '收起' : '展开'}>
              <Button
                size='small'
                type='text'
                className='close-btn'
                icon={
                  editable ? (
                    <CaretDownOutlined
                      style={{ transition: '0.4s', transform: `rotate(${isActive ? '0' : '-90deg'})` }}
                    />
                  ) : (
                    <img style={{ width: 18 }} src={(lanIcons as any)[language] || lanIcons.plaintext} />
                  )
                }
              ></Button>
            </Tooltip>
          )}
          defaultActiveKey={1}
          items={[
            {
              key: 1,
              collapsible: 'icon',
              label: (
                <Input
                  size='small'
                  placeholder='请输入代码块名称'
                  variant='borderless'
                  style={{ maxWidth: 200 }}
                  defaultValue={codeName}
                  onBlur={e => updateAttributes({ name: e.target.value })}
                />
              ),
              extra: (
                <Space>
                  {editable ? (
                    <Fragment>
                      <Select
                        size='small'
                        showSearch
                        popupMatchSelectWidth={false}
                        variant='borderless'
                        value={language}
                        optionLabelProp='display'
                        optionFilterProp='display'
                        filterOption={(input, option: any) =>
                          option!.display.toLowerCase().includes(input.toLowerCase())
                        }
                        options={languages.map((lan: any) => ({
                          display: lan || 'plain text',
                          label: (
                            <Row>
                              <img
                                style={{ width: 18, marginRight: 8 }}
                                src={(lanIcons as any)[lan] || lanIcons.plaintext}
                              />
                              <code>{lan || 'plain text'}</code>
                            </Row>
                          ),
                          value: lan,
                        }))}
                        onChange={lan => updateAttributes({ language: lan })}
                      />
                      <Select
                        showSearch
                        size='small'
                        popupMatchSelectWidth={false}
                        variant='borderless'
                        options={themes.map(theme => ({ label: theme, value: theme }))}
                        value={theme}
                        filterOption={(input, option) => option!.label.toLowerCase().includes(input.toLowerCase())}
                        onChange={(value: string) =>
                          loadTheme(value as any).then(() => {
                            updateAttributes({ theme: value })
                          })
                        }
                      />
                    </Fragment>
                  ) : (
                    <pre style={{ margin: 0, opacity: 0.65 }}>{language || 'plain text'}</pre>
                  )}
                  <Divider type='vertical' style={{ margin: 0 }} />
                  <Button
                    size='small'
                    type='text'
                    icon={<CopyOutlined />}
                    onClick={e => {
                      e.stopPropagation()
                    }}
                  />
                  <Button size='small' type='text' icon={<DeleteOutlined />} onClick={() => deleteNode()} />
                </Space>
              ),
              children: <NodeViewContent />,
            },
          ]}
        ></Collapse>
      </ConfigProvider>
    </NodeViewWrapper>
  )
}

const useStyles = createStyles<{ theme: string }, { codeBlock: any }>(({ css, token, isDarkMode }, { theme }) => {
  const shiki = getShiki()
  const themeConf = shiki?.getLoadedThemes().includes(theme) ? shiki?.getTheme(theme) : null

  return {
    codeBlock: css`
      overflow: hidden;
      border-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
      font-family: 'JetBrains Mono', 'Menlo', 'Consolas';
      margin: 1rem 0 !important;
      .ant-select,
      .ant-input {
        font-family: 'JetBrains Mono', 'Menlo', 'Consolas';
      }
      .ant-collapse-item {
        border-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
        background-color: ${themeConf?.bg};
      }
      .ant-collapse-header {
        align-items: center;
        border-radius: 0px !important;
        background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
      }
      .ant-collapse-content {
        border-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'};
        background-color: transparent;
      }
    `,
  }
})
