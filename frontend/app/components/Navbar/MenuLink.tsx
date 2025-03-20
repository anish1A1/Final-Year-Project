'use client'
import { Label } from '@radix-ui/react-label';
import React from 'react'
interface MenuLinkProps {
    label: string;
    onClick: () => void;

}
const MenuLink: React.FC<MenuLinkProps> = ({label, onClick}) => {
  return (
    <div onClick={onClick}
     className = "cursor-pointer px-4 py-3  w-40 mx-1  hover:bg-gray-100 transition  rounded mb-1  ">
      <Label className='text-sm font-semibold cursor-pointer '>
      {label}
      </Label>
    </div>
  )
}

export default MenuLink
