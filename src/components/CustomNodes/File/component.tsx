import { Suspense, useEffect, useMemo, useState } from 'react'
import { DeleteOutlined, DownloadOutlined, EyeOutlined, FileZipOutlined } from '@ant-design/icons'
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { App, Button, Space, Spin, theme, Tooltip, Typography, Upload, UploadProps } from 'antd'
import { useJQEditor } from '../../../Editor'
import { useStyle } from './style'
import otherIcon from './icons/OTHER.png'

const icons = import.meta.glob('./icons/*.png', { eager: true, import: 'default' })

function Icon({ src }: { src: string }) {
  const suffix = src?.split('.').pop()?.toUpperCase()
  const imageSrc = icons[`./icons/${suffix}.png`] || otherIcon
  return <img src={imageSrc as string} />
}

export default (props: NodeViewProps) => {
  const { message } = App.useApp()
  const { token } = theme.useToken()
  const jqEditor = useJQEditor()
  const { node, updateAttributes, deleteNode } = props
  const src = useMemo(() => node.attrs.src, [node.attrs.src])
  const [uploading, setUploading] = useState(false)
  const { styles } = useStyle()

  const canPreview = useMemo(() => {
    return !!jqEditor.uploadProps?.previewFile
  }, [jqEditor.uploadProps])

  const uploadProps = useMemo<UploadProps>(() => {
    const { onChange } = jqEditor.uploadProps || {}
    return {
      showUploadList: false,
      multiple: false,
      maxCount: 1,
      ...jqEditor.uploadProps,
      onChange: info => {
        onChange?.(info)
        const { file } = info
        const { status, response } = file
        setUploading(status === 'uploading')
        if (status === 'done') {
          message.success(`${file.name} 上传成功`)
          updateAttributes({ src: response })
        }
        if (status === 'error') {
          message.error(`${file.name} 上传失败`)
        }
      },
    }
  }, [jqEditor.uploadProps])

  if (!src) {
    return (
      <NodeViewWrapper>
        <Spin spinning={uploading} tip='上传中...'>
          <Upload.Dragger {...uploadProps}>
            <div style={{ opacity: uploading ? 0.1 : 1 }}>
              <div style={{ fontSize: 32, color: token.colorPrimary }}>
                <FileZipOutlined />
              </div>
              <div style={{ margin: '8px 0 2px' }}>
                <Typography.Text>
                  <Typography.Text underline>点击或拖拽</Typography.Text> 上传文件
                </Typography.Text>
              </div>
              <Typography.Text type='secondary'>允许上传：视频、音频、OFFICE、PDF等文件</Typography.Text>
            </div>
          </Upload.Dragger>
        </Spin>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper className='file'>
      <div className={styles.file}>
        <div className='icon'>
          <Suspense>
            <Icon src={src} />
          </Suspense>
        </div>
        <div className='link'>{src}</div>
        <Space className='action'>
          {canPreview && (
            <Tooltip title='预览'>
              <Button size='small' type='text' icon={<EyeOutlined />} />
            </Tooltip>
          )}
          <Tooltip title='下载'>
            <Button size='small' type='text' icon={<DownloadOutlined />} onClick={() => window.open(src, '_blank')} />
          </Tooltip>
          <Tooltip title='删除'>
            <Button size='small' type='text' icon={<DeleteOutlined />} onClick={deleteNode} />
          </Tooltip>
        </Space>
      </div>
    </NodeViewWrapper>
  )
}
