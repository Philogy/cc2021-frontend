import React from 'react'
import { Button } from 'antd'
import { useEthers } from '@usedapp/core'
import { useConnect } from '/src/usedapp.js'

function ConnectMetamaskButton() {
  const { account } = useEthers()
  console.log('account: ', account)
  const { connectMetamask, connectionLoading } = useConnect()

  return (
    <Button
      className="main-btn main-text p-5 flex items-center justify-center"
      loading={connectionLoading}
      disabled={account}
      onClick={connectMetamask}
    >
      Connect Wallet
    </Button>
  )
}

export default ConnectMetamaskButton
