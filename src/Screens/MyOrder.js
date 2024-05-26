import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        const email = localStorage.getItem('userEmail');
        console.log('Fetching order data for:', email);

        const response = await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        console.log('Fetched order data:', data);

        if (data && data.orderData && Array.isArray(data.orderData.order_data)) {
            setOrderData(data.orderData.order_data);
        } else {
            console.error('Unexpected data structure:', data);
            setOrderData([]); // Set to empty array if data structure is not as expected
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div >
                    {orderData.length > 0 ? (
                        orderData.slice(0).reverse().map((item, idx) => (
                            item.map((arrayData, subIdx) => (
                                <div key={`${idx}-${subIdx}`} className='w-full sm:w-1/2 md:w-1/3 p-4'>
                                    {arrayData.Order_date ? (
                                        <div className='m-auto mt-5 w-full'>
                                            <div>{arrayData.Order_date}</div>
                                            <hr className='border-t-2 border-gray-300 my-4' />
                                        </div>
                                    ) : (
                                      <div>
                                            <div className="p-4">
                                                <h5 className="text-xl font-semibold mb-2">{arrayData.name}</h5>
                                                <div className='flex justify-between items-center'>
                                                    <span className='text-gray-700'>{arrayData.quantity}</span>
                                                    <span className='text-gray-700'>{arrayData.size}</span>
                                                    <div className='text-lg font-bold text-green-500'>
                                                        ₹{arrayData.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ))
                    ) : (
                        <div>No orders found.</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
