import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { Checkbox, Input, Space } from 'antd'
import { createStyles } from 'antd-style'

export default function CustomTaskList({ node, updateAttributes }: NodeViewProps) {
  const { styles } = useStyles()

  return (
    <NodeViewWrapper>
      <div className={styles.taskItem}>
        <Checkbox
          checked={node.attrs.checked}
          onChange={e => updateAttributes({ checked: e.target.checked })}
        ></Checkbox>
        <NodeViewContent />
      </div>
    </NodeViewWrapper>
  )
}

const useStyles = createStyles(({ css }) => {
  return {
    taskItem: css`
      display: flex;
      align-items: flex-start;
      margin-left: -16px;
      p {
        margin: 0;
        margin-left: 8px;
      }
    `,
  }
})
