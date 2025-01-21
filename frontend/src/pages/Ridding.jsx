import React from 'react'
import { Link } from 'react-router-dom'

const Ridding = () => {
  return (
    <div className='h-screen'>

        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i class=" text-lg font-semibold   ri-home-fill"></i>
        </Link>
      <div className='h-1/2'>
      <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background"
        />
      </div>
      <div className='h-1/2 p-4'>
      <div className='flex items-center justify-between '>
        <img className='h-10' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" />
        <div className='text-right'>
            <h2 className='text-lg font-medium'>Ramkrishna</h2>
            <h4>WB 57 ab 3333</h4>
            <p className='text-sm text-gray-600'>Maruti suzuki Alto</p>
        </div>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 mb-2">
            <i className=" text-lg ri-user-fill"></i>
            <div p-2>
              <h3 className="text-lg font-medium">Ramkrishna</h3>
              <p className="text-lg">Enjoy!! your ride</p>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-5 p-3 mb-2">
              <i className=" text-lg ri-money-dollar-circle-line"></i>
              <div p-2>
                <h3 className="text-lg font-medium">$20</h3>
                <p className="text-lg">Book Now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all">Make a payment</button>
      </div>

    </div>
  )
}

export default Ridding
