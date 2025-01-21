import React from "react";
import { Link } from "react-router-dom";
import { Axios } from "axios";
const ConfirmedRide = (props) => {
  return (
    <div className="p-5 bg-white rounded-t-2xl shadow-md">
      <h5
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
        className="text-center cursor-pointer mb-5 text-gray-600 hover:text-black transition"
      >
        <i className="ri-arrow-down-wide-fill text-2xl sm:text-3xl"></i>
      </h5>
      <h3 className="text-xl sm:text-2xl font-semibold mb-5 text-center">
        Confirm Your Ride
      </h3>

        <div className='flex gap-2 justify-between flex-col items-center'>
            
            <div className="w-full">
                <div>
                <div className="flex items-center gap-5 p-3 mb-2">
                <i className=" text-lg ri-map-pin-line"></i>
                <div p-2>
                    <h3 className="text-lg font-medium">{props.pickUp}</h3>
                </div>
                </div>
                </div>
                <div>
                <div className="flex items-center gap-5 p-3 mb-2">
                <i className=" text-lg ri-map-pin-line"></i>
                <div p-2>
                    <h3 className="text-lg font-medium">{props.destination}</h3>
                </div>
                </div>
                </div>
                <div>
                <div className="flex items-center gap-5 p-3 mb-2">
                <i className=" text-lg ri-money-dollar-circle-line"></i>
                <div p-2>
                    <h3 className="text-lg font-medium">{props.vehicleType}</h3>
                    <p className="text-lg">Book Now</p>
                </div>
                </div>
                </div>

            </div>
        </div>

      <Link to='' onClick={()=>{
        props.setVehicleFound(true)
        props.setConfirmRidePanel(false)
        props.setVehiclePanelOpen(false)
        props.createRide()
        
        
      }}  className="w-full block text-center py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all">
        Confirm Ride
      </Link>
    </div>
  );
};

export default ConfirmedRide;