import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { ethers } from 'ethers'
import { Select, Input, Form, Button, InputNumber } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import {
  useEthers,
  useContractFunction,
  useContractCalls,
  shortenAddress,
  useBlockNumber,
  useTokenBalance
} from '@usedapp/core'
import { useErc20Factory, createERC20Call, useERC20Contract } from '/src/contracts'
import { largeNumberFormatter, largeUnitFormatter } from '/src/numbers.js'
import clipboard from '/src/clipboard.js'

function ERC20Minter() {
  const block = useBlockNumber()
  const { account, chainId } = useEthers()
  const erc20Factory = useErc20Factory()
  const [createdTokens, setCreatedTokens] = useState([])
  const [selectedTokenAddress, setSelectedToken] = useState(null)
  const tokenNames = useContractCalls(createdTokens.map(createERC20Call('name')))
  const tokenSymbols = useContractCalls(createdTokens.map(createERC20Call('symbol')))
  const selectedToken = useERC20Contract(selectedTokenAddress)
  const rawCurrentBalance = useTokenBalance(selectedTokenAddress, account)
  const currentBalance = rawCurrentBalance ? largeUnitFormatter(rawCurrentBalance) : null

  const { send: createToken } = useContractFunction(erc20Factory.contract, 'createToken', {
    transactionName: 'CreateNewToken'
  })
  const { send: mintTokens } = useContractFunction(selectedToken, 'mint', {
    transactionName: 'MintTokens'
  })

  const createdFilter = erc20Factory.contract
    ? erc20Factory.contract.filters.CreatedToken(null, account)
    : null

  useEffect(async () => {
    if (!account) return
    const events = await erc20Factory.contract.queryFilter(createdFilter)
    setCreatedTokens(events.map(({ args }) => args.newToken))
  }, [account, chainId, block])

  const submitNewToken = ({ tokenName, tokenSymbol, initialSupply }) => {
    initialSupply = ethers.utils.parseUnits(initialSupply.toString())
    createToken(tokenName, tokenSymbol, initialSupply)
  }

  const mintNewTokens = ({ mintAmount }) => {
    mintAmount = ethers.utils.parseUnits(mintAmount.toString())
    mintTokens(mintAmount)
  }

  const updateSelectedToken = ({ token }) => {
    if (token) setSelectedToken(token)
  }

  return (
    <div>
      <p className="font-bold mt-4">Create new token (ERC20): </p>
      <Form onFinish={submitNewToken} initialValues={{ initialSupply: 0 }}>
        <Form.Item label="New Token Name" name="tokenName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="New Token Symbol" name="tokenSymbol" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Starting supply" name="initialSupply" valuePropName="value">
          <InputNumber className="w-48" formatter={largeNumberFormatter} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Deploy new token
          </Button>
        </Form.Item>
      </Form>
      <p className="font-bold mt-4">Create new token (ERC20): </p>
      <Form
        onFinish={mintNewTokens}
        onValuesChange={updateSelectedToken}
        initialValues={{ mintAmount: 0 }}
      >
        <p>Current balance: {currentBalance ?? 'N/A'}</p>
        <Button type="link" onClick={() => clipboard.copy(selectedTokenAddress)}>
          Copy token address
          <CopyOutlined />
        </Button>
        <Form.Item label="Token" name="token" rules={[{ required: true }]}>
          <Select>
            {_.zip(createdTokens, tokenNames, tokenSymbols).map(([addr, name, symbol]) => (
              <Select.Option value={addr} key={addr}>
                ({symbol}) {name} - {shortenAddress(addr)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Mint amount" name="mintAmount" valuePropName="value">
          <InputNumber className="w-48" formatter={largeNumberFormatter} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Mint new tokens
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ERC20Minter
