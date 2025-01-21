import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const CaptainSignup = () => {

   const[firstName , setFirstName] = useState('')
    const[lastName , setLastName] = useState('')
    const[email , setEmail] = useState('')
    const[password , setPassword] = useState('')
    const [color, setVehicleColor] = useState('')
    const [plate, setVehiclePlate] = useState('')
    const [capacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const {captain,setCaptain}=React.useContext(CaptainDataContext)


    const navigate=useNavigate()



  return (
    <div>
      <div className='h-screen bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=2355&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] flex justify-between flex-col w-full bg-red-400'>
        <img className="w-20 py-8 pl-9 " src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-slate-100 py-5 px-10 rounded-lg'>
            <h2 className='text-2xl pb-7 flex justify-center font-bold'>Get Started with Uber</h2>
            <form action="" onSubmit={async(e)=>{
              e.preventDefault();
              console.log('submitted')
              const captainData={
                fullName:{
                  firstName: firstName,
                  lastName: lastName,
                },
                email: email,
                password: password,
                vehicle:{
                  color: color,
                  plate: plate,
                  capacity: capacity,
                  vehicleType: vehicleType
                }
              }

              const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,captainData)
              if(response.status===201){
                console.log(response.data)
                const data=response.data
                setCaptain(data.captain)
                localStorage.setItem('token',data.token)
                navigate('/captain/home')
              }
              console.log(captainData)
              setEmail('')
              setPassword('')
              setFirstName('')
              setLastName('')
              setVehicleColor('')
              setVehiclePlate('')
              setVehicleCapacity('')
              setVehicleType('')
            }} 
            className='flex flex-col'>
                <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder='First Name' className='py-2 px-3 rounded-lg mb-3'/>
                <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder='Last Name' className='py-2 px-3 rounded-lg mb-3'/>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className='py-2 px-3 rounded-lg mb-3'/>
                <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)}  placeholder='Password' className='py-2 px-3 rounded-lg mb-3'/>
                <input type="text" value={color} onChange={(e)=>setVehicleColor(e.target.value)} placeholder='Vehicle Color' className='py-2 px-3 rounded-lg mb-3'/>
                <input type="text" value={plate} onChange={(e)=>setVehiclePlate(e.target.value)} placeholder='Vehicle Number Plate' className='py-2 px-3 rounded-lg mb-3'/>
                <input type="number" value={capacity} onChange={(e)=>setVehicleCapacity(e.target.value)} placeholder='Vehicle Capacity' className='py-2 px-3 rounded-lg mb-3'/>
                <input type="text" value={vehicleType} onChange={(e)=>setVehicleType(e.target.value)} placeholder='Vehicle Type' className='py-2 px-3 rounded-lg mb-3'/>
                <button className='bg-black text-white py-3 rounded-xl mt-2'>Continue</button>
            </form>
            <p> Already have a account?<Link to="/captain/login" className='flex items-center justify-center  w-full bg-black text-white py-3 rounded-xl mt-2 mb-5'>log in</Link></p>
        </div>

      </div>
    </div>
  )
}

export default CaptainSignup
