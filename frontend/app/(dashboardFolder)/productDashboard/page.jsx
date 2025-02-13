import React from 'react'
import PrivateRoute from '../../middleware/PrivateRoute';
import CreateProduct from '../../(products)/createProduct/page';

const ProductDashboard = () => {
  return (
    <PrivateRoute>

    <div className='mt-28'>
        Product Dashboard

        <br />
        <br />      
<br />
               To create a new product
               <CreateProduct />
    </div>
    </PrivateRoute>
  )
}

export default ProductDashboard
