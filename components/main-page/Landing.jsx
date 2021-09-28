import React from 'react'
import Link from 'next/link'
import { ArrowRightOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import ConnectMetamaskButton from '../ConnectMetamaskButton.jsx'
import Logo from '../Logo.jsx'

function Landing() {
  const centralLinks = ['mint', 'about', 'faq', 'contact']

  return (
    <section className="p-12 h-screen flex flex-col">
      <header className="flex justify-between">
        <Logo />
        <div className="flex items-center">
          <div className="mr-4 flex">
            {centralLinks.map((link) => (
              <Link href={`/${link}`} key={link}>
                <a className="main-text mx-5 flex items-center">{link}</a>
              </Link>
            ))}
          </div>
          <ConnectMetamaskButton />
        </div>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center">
        <span className="text-5xl font-medium">
          <span className="text-green-400">Easy Liquidity</span> from{' '}
          <span className="text-yellow-400">Illiquid Assets</span>
        </span>
        <p className="mt-6 font-medium text-lg text-center">
          Take out fixed interest loans using your NFTs as collateral.
        </p>
        <div className="mt-16 w-1/3 flex items-center justify-around">
          <Button
            className="w-2/5 py-6 flex items-center justify-center font-semibold"
            type="primary"
          >
            <div className="flex items-center space-x-2">
              <span className="uppercase">Learn more</span>
              <InfoCircleOutlined />
            </div>
          </Button>
          <Button className="main-btn w-2/5 py-6 flex items-center justify-center font-semibold">
            <div className="flex items-center justify-around space-x-1">
              <span>Get Started</span>
              <ArrowRightOutlined className="transform scale-110" />
            </div>
          </Button>
        </div>
      </main>
    </section>
  )
}

export default Landing
