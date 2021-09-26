import { ChainId } from '@usedapp/core'
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

export { config }
