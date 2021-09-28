import React from 'react'
import Link from 'next/link'
import { ArrowLeftOutlined } from '@ant-design/icons'
import ConnectMetamaskButton from '/components/ConnectMetamaskButton.jsx'
import NFTMinter from './NFTMinter.jsx'
import ERC20Minter from './ERC20Minter.jsx'

function Mint() {
  return (
    <div className="p-4 h-screen">
      <div className="main-text p-2 flex justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2 hover:text-blue-400 hover:cursor-pointer">
            <ArrowLeftOutlined className="transform scale-90" />
            <span>Return Home</span>
          </div>
        </Link>
        <ConnectMetamaskButton />
      </div>
      <div className="flex">
        <div className="w-1/4 flex flex-col items-center">
          <p className="main-text text-center">Mint NFTs</p>
          <NFTMinter />
        </div>
        <div className="w-1/4 flex flex-col items-center">
          <p className="main-text text-center">Mint fungible tokens (ERC20)</p>
          <ERC20Minter />
        </div>
      </div>
    </div>
  )
}

export default Mint
