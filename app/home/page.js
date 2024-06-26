"use client"
import React, { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from 'next/navigation'; // Update import
import Image from 'next/image';
import { auth } from "@/firebaseconfig";
import Navbar from "@/components/navbar/navbar";

export default function Home() {

  auth.onAuthStateChanged(function(user) {
    if (user) {
console.log(user)    } else {
      console.log("error no user")
    }
  });

    const router = useRouter();

    const handleClick = () => {
        router.push("/checkin");
    }
    const handleClickyoga = () => {
        router.push("/yoga");
    }

    const handleClickJournal = () => {
        router.push("/prompt");
    }

    const handleClickViewJournal = () => {
        router.push("/journal");
    }

    const handleClickQuiz = () => {
        router.push("/quiz");
    }
    const handleClickHrv = () => {
        router.push("/hrvpage");
    }
    const handleClickBpv = () => {
        router.push("/bpvpage");
    }

    return (
        <div>
            <Navbar />
        <div className="bg-white h-screen text-black flex flex-col justify-center items-center">
            <Button className="mt-2" variant="contained" onClick={handleClickHrv} style={{ width: '20%' }} >
                HRV COHERENCE
            </Button>
            <Button className="mt-2" variant="contained" onClick={handleClickBpv} style={{ width: '20%' }} >
                BLOOD PRESSURE VARIABILITY
            </Button>
            <Button className="mt-2" variant="contained" onClick={handleClickyoga} style={{ width: '20%' }}>
                STRESS RELIEF YOGA
            </Button>

            
        </div>
        </div>
    );
}