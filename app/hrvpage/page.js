"use client"
import Navbar from '@/components/navbar/navbar';
import { auth, db } from "../../firebaseconfig.js";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import "./hrv.css"
import { FaInfoCircle } from 'react-icons/fa'

import { collection, getDocs, setDoc, doc, updateDoc,query,where, Timestamp } from "firebase/firestore";
import { Button } from '@mui/material';


export default function Hrvpage() {
    const [hrvData, setHrvData] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if (user) {
                setCurrentUser(user)
            } else {
                console.log("error no user")
            }
        });
    }, []);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/hrv/', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            setHrvData(data);
            storeHRVDataInFirebase(currentUser.uid);
        } catch (error) {
            console.error('Error uploading file and fetching HRV data:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Trigger file upload and HRV data evaluation process
        // by clicking the hidden input element
        document.getElementById('fileInput').click();
    };

    console.log("hrv" , hrvData)


    const storeHRVDataInFirebase = async (userId) => {
        const today = new Date().toLocaleDateString();
        try {
            const userHRVDocRef = doc(db, "user_hrv_records", userId);
            await setDoc(userHRVDocRef, { userId: userId, date: today }, { merge: true });
            console.log("HRV data stored successfully for", today);
        } catch (error) {
            console.error("Error storing HRV data in Firebase:", error);
        }
    };
    const handleclick = () =>{
        router.push("/checkin")
    }

    const handleinst = () =>{
        router.push("/hrvinst")
    }

    return (
        <div>
        <Navbar />
        <div className="hrvbox p-4 border rounded-lg shadow-lg bg-white text-black h-screen flex justify-center items-center flex-col">
            <form onSubmit={handleSubmit}>
                <input type="file" id="fileInput" className="hidden" onChange={handleFileUpload} />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Upload CSV File</button>
            </form>
           
            {hrvData ? (
                <div className="mt-4">
                    <h2 className="text-lg font-bold">Heart Rate Variability Data:</h2>
                    <p>SDNN: {hrvData.sdnn}</p>
                    <p>RMSSD: {hrvData.rmssd}</p>
                    <p>Pnn50: {hrvData.pnn50}</p>
                    <p>Lf nu: {hrvData.lf_nu}</p>
                    <p>Hf nu: {hrvData.hf_nu}</p>
                    <p>Lf/Hf: {hrvData.lf_nu/hrvData.hf_nu}</p>
                    <p>coherence: {hrvData.coherence}</p>

                    
                    {hrvData.coherence < 2 && 
                    <p> You have a very poor coherence score, Lets start Deep Breathing </p>
                    }
                    {hrvData.coherence >= 2 && 
                         <p> Your coherence is good, click to engage in a Deep Breathing Session</p>
                    }
                     <button onClick={handleclick} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Deep Breathing Session</button>

                </div>
            ) : (
                <div className='flex flex-row items-center justify-center'>
                <p className=" text-white">Select a CSV file to upload and evaluate HRV data</p>

                     <Button onClick={handleinst}  className="flex items-center">
                            <FaInfoCircle className="mr-2" size={20} /> {/* Icon */}
                        </Button>
                </div>
                
            )}
        </div>
    </div>
    );
}
