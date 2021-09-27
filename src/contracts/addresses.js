const Local1 = 1337
const Local2 = 5777
const localAddresses = {
  multicall: '0x046D90F1614C3732Ce04D866bc9Ef0ae1Cdda509',
  assetRegistry: '0x856d56feb432acb5e8A7f8A0E6A1503ac4DA3415',
  rightsRegistry: '0x564da64604C54CDdb9b86AF489539664aA25039a',
  loanTracker: '0x3A5D9185Bb29f9Bc04C09C7Bd483b38A662b9Da6',
  weth: '0xf1785871A033349e21D1cC592f80928eB815d999',
  nftRegistrar: '0xE0fbD4EbE081c32473Fcd38D53bc84F88e4c5098',
  loanManager: '0x8792BAf17a71FB2c4057004544D08188CFB50443',
  nftMinter: '0x508Bb4C21a8CeBe1cd187b4ED99d28C6f84CBcc1',
  erc20Factory: '0x4BE0150a7929A048C38565E8f173A65D1996D4e7'
}

const addresses = {
  [Local1]: localAddresses,
  [Local2]: localAddresses
}

export default addresses
