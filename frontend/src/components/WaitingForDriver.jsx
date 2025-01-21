import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div className="p-5 bg-white rounded-t-2xl shadow-md">
      <h5
        onClick={() => {
          props.setDriverFound(false);
        }}
        className="text-center cursor-pointer mb-5 text-gray-600 hover:text-black transition"
      >
        <i className="ri-arrow-down-wide-fill text-2xl sm:text-3xl"></i>
      </h5>

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
    </div>
  )
}

export default WaitingForDriver
