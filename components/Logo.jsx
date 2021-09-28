import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Logo() {
  return (
    <Link href="/">
      <div className="bg-gray-500 px-4 py-2 rounded-lg flex transform hover:cursor-pointer hover:opacity-80">
        <Image src="/images/logo-standalone.svg" width={150} height={50} />
      </div>
    </Link>
  )
}

export default Logo
