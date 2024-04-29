"use client"
import React, { useState, useEffect } from 'react';
import { auth, db } from "../../firebaseconfig.js";
import { collection, getDoc, doc } from "firebase/firestore";
import Image from 'next/image'

export default function RewardPage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [userPoints, setUserPoints] = useState(0);
    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(user);
                fetchUserPoints(user.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchUserPoints = async (userId) => {
        try {
            console.log(currentUser)
            const userDocRef = doc(db, "points", userId);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                setUserPoints(docSnap.data().points);
            }
        } catch (error) {
            console.error("Error fetching user points: ", error);
        }
    };

    useEffect(() => {
        if (userPoints >= 5) {
            setMessage(" Looks like you've had a tough week 😕. Remember, every seed needs nurturing to grow. Take some time for self-care. Try out our features like HRV coherence and BPV for better results.Let's aim for better days ahead🤗");
            setImage("/seed.png");
        } else if (userPoints >= 10) {
            setMessage("You're making progress! This week might have had its challenges, but you're taking steps forward. Keep watering your efforts. Do try out our features like HRV coherence and BPV for better results 🤗");
            setImage("/fair.png");
        } else if (userPoints >= 20) {
            setMessage("Great efforts! You have had a pretty great week but your efforts are yet to bear fruits. Keep nurturing your well-being, and continue to flourish. Do try out our features like HRV Coherence and BPV for better results 🤗            ");
            setImage("/good.png");
        } else if(userPoints >= 100) {
            setMessage("Wow! It seems like you've had an excellent week!  Keep up the fantastic work.  Our features like HRV coherence and BPV can help nurture your well-being further . Let's strive for even more fruitful weeks ahead 🌟");
            setImage("/excel.png");
        }
    }, [userPoints]);

//     https://ibb.co/hHKVJ8f
// https://ibb.co/KWX3KWG
// https://ibb.co/LtjQs2V
// https://ibb.co/qRc5d4p
    return (
        <div className="bg-white h-screen flex flex-col justify-center items-center text-black ">
    <p className="text-xl mb-2 px-4">Your total points: {userPoints}</p>
    <div className="flex flex-col items-center w-9/12">
      <h3 className="text-xl mb-2 px-4">{message}</h3>
      <img src={image} alt="Reward" className="w-64 h-64 object-cover rounded-lg shadow-lg" width={300} height={300}/>
    </div>
  </div>
    );
}
