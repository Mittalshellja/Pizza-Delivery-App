import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../Screens/Cart';
import { useCart } from './ContextReducer';

function Navbar() {
    const [cartView, setCartView] = useState(false)
    let data = useCart();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }
    const loadCart = () => {
        setCartView(true)
    }
    return (
        <div className='flex justify-between items-center p-4 bg-gray-100'>
            <div className='flex items-center'>
                <Link className='ml-2 p-4' to="/">Home</Link>
                {(localStorage.getItem("authToken")) ?
                    (<Link className='ml-2 p-4' to="/myOrder">My Orders</Link>) : ""
                }
                {/* <Link className='ml-2 p-4' to="">Pricing</Link> */}
            </div>
            {(!localStorage.getItem("authToken")) ?
                (<div className='flex items-center ml-auto'>
                    <button className='border px-3 py-2 rounded-lg bg-emerald-300 ml-2'>
                        <Link className='text-center' to="/login">Login</Link>
                    </button>
                    <button className='border px-3 py-2 rounded-lg bg-emerald-300 ml-2'>
                        <Link className='text-center' to="/signup">Signup</Link>
                    </button>
                </div>) : (
                    <div className='flex'>
                        <div>
                            <button className='border px-3 py-2 rounded-lg bg-emerald-300 ml-2' onClick={loadCart}>
                                My Cart
                                <span className="bg-purple-100 text-purple-400 text-xs font-medium ml-2 me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">{data.length}</span>
                            </button>
                        </div>
                         {cartView ? (<Modal onClose={()=>setCartView(false)}><Cart/></Modal> ): null}
                        <div>
                            <button className='border px-3 py-2 rounded-lg bg-emerald-300 ml-2' onClick={handleLogout}>Logout</button>
                        </div>
                    </div>)}
        </div>
    );
}

export default Navbar;
