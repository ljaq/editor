import { Button, Tooltip, TooltipProps } from 'antd'
import { CSSProperties, ReactNode } from 'react'

export default function TooltipButton({
  title,
  shortcut,
  icon,
  onClick,
  disabled,
  active,
  tip,
  loading,
  style,
}: {
  title: string
  shortcut?: string
  icon: ReactNode
  onClick?: () => void
  disabled?: boolean
  active?: boolean
  tip?: TooltipProps
  loading?: boolean
  style?: CSSProperties
}) {
  return (
    <Tooltip
      title={
        <div style={{ textAlign: 'center' }}>
          <div>{title}</div>
          {shortcut && <div style={{ fontSize: 'smaller' }}>{shortcut}</div>}
        </div>
      }
      placement='bottom'
      {...tip}
      open={disabled ? false : undefined}
      getPopupContainer={el => el.parentElement!}
    >
      <Button
        type='text'
        size='small'
        loading={loading}
        onClick={onClick}
        icon={icon}
        disabled={disabled}
        style={{ background: active ? 'rgba(0,0,0,0.08)' : '', ...style }}
      />
    </Tooltip>
  )
}
