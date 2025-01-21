import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import LiveTracking from "../components/LiveTracking";


const CaptainHome = () => {


  const[ridePopup,setRidePopup]=useState(true)
  const[confirmRidePopup, setConfirmRidePopup]=useState(false)
  const ridePopupref=useRef(null)
  const confirmRidePopupref=useRef(null)


  useGSAP(() => {
    if (ridePopup) {
      gsap.to(ridePopupref.current, {
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(ridePopupref.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [ridePopup]);

  useGSAP(() => {
    if (confirmRidePopup) {
      gsap.to(confirmRidePopupref.current, {
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(confirmRidePopupref.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [confirmRidePopup]);

  return (
    <div>
      <div className="h-screen">
        <div className="">
        <img
        className="w-12 sm:w-16 md:w-20 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
          <Link
          to="/captain/login"
          className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i class=" text-lg font-semibold   ri-logout-circle-line"></i>
        </Link>
        </div>
        
        <div className="h-1/2">
          <LiveTracking/>
        </div>
        <div className="h-1/2 p-4">
             <CaptainDetails/>
        </div>
        <div
      
        ref={ridePopupref}
        className="fixed w-full translate-y-full bg-white z-10 bottom-0 px-3 py-6 sm:px-5 sm:py-8 shadow-lg rounded-t-2xl"
      >
        <RidePopup setConfirmRidePopup={setConfirmRidePopup} setRidePopup={setRidePopup}/>
      </div>
      <div
      
        ref={confirmRidePopupref}
        className="fixed w-full translate-y-full bg-white h-screen z-10 bottom-0 px-3 py-6 sm:px-5 sm:py-8 shadow-lg rounded-t-2xl"
      >
        <ConfirmRidePopup setConfirmRidePopup={setConfirmRidePopup} setRidePopup={setRidePopup}/>
      </div>
      </div>
    </div>
  );
};

export default CaptainHome;
