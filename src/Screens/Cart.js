 
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatch } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatch();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (

    <div className="container mx-auto mt-5">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-green-500 text-white text-lg">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Option</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} className="w-full text-gray-700">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{food.name}</td>
                <td className="border px-4 py-2 text-center">{food.quantity}</td>
                <td className="border px-4 py-2 text-center">{food.size}</td>
                <td className="border px-4 py-2 text-center">{food.price}</td>
                <td className="border px-4 py-2 text-center">
                  <button 
                    className="text-red-500 hover:text-red-700" 
                    onClick={() => { dispatch({ type: 'REMOVE', index: index }) }}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 text-2xl">
        <h1>Total Price: {totalPrice}/-</h1>
      </div>
      <div>
        <button 
          className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5" 
          onClick={handleCheckOut}
        >
          Check Out
        </button>
      </div>
    </div>
  );
}
