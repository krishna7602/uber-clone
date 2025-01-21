import React, { useRef, useState,useEffect } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPannel from "../components/locationSearchPannel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDreiver from "../components/LookingForDreiver";
import WaitingForDriver from "../components/WaitingForDriver";
import LiveTracking from "../components/LiveTracking";
// import { SocketContext } from '../context/SocketContext';
// import { useContext } from 'react';
// import { UserDataContext } from '../context/UserContext';
// import { useNavigate } from 'react-router-dom';



const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [driverFound, setDriverFound] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [ fare, setFare ] = useState([])
  const [ vehicleType, setVehicleType ] = useState(null)
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRide = useRef(null);
  const vehicleFoundRef = useRef(null);
  const driverfoundref = useRef(null);

  const submithandeler = (e) => {
    e.preventDefault();
    setPickup("");
    setDestination("");
  };


  
  // const navigate = useNavigate()

//   const { socket } = useContext(SocketContext)
//   const { user } = useContext(UserDataContext)

//   useEffect(() => {
//       socket.emit("join", { userType: "user", userId: user._id })
//       console.log(user)
//   }, [ user ])

//   socket.on('ride-confirmed', ride => {


//       setVehicleFound(false)
//       setWaitingForDriver(true)
//       setRide(ride)
//   })

//   socket.on('ride-started', ride => {
//     console.log("ride")
//     setWaitingForDriver(false)
//     navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
// })


  
  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPickupSuggestions(response.data);
    } catch (error) {
      console.error("Error in getting suggestion:", error);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setDestinationSuggestions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRide.current, {
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(confirmRide.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [confirmRidePanel]);

  // useGSAP(() => {
  //   if (vehicleFound) {
  //     gsap.to(vehicleFoundRef.current, {
  //       transform: "translateY(0)",
  //       duration: 0.5,
  //       ease: "power2.out",
  //     });
  //   } else {
  //     gsap.to(vehicleFoundRef.current, {
  //       transform: "translateY(100%)",
  //       duration: 0.5,
  //       ease: "power2.in",
  //     });
  //   }
  // }, [vehicleFound]);

  useGSAP(() => {
    if (driverFound) {
      gsap.to(driverfoundref.current, {
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(driverfoundref.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [driverFound]);


  async function findTrip() {
    setVehiclePanelOpen(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })


    setFare(response.data)
}

const createRide = async () => {
  try {
    const response=await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
      }
      
    );
    console.log(response.data)
  } catch (error) {
    console.log(pickup)
    console.log(destination)
    console.log(vehicleType)
    console.log(error);
  }
  
};


  return (
    <div className="h-screen relative overflow-x-hidden bg-gray-100">
      {/* Logo */}
      <img
        className="w-12 sm:w-16 md:w-20 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      {/* Background Image */}
      <div
        onClick={() => {
          setVehiclePanelOpen(false);
        }}
        className="h-screen w-screen"
      >
        <LiveTracking/>
      </div>

      {/* Search Panel */}
      <div className="absolute top-0 w-full h-screen flex flex-col justify-end">
        <div className="h-[30%] sm:h-[35%] md:h-[40%] p-5 bg-white shadow-lg rounded-t-2xl">
          <h5
            onClick={() => setPanelOpen(false)}
            className="text-2xl sm:text-3xl text-gray-600 cursor-pointer mb-3"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-xl sm:text-2xl md:text-4xl font-semibold text-gray-800 mb-4">
            Find a Trip
          </h4>
          <form onSubmit={submithandeler}>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={async() => {
                setPanelOpen(true);
                setActiveField("destination");
                
              }}
              
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
            <button onClick={findTrip} className="bg-black w-full flex justify-center border-2 rounded-lg text-white p-3 mt-2" >
              Find Trip</button>
        </div>

        {/* Location Search Panel */}
        <div
          ref={panelRef}
          className="translate-y-6 bg-white overflow-hidden transition-all duration-500 shadow-lg rounded-t-2xl"
        >
          <LocationSearchPannel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            vehiclePanelOpen={vehiclePanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            panelOpen={panelOpen}
            setPanelOpen={setPanelOpen}
            setPickup={setPickup}
            setDestination={setDestination} // Add this
            activeField={activeField} 
          />
        </div>
      </div>

      {/* Vehicle Panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full translate-y-full bg-white z-10 bottom-0 px-3 py-6 sm:px-5 sm:py-8 shadow-lg rounded-t-2xl"
      >
        <VehiclePanel
          createRide={createRide}
          setVehicleType={setVehicleType}
          fare={fare}
          setVehiclePanelOpen={setVehiclePanelOpen}
          setSelectedVehicle={setSelectedVehicle}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={confirmRide}
        className="fixed w-full translate-y-full bg-white z-10 bottom-0 px-3 py-6 sm:px-5 sm:py-8 shadow-lg rounded-t-2xl"
      >
        <ConfirmedRide
          createRide={createRide}
          pickUp={pickup}
          fare={fare}
          destination={destination}
          vehicle={selectedVehicle}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          setVehiclePanelOpen={setVehiclePanelOpen}
          
        />
      </div>

      {/* <div
        ref={vehicleFoundRef}
        className="fixed w-full translate-y-full bg-white z-10 bottom-0 px-3 py-6 sm:px-5 sm:py-8 shadow-lg rounded-t-2xl"
      >
        <LookingForDreiver setVehicleFound={setVehicleFound} />
      </div> */}

      <div
        ref={vehicleFoundRef}
        className="fixed w-full translate-y-full bg-white z-10 bottom-0 px-3 py-6 sm:px-5 sm:py-8 shadow-lg rounded-t-2xl"
      >
        <LookingForDreiver setVehicleFound={setVehicleFound} />
      </div>

      <div
        ref={driverfoundref}
        className="fixed w-full translate-y-full bg-white z-10 bottom-0 px-3 py-6 sm:px-5 sm:py-8 shadow-lg rounded-t-2xl"
      >
        <WaitingForDriver setDriverFound={setDriverFound} />
      </div>
    </div>
  );
};

export default Home;
