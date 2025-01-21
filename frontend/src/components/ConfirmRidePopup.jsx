import React from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopup = (props) => {
  return (
    <div>
      <div>
      <h5
        onClick={() => {
          props.setConfirmRidePopup(false)
        }}
        className="text-center cursor-pointer mb-5 text-gray-600 hover:text-black transition"
      >
        <i className="ri-arrow-down-wide-fill text-2xl sm:text-3xl"></i>
      </h5>
      <h3 className="text-xl sm:text-2xl font-semibold mb-5 text-center">
        New Ride Available
      </h3>

        <div className='flex justify-between'>
        <div className="flex items-center justify-start  gap-4">
                <img className="h-10 w-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeqtG57Uu7JPn6AOyafNXcwz_mlutmNqLG1Q&s" alt="" />
                <h4 className="text-lg font-medium">Ramkrishna Mondal</h4>
              </div>
              <div>
                <h4 className="text-lg font-semibold">2.2KM</h4> 
              </div>
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
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
                <i className=" text-lg ri-map-pin-line"></i>
                <div p-2>
                    <h3 className="text-lg font-medium">uttarpara,berhampore</h3>
                    <p className="text-lg">pin-742187,Murshidabad</p>
                </div>
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

      <Link to='/captain-riding' onClick={()=>{
            props.setConfirmRidePopup(false)
            props.setRidePopup(false )
            props.setVehicleFound(false);
        
      }}  className="w-full block text-center mb-2 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all">
        Accept
      </Link>
      
    </div>
    </div>
  )
}

export default ConfirmRidePopup
