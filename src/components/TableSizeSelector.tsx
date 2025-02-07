import { Tag } from 'antd'
import { createStyles } from 'antd-style'
import { useState } from 'react'

const MAX_ROW = 10
const MAX_COL = 10
const DEFAULT_ROW = 3
const DEFAULTCOL = 3

export default function TableSizeSelector({ onChange }: { onChange?: (row: number, col: number) => void }) {
  const { styles, cx } = useStyles()
  const [row, setRow] = useState(DEFAULT_ROW + 1)
  const [col, setCol] = useState(DEFAULTCOL + 1)
  const [currentRow, setCurrentRow] = useState(DEFAULT_ROW)
  const [currentCol, setCurrentCol] = useState(DEFAULTCOL)

  return (
    <div className={styles.selector}>
      <div>表格</div>
      {Array.from({ length: row })
        .map((_, i) => i + 1)
        .map(i => (
          <div key={`row-${i}`} className={styles.row}>
            {Array.from({ length: col })
              .map((_, j) => j + 1)
              .map(j => (
                <div
                  key={`col-${j}`}
                  className={cx(
                    styles.col,
                    i <= currentRow && j <= currentCol && 'inner',
                    i === currentRow && j === currentCol && 'current',
                  )}
                  onClick={() => onChange?.(i, j)}
                  onMouseEnter={() => {
                    setCurrentRow(i)
                    setCurrentCol(j)
                    setRow(Math.min(i + 1, MAX_ROW))
                    setCol(Math.min(j + 1, MAX_COL))
                  }}
                />
              ))}
          </div>
        ))}
      <Tag bordered={false} className={styles.tag}>
        {currentRow} x {currentCol}
      </Tag>
    </div>
  )
}

const useStyles = createStyles(({ token, css }) => ({
  selector: css`
    text-align: center;
  `,
  row: css`
    display: flex;
    margin: 4px 0;
  `,
  col: css`
    width: 20px;
    height: 20px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 2px;
    cursor: pointer;
    margin: 0 2px;
    transition: 0.4s;
    &.inner {
      background-color: ${token.colorBorderSecondary};
    }
    &.current {
      border-color: ${token.colorPrimary};
      background-color: ${token.colorPrimary};
    }
  `,
  tag: css`
    margin-bottom: 4px;
    margin-right: 0;
  `,
}))
