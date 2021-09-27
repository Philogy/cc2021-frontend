import { ethers } from 'ethers'

const largeNumberFormatter = (num, maxFracDigits) => {
  if (typeof maxFracDigits !== 'number') maxFracDigits = 3
  return Intl.NumberFormat('en-us', { maximumFractionDigits: maxFracDigits }).format(num)
}

const largeUnitFormatter = (num, maxFracDigits, unit) => {
  const realNumber = parseFloat(ethers.utils.formatUnits(num, unit))
  return largeNumberFormatter(realNumber, maxFracDigits)
}

export { largeNumberFormatter, largeUnitFormatter }
