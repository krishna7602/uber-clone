import React from "react";

const LookingForDreiver = (props) => {
  
  return (
    <div className="p-5 bg-white rounded-t-2xl shadow-md">
      <h5
        onClick={() => {
          props.setVehicleFound(false);
        }}
        className="text-center cursor-pointer mb-5 text-gray-600 hover:text-black transition"
      >
        <i className="ri-arrow-down-wide-fill text-2xl sm:text-3xl"></i>
      </h5>
      <h3 className="text-xl sm:text-2xl font-semibold mb-5 text-center">
        Looking For a Driver
      </h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 mb-2">
            <i className=" text-lg ri-user-fill"></i>
            <div p-2>
              <h3 className="text-lg font-medium">{props.pickup}</h3>
              <p className="text-lg">Enjoy!! your ride</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-5 p-3 mb-2">
              <i className=" text-lg ri-map-pin-line"></i>
              <div p-2>
                <h3 className="text-lg font-medium">{props.destination}</h3>
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
  );
};

export default LookingForDreiver;
