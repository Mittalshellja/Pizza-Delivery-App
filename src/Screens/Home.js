import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cards from '../components/Card'
import Header from '../components/Header'

function Home() {
    return (
        <div>
            <div><Header/></div>
            <div>
                <Navbar />
            </div>
            <div><Cards/></div>
            <div><Footer /></div>
        </div>
    )
}

export default Home
