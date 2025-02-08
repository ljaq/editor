/** @jsxImportSource @emotion/react */
import { NodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { CaretDownOutlined, CopyOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Collapse, ConfigProvider, Row, Select, Skeleton, Space, Spin, theme, Tooltip } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { getShiki } from './highlighter'

export enum Language {
  '' = 'plain text',
  html = 'html',
  css = 'css',
  javascript = 'javascript',
  typescript = 'typescript',
  tsx = 'tsx',
  vue = 'vue',
  java = 'java',
  c = 'c',
  python = 'python',
  ruby = 'ruby',
  sql = 'sql',
  go = 'go',
  markdown = 'markdown',
  json = 'json',
}

export default function CustomCodeBlock({ node, updateAttributes, deleteNode, editor }: NodeViewProps) {
  const [loading, setLoading] = useState(false)
  const language = useMemo(() => node.attrs['language'], [node])
  const editable = useMemo(() => editor.isEditable, [editor])
  const shiki = getShiki()
  const {
    token: { colorBorderSecondary, fontFamilyCode },
  } = theme.useToken()

  console.log(node)

  // const loadLan = async lan => {
  //   if (lan && !highlighter.getLoadedLanguages().includes(lan)) {
  //     setLoading(true)
  //     setAttrs({ language: '' })
  //     await highlighter.loadLanguage(lan)
  //     await sleep(500)
  //   }
  //   setAttrs({ language: lan })
  //   setLoading(false)
  // }

  // useEffect(() => {
  //   if (!editorLoading) {
  //     loadLan(language)
  //   }
  // }, [language, editorLoading])

  return (
    <NodeViewWrapper>
      <Collapse
        // @ts-ignore
        contentEditable={false}
        size='small'
        css={css({
          overflow: 'hidden',
          borderColor: colorBorderSecondary,
          transition: '0.4s',
          '.ant-collapse-header': {
            alignItems: 'center',
          },
          '.ant-collapse-content': {
            borderColor: colorBorderSecondary,
          },
          '.ant-collapse-item': {
            borderColor: colorBorderSecondary,
            transition: '0.4s',
          },
          '.ant-select-selection-item': {
            fontFamily: fontFamilyCode,
          },
          '.close-btn': {
            display: 'flex',
            justifyContent: 'center',
          },
          '.ant-select-arrow': {
            display: 'none',
          },
        })}
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
                  <img style={{ width: 18 }} src={`/languages/icons/${language || 'txt'}.svg`} />
                )
              }
            ></Button>
          </Tooltip>
        )}
        defaultActiveKey={1}
        style={{ margin: '8px 0' }}
      >
        <Collapse.Panel
          key={1}
          collapsible='icon'
          header={
            editable ? (
              <Select
                // @ts-ignore
                contentEditable={false}
                size='small'
                showSearch
                style={{ fontFamily: fontFamilyCode }}
                popupMatchSelectWidth={false}
                bordered={false}
                defaultValue={language || ''}
                optionLabelProp='display'
                optionFilterProp='display'
                filterOption={(input, option) => option!.display.toLowerCase().includes(input.toLowerCase())}
                options={[
                  ...Object.keys(Language).map((lan: any) => ({
                    display: lan || 'plain text',
                    label: (
                      <Row>
                        <img style={{ width: 18, marginRight: 8 }} src={`/languages/icons/${lan || 'txt'}.svg`} />
                        <code>{lan || 'plain text'}</code>
                      </Row>
                    ),
                    value: lan,
                  })),
                ]}
                onChange={lan => updateAttributes({ language: lan })}
              />
            ) : (
              <pre style={{ margin: 0, opacity: 0.65 }}>{language || 'plain text'}</pre>
            )
          }
          extra={
            !editable && (
              <Button
                size='small'
                type='text'
                icon={<CopyOutlined />}
                style={{ opacity: 0.65 }}
                onClick={e => {
                  e.stopPropagation()
                  // copyText(node.textContent)
                }}
              >
                复制代码
              </Button>
            )
          }
        >
          <Spin spinning={loading} size='small'>
            <NodeViewContent />
          </Spin>
        </Collapse.Panel>
      </Collapse>
    </NodeViewWrapper>
  )
}
