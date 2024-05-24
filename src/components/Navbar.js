import React from 'react'
import { Link  } from 'react-router-dom'
function Navbar() {
    return (
        <div>
            <div className='flex items-center'>
                <Link className='ml-2 p-4' to = "/">Home</Link>
                <Link className='ml-2 p-4' to = "/login">Login</Link>
                <Link className='ml-2 p-4' to = "">Pricing</Link>
            </div>

        </div>
    )
}

export default Navbar
