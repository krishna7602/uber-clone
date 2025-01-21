import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {UserDataContext} from '../context/userContext'
import axios from 'axios'
import { useContext } from 'react'

const UserLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})

    const {user,setUser}=React.useContext(UserDataContext)  
    const navigate=useNavigate()
  return (
    <div className='py-7 px-10 h-screen flex justify-between flex-col'>
        <div>
        <img className="w-20 py-8 pl-5 mb-5 " src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={async (e)=>{
            e.preventDefault()
            console.log(email, password)
            const userData={
                email: email,
                password: password
            }

            const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)

            if(response.status===200){
                console.log(response.data)
                const data=response.data
                setUser(data.user)
                localStorage.setItem('token',data.token)
                navigate('/home')
            }
            console.log(userData)
            console.log('submitted')
            setEmail('')
            setPassword('')}}> 
            <h3 className='text-xl mb-2 '>What's your email</h3>
            <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=' bg-white text-lg mb-7 rounded-md py-2 w-full px-4 border border-b-red-500'
                type="email"
                name=""
                id=""
                placeholder='email@example.com' />
            <h3 className='text-xl mb-2'>What's your password</h3>
            <input required value={password} onChange={(e)=>setPassword(e.target.value)} className=' bg-white text-lg mb-7 rounded-md py-2 w-full px-4 border border-b-red-500' type="password" name="" id="" placeholder='password' />
            <button className=' bg-black text-white font-bold hover:bg-slate-900 text-lg mb-7 rounded-md py-2 w-full px-4 border border-b-red-500' >Login</button>
            
        </form>
        <p> New Here?<Link to="/user/signup" className='flex items-center justify-center  w-full bg-black text-white py-3 rounded-xl mt-2 mb-5'>Create an account</Link></p>
        </div>
        <div>
            <Link to='/captain/login' className=' inline-block text-center bg-yellow-300 text-black font-bold  text-lg mb-7 rounded-md py-2 w-full px-4 border border-b-red-500'>Sign in as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin
