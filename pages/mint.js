import React, { useState } from 'react'
import Link from 'next/link'
import { Button, InputNumber } from 'antd'
import { useEthers, useContractCall, useContractFunction } from '@usedapp/core'
import { useNFTMinter } from '/src/contracts'

function Deploy() {
  const nftMinter = useNFTMinter()
  const { activateBrowserWallet, account } = useEthers()
  const [toMint, setToMint] = useState(1)
  const { send: mintNfts } = useContractFunction(nftMinter.contract, 'mintMany', {
    transactionName: 'Mint'
  })
  const rawOwnedNfts = useContractCall(nftMinter.createCall('balanceOf', account))
  const ownedNfts = rawOwnedNfts ? rawOwnedNfts[0].toNumber() : null

  const connectMetamask = async () => {
    console.log('trying to connect')
    await activateBrowserWallet((error) => {
      console.log('error: ', error)
    })
  }

  return (
    <div>
      <Link href="/">
        <a>Return Home</a>
      </Link>
      <div>
        {account ? (
          <p>Account: {account}</p>
        ) : (
          <Button onClick={connectMetamask}>Connect wallet</Button>
        )}
      </div>
      <div>
        <p>Mint NFTs ({toMint})</p>
        <p>Existing balance: {ownedNfts}</p>
        <InputNumber
          style={{ width: 200 }}
          min={1}
          placeholder="new NFTs to mint"
          value={toMint}
          onChange={setToMint}
        />
        <Button onClick={() => mintNfts(toMint)}>Mint ERC721 Tokens</Button>
      </div>
    </div>
  )
}

export default Deploy
