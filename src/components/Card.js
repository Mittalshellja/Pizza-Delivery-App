import React, { useEffect, useRef, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useCart, useDispatch } from './ContextReducer';
import { useNavigate } from 'react-router-dom';

function Cards(props) {
    let navigate = useNavigate();
    let options = props.options;
    let priceOptions = Object.keys(options)
    let data = useCart()
    let foodItem = props.item;
    let dispatch = useDispatch();
    const priceRef = useRef();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");

    const handleClick = () => {
        if (!localStorage.getItem("authToken")) {
          navigate("/login")
        }
      }

      const handleQuantity = (e) => {
        setQuantity(e.target.value);
      }

      const handleOptions = (e) => {
        setSize(e.target.value);
      }

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food.length > 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, quantity: quantity })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, quantity: quantity, size: size })
                //console.log(data);
                return
            }
            return
        }
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, quantity: quantity, size: size })
           

    }
    let finalPrice = quantity * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>
            <Card className="p-2 font-semibold" sx={{ maxWidth: 345 }} >
                {props.foodItem.name}
                <CardContent >
                    <img className='p-2' src={props.foodItem.img} style={{ height: "200px", width: "300px", objectFit: "Fill" }}></img>
                    <div className='flex'>
                        <div className='p-2'>
                            <select onChange={handleQuantity}>
                                {Array.from(Array(6), (e, i) => {
                                    return (<option key={i + 1} value={i + 1}>{i + 1} </option>)
                                })}
                            </select>
                        </div>
                        <div className='p-2'>
                            <select onChange={handleOptions} ref={priceRef}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                        </div>
                        <div className='p-2'>
                            ₹{finalPrice}/-
                        </div>
                        <hr />
                        <div className='p-2 ' >
                        <button onClick={handleAddToCart} className='border p-2 bg-emerald-300'>Add to Cart</button></div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Cards
