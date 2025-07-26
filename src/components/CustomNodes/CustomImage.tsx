import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { App, Divider, Image, Popover, Slider, Space, Spin, theme, Typography, Upload, UploadProps } from 'antd'
import TooltipButton from '../TooltipButton'
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  CopyOutlined,
  DeleteOutlined,
  FileImageOutlined,
} from '@ant-design/icons'
import { useMemo, useState } from 'react'
import { useJQEditor } from '../../Editor'

export default function CustomImage({ node, updateAttributes, deleteNode }: NodeViewProps) {
  const { message } = App.useApp()
  const { token } = theme.useToken()
  const src = useMemo(() => node.attrs.src, [node])
  const jqEditor = useJQEditor()
  const [uploading, setUploading] = useState(false)

  const uploadProps = useMemo<UploadProps>(() => {
    const { onChange } = jqEditor.uploadProps || {}
    return {
      accept: '.jpg,.jpeg,.png,.gif',
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

  const width = useMemo(() => {
    const { style } = node.attrs
    return style.match(/width:(\d+)%/)?.[1] || 100
  }, [node])

  const margin = useMemo(() => {
    const { style } = node.attrs
    return style.match(/margin:(0 auto 0 0|0 auto 0|0 0 0 auto)/)?.[1] || '0 auto 0'
  }, [node])

  const handleCopySrc = () => {
    navigator.clipboard.writeText(node.attrs.src).then(() => {
      message.success('复制成功')
    })
  }

  return src ? (
    <Popover
      arrow={false}
      content={
        <Space>
          <TooltipButton
            title='删除'
            tip={{ placement: 'top' }}
            icon={<DeleteOutlined />}
            onClick={() => deleteNode()}
          />
          <TooltipButton title='复制链接' tip={{ placement: 'top' }} icon={<CopyOutlined />} onClick={handleCopySrc} />
          <Divider type='vertical' style={{ margin: 0 }} />
          <TooltipButton
            title='左对齐'
            tip={{ placement: 'top' }}
            icon={<AlignLeftOutlined />}
            active={margin === 'left'}
            onClick={() => updateAttributes({ style: `display:block;width:${width}%;margin:0 auto 0 0` })}
          />
          <TooltipButton
            title='居中对齐'
            tip={{ placement: 'top' }}
            icon={<AlignCenterOutlined />}
            active={margin === 'center'}
            onClick={() => updateAttributes({ style: `display:block;width:${width}%;margin:0 auto 0` })}
          />
          <TooltipButton
            title='右对齐'
            tip={{ placement: 'top' }}
            icon={<AlignRightOutlined />}
            active={margin === 'right'}
            onClick={() => updateAttributes({ style: `display:block;width:${width}%;margin:0 0 0 auto` })}
          />
          <Divider type='vertical' style={{ margin: 0 }} />
          <Slider
            style={{ width: 200 }}
            min={25}
            max={100}
            value={width}
            tooltip={{ open: false }}
            onChange={value => updateAttributes({ style: `display:block;width:${value}%;margin:${margin}` })}
          />
          <div>{width}%</div>
        </Space>
      }
    >
      <NodeViewWrapper>
        <Image src={node.attrs.src} width={`${width}%`} wrapperStyle={{ display: 'block', margin: margin }} />
      </NodeViewWrapper>
    </Popover>
  ) : (
    <NodeViewWrapper>
      <Spin spinning={uploading} tip='上传中...'>
        <Upload.Dragger {...uploadProps}>
          <div style={{ opacity: uploading ? 0.1 : 1 }}>
            <div style={{ fontSize: 32, color: token.colorPrimary }}>
              <FileImageOutlined />
            </div>
            <div style={{ margin: '8px 0 2px' }}>
              <Typography.Text>
                <Typography.Text underline>点击或拖拽</Typography.Text> 上传图片
              </Typography.Text>
            </div>
            <Typography.Text type='secondary'>支持格式为：JPG、JPEG、PNG、GIF</Typography.Text>
          </div>
        </Upload.Dragger>
      </Spin>
    </NodeViewWrapper>
  )
}
