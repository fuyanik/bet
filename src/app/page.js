'use client'
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import BottomNavbar from '@/components/BottomNavbar';

export default function Home() {
  return (
    <div className="w-screen overflow-x-hidden bg-white min-h-screen">
      <Navbar onLoginClick={() => {}} />
      <Hero />
      <BottomNavbar />
    </div>
  );
}
