import { Fragment, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Editor from './Editor'
import { Input } from 'antd'

createRoot(document.getElementById('root')!).render(
  <Fragment>
    <Input />
    <Editor />
  </Fragment>,
)
