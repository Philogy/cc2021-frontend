import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>NFT Loan Market</title>
      </Head>
      <Link href="/mint">
        <a>Mint</a>
      </Link>
    </div>
  )
}
