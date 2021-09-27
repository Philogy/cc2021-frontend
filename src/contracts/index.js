import { useEthers } from '@usedapp/core'
import { ethers } from 'ethers'
import addresses from './addresses.js'
import NFTMinterAbi from './abis/MockERC721.json'
import ERC20FactoryAbi from './abis/ERC20Factory.json'
import ERC20MintableAbi from './abis/ERC20Mintable.json'

const createCallCreator = (address, abi) => {
  const interfaceAbi = new ethers.utils.Interface(abi)
  return (method, ...args) => ({ abi: interfaceAbi, address, method, args })
}

const createContractHook = (contractName, abi) => () => {
  const { library, chainId } = useEthers()
  const address = addresses[chainId]?.[contractName]
  if (!address) return { contract: null, createCall: () => null }
  const contract = new ethers.Contract(address, abi, library)
  const createCall = createCallCreator(address, abi)
  return { contract, createCall }
}

const useNFTMinter = createContractHook('nftMinter', NFTMinterAbi)
const useErc20Factory = createContractHook('erc20Factory', ERC20FactoryAbi)

const createERC20Call =
  (method, ...args) =>
    (address) => {
      const interfaceAbi = new ethers.utils.Interface(ERC20MintableAbi)
      return { abi: interfaceAbi, address, method, args }
    }

function useERC20Contract(address) {
  const { library } = useEthers()
  if (!address) return null
  return new ethers.Contract(address, ERC20MintableAbi, library)
}

export { useNFTMinter, useErc20Factory, createCallCreator, createERC20Call, useERC20Contract }
