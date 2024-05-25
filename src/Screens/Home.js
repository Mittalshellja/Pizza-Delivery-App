import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cards from '../components/Card'
import Header from '../components/Header'

function Home() {
    return (
        <div>
            <div><Navbar /></div>
            <div><Header/></div>
            <div className='flex nt-2 ml-3'>
            <div  className='p-2 '><Cards/></div>
            <div className='p-2'><Cards/></div>
            <div className='p-2'><Cards/></div>
            <div className='p-2'><Cards/></div></div>
            <div className='p-2'><Footer /></div>
        </div>
    )
}

export default Home
