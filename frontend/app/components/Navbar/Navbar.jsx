
import Link from 'next/link'

import Image  from 'next/image'
import UserNav from './UserNav';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import FavoriteIcon from './FavoriteIcon';
import CartNav from './CartNav';



const Navbar = () => {

    

  return (
    <>
        <nav className='w-full fixed top-0 left-0 py-6 border-b bg-white z-10 border-gray-400'>
            <div className="max-w-[1500px] mx-auto px-6">
                <div className="flex justify-between items-center">

            <Link href="/">
                    <Image src = "/logo.png" alt = "logo" width = {100} height = {25} />   
                </Link>


                <div className="flex space-x-6">
                   
                   {/* add more */}

                     <NavLinks />
                </div>


                <div className="flex item-center space-x-6">

                    
                    <SearchBar />
                    <Link href="/cart" className="  mt-1  rounded">
                    {/* <Image src = "/cart.gif" alt = "logo" width = {30} height = {20} className='border-none hover:bg-none' /> */}
                    <CartNav />
                    </Link>
                  <FavoriteIcon />
                    <UserNav/>

                </div>


                </div>

            </div>

            


                        
        
            </nav> 
    </>
  )
}

export default Navbar;
