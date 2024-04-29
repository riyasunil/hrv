"use client"
import React, { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from 'next/navigation'; // Update import
import Image from 'next/image';
import { auth } from "@/firebaseconfig";

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

    const handleClickJournal = () => {
        router.push("/prompt");
    }

    const handleClickViewJournal = () => {
        router.push("/journal");
    }

    const handleClickQuiz = () => {
        router.push("/quiz");
    }

    return (
        <div className="bg-white h-screen text-black flex flex-col justify-center items-center">
            <Button className="mt-2" variant="contained" onClick={handleClick} style={{ width: '20%' }} >
                HRV COHERENCE
            </Button>
            <Button className="mt-2" variant="contained" style={{ width: '20%' }} >
                BLOOD PRESSURE VARIABILITY
            </Button>
            <Button className="mt-2" variant="contained" style={{ width: '20%' }}>
                STRESS RELIEF YOGA
            </Button>
            <Button className="mt-2" variant="contained" style={{ width: '20%' }} onClick={handleClickJournal} >
                CREATE JOURNAL
            </Button>
            {/* <Button className="mt-2" variant="contained" style={{ width: '20%' }} onClick={handleClickViewJournal} >
                VIEW JOURNAL
            </Button> */}
            <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <Button variant="contained" onClick={handleClickQuiz} >
                    Quiz
                </Button>
            </div>
        </div>
    );
}