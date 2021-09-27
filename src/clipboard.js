import { message } from 'antd'

function clipboardCopy(content) {
  message.info('content copied to clipboard')
  navigator.clipboard.writeText(content)
}

const clipboard = {
  copy: clipboardCopy
}

export default clipboard
