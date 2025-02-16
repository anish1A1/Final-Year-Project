"use client";
import React, { useEffect, useContext } from 'react';
import { useParams } from 'next/navigation';
import { ProductContext } from '../../../utils/prod';

const ViewTradeRequestsPage = () => {
    const { id } = useParams();
    const { fetchTradeRequests, tradeRequests, loading, error } = useContext(ProductContext);

    useEffect(() => {
        fetchTradeRequests(id);
    }, [id]);

    return (
        <div className="container mx-auto mt-24 p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Trade Requests</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading ? (
                <p className="text-center">Loading trade requests...</p>
            ) : (
                <div>
                    {tradeRequests.length > 0 ? (
                        tradeRequests.map((request) => (
                            <div key={request.id} className="p-4 border-b mb-4">
                                <h2 className="text-lg font-semibold mb-2">{request.requested_product.name}</h2>
                                <p className="text-gray-700">Requested by: {request.trade.user.username}</p>
                                <p className="text-gray-700">Created at: {new Date(request.created_at).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-lg">No trade requests found for this trade.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewTradeRequestsPage;
