import React from 'react'
import PrivateRoute from '../../middleware/PrivateRoute';
import CreateProduct from '../../(myProducts)/MyProducts/createProduct/page';
import Link from 'next/link';
import ProductListByOwner from './ProductListByOwner';
import GetConfirmedTradesByOwner from '../../components/Deliveries/GetConfirmedTradesByOwner';
import GetConfirmedTradesByUser from '../../components/Deliveries/GetConfirmedTradesByUser';


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

               <Link href='productDashboard/tradeProductList' className='btn btn-primary p-6 bg-slate-600 rounded'>View Trades</Link>
               <Link href='productDashboard/requestedTrades' className='btn btn-primary p-6 bg-slate-600 rounded'>Your Requested Trades</Link>

                <Link href='productDashboard/tradeOwnerRequests' className='btn btn-primary p-6 bg-slate-600 rounded'>View Trades Requests</Link>
                
                <Link href='productDashboard/productDelivery' className='btn btn-primary p-6 bg-slate-600 rounded'>View Product Deliveries</Link>
                <Link href='createTrade' className='btn btn-primary p-6 bg-slate-600 rounded'>Create Trade</Link>

               <div className="mt-12 mb-6 ">
                <ProductListByOwner />
               </div>

      <div className="mt-6">
        <GetConfirmedTradesByOwner />
      </div>

      <div className="mt-6">
        <GetConfirmedTradesByUser />
      </div>
    </div>
    </PrivateRoute>
  )
}

export default ProductDashboard
