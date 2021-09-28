import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button } from 'antd'
import { useEthers, shortenAddress, useLookupAddress } from '@usedapp/core'
import { useConnect } from '/src/usedapp.js'

function ConnectMetamaskButton() {
  const { account } = useEthers()
  const router = useRouter()
  const { connectMetamask, connectionLoading } = useConnect()
  const accountName = useLookupAddress()

  const connectWallet = async () => {
    await connectMetamask()
    router.push('/wallet')
  }

  return account ? (
    <div className="main-btn main-text w-44 flex items-center px-3 py-2 justify-between space-x-2">
      <Image src="/images/metamask.png" width={20} height={20} />
      <span>{accountName ?? shortenAddress(account)}</span>
    </div>
  ) : (
    <Button
      className="main-btn main-text p-5 flex items-center justify-center"
      loading={connectionLoading}
      disabled={account}
      onClick={connectWallet}
    >
      Connect Wallet
    </Button>
  )
}

export default ConnectMetamaskButton
