import React from 'react'
import '/styles/globals.css'
import 'antd/dist/antd.css'

import { DAppProvider } from '@usedapp/core'
import { config } from '/src/usedapp.js'

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <Component {...pageProps} />
    </DAppProvider>
  )
}

export default MyApp
