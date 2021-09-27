import React, { useState } from 'react'
import { useEthers, useContractCall, useContractFunction } from '@usedapp/core'
import { Button, InputNumber } from 'antd'
import { useNFTMinter } from '/src/contracts'

function NFTMinter() {
  const { account } = useEthers()
  const nftMinter = useNFTMinter()
  const [toMint, setToMint] = useState(1)
  const { send: mintNfts } = useContractFunction(nftMinter.contract, 'mintMany', {
    transactionName: 'MintNFTs'
  })
  const rawOwnedNfts = useContractCall(nftMinter.createCall('balanceOf', account))
  const ownedNfts = rawOwnedNfts ? rawOwnedNfts[0].toNumber() : null

  return (
    <div>
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
  )
}

export default NFTMinter
