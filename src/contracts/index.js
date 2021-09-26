import { useEthers } from '@usedapp/core'
import { ethers } from 'ethers'
import addresses from './addresses.js'
import NFTMinterAbi from './abis/MockERC721.json'

const createContractHook = (contractName, abi) => () => {
  const { library, chainId } = useEthers()
  const address = addresses[chainId]?.[contractName]
  if (!address) return { contract: null, createCall: () => null }
  const contract = new ethers.Contract(address, abi, library)
  const interfaceAbi = new ethers.utils.Interface(abi)
  const createCall = (method, ...args) => ({ abi: interfaceAbi, address, method, args })
  return { contract, createCall }
}

const useNFTMinter = createContractHook('nftMinter', NFTMinterAbi)

export { useNFTMinter }
