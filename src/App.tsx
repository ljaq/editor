import { Button, Form } from 'antd'
import Editor from './Editor'
import { useEffect } from 'react'

// https://cn.bing.com/rp/kAwiv9gc4HPfHSU3xUQp2Xqm5wA.png

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    <span style="color: #000fff">That’s a bullet list with one …</span>
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
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
        <Editor />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
