"use client";
import Link from 'next/link'
import { AuthContext } from '@/utils/auth';
import Image  from 'next/image'
import UserNav from './UserNav';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import FavoriteIcon from './FavoriteIcon';
import CartNav from './CartNav';
import { useContext, useEffect, useState } from 'react';



const Navbar = () => {
  const {user} = useContext(AuthContext); 
      const [isAdmin, setIsAdmin] = useState(false);
  
      useEffect(() => {
          if (user && user.user_roles) {
              
              const adminrole = user.user_roles.some((role) => role.role.name === 'admin');
             
              setIsAdmin(adminrole);
          }
          
      }, [user]);


   

  return (
    <>

        <nav className='w-full fixed top-0 left-0 py-6 border-b bg-white z-10 border-gray-400'>
            <div className="max-w-[1500px] mx-auto px-6">

    {!isAdmin ? (
      <>
                <div className="flex justify-between items-center">
            <Link href="/">
                    <Image src = "/logo.png" alt = "logo" width = {100} height = {25} />   
                </Link>


                <div className="flex space-x-6">
                     <NavLinks />
                </div>
                <div className="flex item-center ssm:pace-x-1 md:space-x-6 ">

                    <UserNav/>
                    
                    <Link href="/cart" className="  mt-1  rounded">
                    {/* <Image src = "/cart.gif" alt = "logo" width = {30} height = {20} className='border-none hover:bg-none' /> */}
                    <CartNav />
                    </Link>
                    
                    {/* <SearchBar /> */}
                  {/* <FavoriteIcon /> */}
                </div>
              </div>

                </>
              ): (
                <div className='flex justify-between items-center'>
                  <Link href="">
                    <Image src = "/logo.png" alt = "logo" width = {100} height = {25} />   
                </Link>
                <div className="flex justify-end item-end ssm:pace-x-1 md:space-x-6 ">

                    <UserNav/>
                    
                    <Link href="/cart" className="  mt-1  rounded">
                    {/* <Image src = "/cart.gif" alt = "logo" width = {30} height = {20} className='border-none hover:bg-none' /> */}
                    </Link>
                    
                    {/* <SearchBar /> */}
                  {/* <FavoriteIcon /> */}
                </div>
                </div>
              ) }
            </div>
            </nav> 
    </>
  )
}

export default Navbar;
