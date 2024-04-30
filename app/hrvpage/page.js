"use client"
import Navbar from '@/components/navbar/navbar';
import React, { useState } from 'react';

export default function Hrvpage() {
    const [hrvData, setHrvData] = useState(null);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            setHrvData(data);
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

    return (
        <div>
            <Navbar />
        <div className=" p-4 border rounded-lg shadow-lg bg-white text-black h-screen flex justify-center items-center flex-col">
            <form onSubmit={handleSubmit}>
                <input type="file" id="fileInput" className="hidden" onChange={handleFileUpload} />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Upload CSV File</button>
            </form>
            {hrvData ? (
                <div className="mt-4">
                    <h2 className="text-lg font-bold">Heart Rate Variability Data:</h2>
                    <p>BPM: {hrvData.bpm}</p>
                    <p>IBI: {hrvData.ibi}</p>
                    <p>SDNN: {hrvData.sdnn}</p>
                </div>
            ) : (
                <p className="mt-4">Select a CSV file to upload and evaluate HRV data</p>
            )}
        </div>
        </div>
    );
}
