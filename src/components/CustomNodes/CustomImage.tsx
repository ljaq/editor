import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { Divider, Image, Popover, Slider, Space } from 'antd'
import TooltipButton from '../TooltipButton'
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined } from '@ant-design/icons'
import { useMemo, useState } from 'react'

export default function CustomImage({ node, updateAttributes, selected }: NodeViewProps) {
  const [canPreview, setCanPreview] = useState(false)
  const width = useMemo(() => {
    const { style } = node.attrs
    return style.match(/width:(\d+)%/)[1] || 100
  }, [node])

  const align = useMemo(() => {
    const { style } = node.attrs
    return style.match(/text-align:(left|center|right)/)[1] || 'center'
  }, [node])

  return (
    <NodeViewWrapper>
      <Popover
        arrow={false}
        trigger='click'
        onOpenChange={e => setCanPreview(e)}
        content={
          <Space>
            <TooltipButton
              title='左对齐'
              tip={{ placement: 'top' }}
              icon={<AlignLeftOutlined />}
              active={align === 'left'}
              onClick={() => updateAttributes({ style: `width:${width}%;text-align:left` })}
            />
            <TooltipButton
              title='居中对齐'
              tip={{ placement: 'top' }}
              icon={<AlignCenterOutlined />}
              active={align === 'center'}
              onClick={() => updateAttributes({ style: `width:${width}%;text-align:center` })}
            />
            <TooltipButton
              title='右对齐'
              tip={{ placement: 'top' }}
              icon={<AlignRightOutlined />}
              active={align === 'right'}
              onClick={() => updateAttributes({ style: `width:${width}%;text-align:right` })}
            />
            <Divider type='vertical' />
            <Slider
              style={{ width: 200 }}
              min={25}
              max={100}
              value={width}
              tooltip={{ formatter: value => `${value}%` }}
              onChange={value => updateAttributes({ style: `width:${value}%;text-align:${align}` })}
            />
            <div>{width}%</div>
          </Space>
        }
      >
        <div style={{ textAlign: align }}>
          <Image src={node.attrs.src} width={`${width}%`} preview={false} />
        </div>
      </Popover>
    </NodeViewWrapper>
  )
}
