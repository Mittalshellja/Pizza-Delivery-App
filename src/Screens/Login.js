import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    })
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials!")
    }
    if (json.success) {
      localStorage.setItem('userEmail',credentials.email);
      localStorage.setItem("authToken",json.authToken); 
     navigate("/")
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={onChange} type="email" placeholder="Username" name="email" value={credentials.email} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              onChange={onChange} type="password" placeholder="******************" name="password" value={credentials.password} required />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
         
          <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Login
                        </button>
           
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <Link  to="/signup" className="inline-block align-baseline font-bold text-sm text-white hover:text-blue-800">New user?      
              </Link></button> </div> 
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login
