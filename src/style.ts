import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    editor: css`
      position: relative;
      border: 1px solid #d9d9d9;
      border-radius: ${token.borderRadius}px;
      overflow: auto;
      height: 400px;
      transition: 0.2s;
      &:hover {
        border-color: ${token.colorPrimaryBorderHover};
      }
      &:has(.ProseMirror-focused) {
        border-color: ${token.colorPrimaryActive};
        box-shadow: 0 0 0 2px ${token.colorPrimaryBg};
      }
    `,
    menuBar: css`
      position: sticky;
      top: 0;
      padding: 8px;
      border-bottom: 1px solid ${token.colorBorderSecondary};
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
      z-index: 10;
      .anticon-caret-down {
        transform: scale(0.6);
        color: ${token.colorTextTertiary};
      }
      .color-preview-menu {
        padding: 5px 12px;
        width: 232px;
      }
      ,
      .color-preview {
        position: relative;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        cursor: pointer;
        box-sizing: border-box;
        transition: all 0.3s;
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0px;
          height: 0px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: ${token.colorBgLayout};
          transition: all 0.2s;
        }
        &.default {
          background: #000;
        }
        &.clickable {
          &:hover {
            box-shadow: 0 0 2px 2px ${token.colorBorder};
            border: 2px solid ${token.colorBgContainer};
            transform: scale(1.2);
          }
        }
        &.active {
          &::after {
            width: 8px;
            height: 8px;
          }
        }
      }
      .more-color-icon {
        display: block;
        width: 16px;
        height: 16px;
      }
      .ant-color-picker-trigger {
        justify-content: start;
        border: none;
        box-shadow: none;
        padding: 5px 12px !important;
      }
    `,
    editorContent: css`
      padding: 8px;
    `,
  }
})
