import React from 'react'
import 'antd/dist/antd.css'
import '/styles/globals.css'

import { UseDAppProvider } from '/src/usedapp.js'

function MyApp({ Component, pageProps }) {
  return (
    <UseDAppProvider>
      <Component {...pageProps} />
    </UseDAppProvider>
  )
}

export default MyApp
