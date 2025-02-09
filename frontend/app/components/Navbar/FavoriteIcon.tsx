import React from 'react'

import Image from "next/image";
import Link from 'next/link'

const FavoriteIcon = () => {
  return (
    <div className='p-2 relative inline-block'>
        <Link href="/">
                    <Image src = "/favorites.png" alt = "logo" width = {30} height = {20} />   
        </Link>
    </div>
  )
}

export default FavoriteIcon
