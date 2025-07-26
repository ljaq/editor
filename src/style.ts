import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    editor: css`
      position: relative;
      transition: 0.2s;
      outline: none;
      box-shadow: none;
      &.card {
        border: 1px solid ${token.colorBorder};
        border-radius: ${token.borderRadius}px;
        background-color: ${token.colorBgContainer};
        overflow: hidden;
        &:hover {
          border-color: ${token.colorPrimaryBorderHover};
        }
        &:has(.ProseMirror-focused) {
          border-color: ${token.colorPrimaryActive};
          box-shadow: 0 0 0 2px ${token.colorPrimaryBg};
        }
      }
      .tiptap {
        outline: none;
        :first-child {
          margin-top: 0;
        }

        /* List styles */
        ul,
        ol {
          padding: 0 1rem;
          margin: 1.25rem 1rem 1.25rem 0.4rem;

          li p {
            margin-top: 0.25em;
            margin-bottom: 0.25em;
          }
        }

        /* Heading styles */
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          line-height: 1.1;
          margin-top: 2rem;
          text-wrap: pretty;
        }

        h1,
        h2 {
          margin-bottom: 1.2rem;
        }

        h1 {
          font-size: 1.4rem;
        }

        h2 {
          font-size: 1.2rem;
        }

        h3 {
          font-size: 1.1rem;
        }

        h4,
        h5,
        h6 {
          font-size: 1rem;
        }

        /* Code and preformatted text styles */
        code {
          background-color: ${token.colorBgLayout};
          border-radius: 2px;
          color: #000;
          font-size: 0.85em;
          padding: 0.25em 0.3em;
          margin: 0 0.25em;
        }

        pre {
          background: #000;
          border-radius: 0.5rem;
          color: #fff;
          font-family: 'JetBrainsMono', monospace;
          margin: 1.5rem 0;
          padding: 0.75rem 1rem;

          code {
            background: none;
            color: inherit;
            font-size: 0.8rem;
            padding: 0;
          }
        }

        blockquote {
          border-left: 3px solid ${token.colorBorder};
          margin: 1.5rem 0;
          padding: 0 1rem;
          overflow: hidden;
          color: ${token.colorTextSecondary};
          background-color: ${token.colorBgLayout};
        }

        hr {
          border: none;
          border-top: 1px solid ${token.colorBorderSecondary};
          margin: 2rem 0;
        }

        /* Table-specific styling */
        table {
          border-collapse: collapse;
          margin: 0;
          overflow: hidden;
          table-layout: fixed;
          width: 100%;
          p {
            margin: 0;
          }
          td,
          th {
            border: 1px solid ${token.colorBorder};
            box-sizing: border-box;
            min-width: 1em;
            padding: 6px 8px;
            position: relative;
            vertical-align: top;

            > * {
              margin-bottom: 0;
            }
          }

          th {
            background-color: ${token.colorFillSecondary};
            font-weight: bold;
            text-align: left;
          }

          .selectedCell:after {
            color: #000;
            background: ${token.colorFillTertiary};
            content: '';
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            pointer-events: none;
            position: absolute;
            z-index: 2;
          }

          .column-resize-handle {
            background-color: ${token.colorPrimary};
            bottom: -2px;
            pointer-events: none;
            position: absolute;
            right: -2px;
            top: 0;
            width: 4px;
          }
        }

        .tableWrapper {
          margin: 1.5rem 0;
          overflow-x: auto;
        }

        &.resize-cursor {
          cursor: ew-resize;
          cursor: col-resize;
        }
      }
    `,
    invalid: css`
      &.card {
        border-color: ${token.colorError};
        &:hover {
          border-color: ${token.colorErrorBorderHover};
        }
        &:has(.ProseMirror-focused) {
          border-color: ${token.colorErrorActive};
          box-shadow: 0 0 0 2px ${token.colorErrorBg};
        }
      }
    `,
    menuBar: css`
      top: 0;
      padding: 8px;
      border-bottom: 1px solid ${token.colorBorderSecondary};
      &.fullPage {
        position: sticky;
        z-index: 999;
        background-color: ${token.colorBgContainer};
      }
      &:hover {
        box-shadow: 0 0 4px 2px ${token.colorBgLayout};
      }
      .anticon-caret-down {
        transform: scale(0.6);
        color: ${token.colorTextTertiary};
      }
      .color-preview-menu {
        padding: 5px 12px;
        width: 232px;
      }
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
      padding: 0 16px;
      &.card {
        overflow: auto;
        height: 400px;
      }
      &.fullPage {
        margin: 0 auto;
      }
    `,
  }
})
