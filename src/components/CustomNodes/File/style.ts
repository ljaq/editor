import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    file: css`
      display: flex;
      align-items: center;
      padding: ${token.sizeSM}px;
      border-radius: ${token.borderRadius}px;
      border: 1px solid ${token.colorBorderSecondary};
      margin: ${token.sizeSM}px 0;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background: ${token.colorFillSecondary};
      }
      .icon {
        flex-shrink: 0;
        margin-right: ${token.sizeSM}px;
        img {
          width: 32px;
          height: 32px;
        }
      }
      .link {
        flex-grow: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .action {
        flex-shrink: 0;
      }
    `,
  }
})
