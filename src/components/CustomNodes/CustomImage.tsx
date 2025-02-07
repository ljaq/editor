import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { App, Divider, Image, Popover, Slider, Space } from 'antd'
import TooltipButton from '../TooltipButton'
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useMemo } from 'react'

export default function CustomImage({ node, updateAttributes, deleteNode }: NodeViewProps) {
  const { message } = App.useApp()
  const width = useMemo(() => {
    const { style } = node.attrs
    return style.match(/width:(\d+)%/)[1] || 100
  }, [node])

  const margin = useMemo(() => {
    const { style } = node.attrs
    return style.match(/margin:(0 auto 0 0|0 auto 0|0 0 0 auto)/)[1] || '0 auto 0'
  }, [node])

  const handleCopySrc = () => {
    navigator.clipboard.writeText(node.attrs.src).then(() => {
      message.success('复制成功')
    })
  }

  return (
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
  )
}
