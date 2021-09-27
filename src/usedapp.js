import React, { createContext, useContext, useState } from 'react'
import { ChainId, DAppProvider, useEthers } from '@usedapp/core'
import addresses from './contracts/addresses.js'

ChainId.Local1 = 1337
ChainId.Local2 = 5777

const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: process.env.NEXT_PUBLIC_ENDPOINT,
    [ChainId.Local1]: 'http://localhost:8545',
    [ChainId.Local2]: 'http://localhost:8545'
  },
  multicallAddresses: {
    [ChainId.Local1]: addresses[ChainId.Local1].multicall,
    [ChainId.Local2]: addresses[ChainId.Local2].multicall
  },
  supportedChains: [ChainId.Mainnet, ChainId.Local1, ChainId.Local2]
}

const ConnectMetamaskContext = createContext(null)

function UseDAppProvider({ children }) {
  const [connectionLoading, setLoading] = useState(false)

  const providerConnectMetamask = async (activateBrowserWallet) => {
    console.log('trying to connect')
    setLoading(true)
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      await activateBrowserWallet()
    } catch (err) {
      console.log('err: ', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DAppProvider config={config}>
      <ConnectMetamaskContext.Provider value={{ providerConnectMetamask, connectionLoading }}>
        {children}
      </ConnectMetamaskContext.Provider>
    </DAppProvider>
  )
}

function useConnect() {
  const { activateBrowserWallet } = useEthers()
  const { providerConnectMetamask, connectionLoading } = useContext(ConnectMetamaskContext)
  const connectMetamask = () => providerConnectMetamask(activateBrowserWallet)
  return { connectMetamask, connectionLoading }
}

export { UseDAppProvider, useConnect }
