import React from 'react'
import { Separator } from "@/components/ui/separator"


import Link from 'next/link'


const NavLinks = () => {
  return (
    <div className="flex h-5 items-center space-x-4 text-sm roun">
        
        <div className=' hover:text-white'>
        <Link href="/viewProduct" className="p-2  text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded">Products</Link>
        </div>
        <Separator orientation="vertical" className='bg-gray-400' />
            <div>
                <Link href="/equipmentList" className="p-2  text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded">Equipments</Link>
            </div>
        <Separator orientation="vertical" className='bg-gray-400' />
            <div>
                <Link href="/" className="p-2  text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded">Trade</Link>
            </div>
    </div>
  )
}

export default NavLinks
