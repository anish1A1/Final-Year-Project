'use client'
import React from 'react'

interface MenuLinkProps {
    label: string;
    onClick: () => void;

}
const MenuLink: React.FC<MenuLinkProps> = ({label, onClick}) => {
  return (
    <div onClick={onClick}
     className = "cursor-pointer px-5 py-4  hover:bg-gray-100 transition last:hover:rounded-b-xl">
      {label}
    </div>
  )
}

export default MenuLink
