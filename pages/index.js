import React from 'react'
import Head from 'next/head'
import Landing from '/components/main-page/Landing.jsx'

export default function Home() {
  return (
    <div>
      <Head>
        <title>NFT Loan Market</title>
      </Head>
      <Landing />
    </div>
  )
}
