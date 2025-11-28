'use client'
import { useState } from 'react'
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  return (
    <div className="w-screen overflow-x-hidden bg-white min-h-screen">
      <Navbar 
        onLoginClick={() => {}} 
        isLoggedIn={isLoggedIn}
        userData={userData}
        setIsLoggedIn={setIsLoggedIn}
        setUserData={setUserData}
      />
      <Hero />
    </div>
  );
}
