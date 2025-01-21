import React from 'react'
import { data, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import{CaptainDataContext} from '../context/CaptainContext'
import { useState } from 'react'
const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {captain,  setCaptain} = React.useContext(CaptainDataContext)
  return (
    <div className='py-7 px-10 h-screen flex justify-between flex-col'>
      <div >
        <img className="w-20 py-8 pl-5 mb-5 " src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={async(e)=>{
            e.preventDefault()
            console.log(email, password)
            const captain={
              email:email,
              password:password
            }
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captain)
            if(response.status===200){
              console.log(response.data)
              const data = response.data;
               setCaptain(data.captain)
              localStorage.setItem('token',data.token)
              navigate('/captain/home')
            }
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
        <p> Join a fleet?<Link to="/captain/signup" className='flex items-center justify-center  w-full bg-black text-white py-3 rounded-xl mt-2 mb-5'>Register as a Captain</Link></p>
        </div>
        <div>
          <Link to='/user/login' className=' inline-block text-center bg-yellow-300 text-black font-bold  text-lg mb-7 rounded-md py-2 w-full px-4 border border-b-red-500'>Sign in as user</Link>
        </div>
    </div>
  )
}

export default CaptainLogin
