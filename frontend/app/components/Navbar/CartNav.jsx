'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function CartNav() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    
      <Image 
        src={isHovered ? "/cart.gif" : "/cart.png"}
        alt="Hover to see animation"
        width={30}
        height={20}
        
       className='  hover:bg-transparent  '
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      />
    
  )
}