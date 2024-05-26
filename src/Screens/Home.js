import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cards from '../components/Card';
// import Header from '../components/Header';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Home() {
    const[search,setSearch] = useState("");
    const [foodCategory, setFoodCategory] = useState([]);
    const [foodItems, setFoodItems] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        response = await response.json();
        setFoodItems(response[0]);
        setFoodCategory(response[1]);
    };

    const onChange=(e)=>{
setSearch(e.target.value)
    }
    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="relative">
                <Carousel
                    showArrows={true}
                    showIndicators={true}
                    showThumbs={false}
                    infiniteLoop={true}
                    useKeyboardArrows={true}
                    autoPlay={true}
                    interval={10000}
                >
                    <div>
                        <img
                            src="https://source.unsplash.com/random/200×250/?pizza"
                            alt="Wild Landscape"
                            className="block w-full h-96"
                        />
                    </div>
                    <div>
                        <img
                            src="https://source.unsplash.com/random/250×250/?veg-pizza"
                            alt="Camera"
                            className="block w-full h-96"
                        />
                    </div>
                    <div>
                        <img
                            src="https://source.unsplash.com/random/250×250/?chicken-pizza"
                            alt="Exotic Fruits"
                            className="block w-full h-96"
                        />
                    </div>
                </Carousel>

                <div className='max-w-md mx-auto mt-2 p-2 bg-gray-300 rounded-lg'>
                    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <div>
                            <input
                                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                type="text"
                                id="search"
                                placeholder="Search something.." 
                                value={search}
                                onChange={onChange}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-4'>
                {foodCategory.length > 0 ? (
                    foodCategory.map((data) => (
                        <div key={data._id} className='mb-8'>
                            <div className='text-xl font-bold mb-4'>{data.CategoryName}</div>
                            <hr className='mb-4' />
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                {foodItems.length > 0 ? (
                                    foodItems
                                        .filter((item) => (item.CategoryName === data.CategoryName) && item.name.toLowerCase().includes(search.toLowerCase()))
                                        .map((filterItems) => (
                                            <div key={filterItems._id}>
                                                <Cards
                                                    foodItem = {filterItems}
                                                    options={filterItems.options[0]}
                                                    />
                                            </div>
                                        ))
                                ) : (
                                    <div>No such data!</div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No such data!</div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Home;
