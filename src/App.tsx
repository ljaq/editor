import { Button, Form, Input } from 'antd'
import { Editor } from './index'
import { useEffect } from 'react'
import './assets/index.css'

// https://cn.bing.com/rp/kAwiv9gc4HPfHSU3xUQp2Xqm5wA.png

const content = `
<h2>Hi there,</h2><p>this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:</p><ul><li><p><span style="color: rgb(0, 15, 255)">That’s a bullet list with one …</span></p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:</p><pre data-language="css" data-theme="github-light" data-name="123"><code>body {
  display: none;
}</code></pre><p>I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.</p><table style="min-width: 75px"><colgroup><col style="min-width: 25px"><col style="min-width: 25px"><col style="min-width: 25px"></colgroup><tbody><tr><th colspan="1" rowspan="1"><p>Firstname</p></th><th colspan="1" rowspan="1"><p>Lastname</p></th><th colspan="1" rowspan="1"><p>Age</p></th></tr><tr><td colspan="1" rowspan="1"><p>Jill</p></td><td colspan="1" rowspan="1"><p>Smith</p></td><td colspan="1" rowspan="1"><p>50</p></td></tr><tr><td colspan="1" rowspan="1"><p>Eve</p></td><td colspan="1" rowspan="1"><p>Jackson</p></td><td colspan="1" rowspan="1"><p>94</p></td></tr><tr><td colspan="1" rowspan="1"><p>John</p></td><td colspan="1" rowspan="1"><p>Doe</p></td><td colspan="1" rowspan="1"><p>80</p></td></tr></tbody></table><blockquote><p>Wow, that’s amazing. Good work, boy! 👏 <br>— Mom</p></blockquote>
`

export default function App() {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    console.log(values.editor)
  }

  useEffect(() => {
    form.setFieldsValue({
      editor: content,
    })
  }, [])
  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name='editor' rules={[{ required: true }]}>
        <Editor mode='card' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
