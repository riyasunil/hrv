"use client"
import Image from "next/image";
import Link from "next/link";
import homepageicon from "../public/homepage.svg";
import { useRouter } from 'next/navigation'; // Update import
import { Button } from "@mui/material";
export default function Home() {
  const router = useRouter();

  const handleclick = () => {
    router.push("/login")
  }
  return (
    <div className="flex h-screen">
    <div className="w-1/2 bg-background-color flex items-center justify-center">
      <Image
        priority
        src={homepageicon}
        className=""
      />
        {/* SVG content */}
      
    </div>
    <div className="w-1/2 bg-background-color flex items-center justify-center flex-col text-black">
      <h1 className="text-4xl font-bold mb-4">Sync.<br />Unwind.<br />Thrive.</h1>
      
        <Button variant="contained" color="primary" onClick={handleclick}>
            Get Started
          </Button>
    </div>
  </div>
  );
}
