import React from 'react'
import PrivateRoute from '../../middleware/PrivateRoute';
import CreateProduct from '../../(products)/createProduct/page';
import Link from 'next/link';

const ProductDashboard = () => {
  return (
    <PrivateRoute>

    <div className='mt-28'>
        Product Dashboard

        <br />
        <br />      
<br />
               To create a new product
               <Link href='/createProduct' className='btn btn-primary p-6 bg-slate-600 rounded'>Create Product</Link>
    </div>
    </PrivateRoute>
  )
}

export default ProductDashboard
