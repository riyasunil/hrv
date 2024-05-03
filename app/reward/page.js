"use client"
import React, { useState, useEffect } from 'react';
import { auth, db } from "../../firebaseconfig.js";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import Navbar from '@/components/navbar/navbar.js';
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion';
import Image from 'next/image'

const RewardPage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userPoints, setUserPoints] = useState(0);
    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");
  
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(user);
                calculateComprehensiveScore(user.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    const calculateComprehensiveScore = async (userId) => {
        console.log(userId)
        const today = new Date();
        console.log(today)
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        console.log(lastWeek)

        try {
            const hrvQuerySnapshot = await getDocs(query(collection(db, "user_hrv_records"), 
            where("userId", "==", "PH7yjhCjyPSbYc5eOsSc0yScyb42"),
            //  where("date", ">=", lastWeek)
            ));
            const bpvQuerySnapshot = await getDocs(query(collection(db, "user_bpv_records"), 
            where("userId", "==", userId),
            //  where("date", ">=", lastWeek)
            ));
            const quizQuerySnapshot = await getDocs(query(collection(db, "user_quiz_scores"), 
            where("userId", "==", "PH7yjhCjyPSbYc5eOsSc0yScyb42"), 
            // where("date", ">=", lastWeek)
        ));

            const hrvCount = hrvQuerySnapshot.size;
            const bpvCount = bpvQuerySnapshot.size;
            const quizScores = [];
            quizQuerySnapshot.forEach(doc => {
                quizScores.push(doc.data().quiz_score);
            });
            console.log(hrvCount)
            console.log(bpvCount)


            const quizAvgScore = quizScores.reduce((acc, curr) => acc + curr, 0) / quizScores.length;

            let hrvScore = hrvCount >= 4 ? 10 : 5;
            let bpvScore = bpvCount >= 4 ? 10 : 5;
            let quizScore = (quizAvgScore / 20) * 30; // Max quiz score is 20, converting to 30
            console.log(quizScore)
            const comprehensiveScore = hrvScore + bpvScore + quizScore;
            console.log(comprehensiveScore)
            setUserPoints(comprehensiveScore);

            if (comprehensiveScore >= 40) {
                setMessage("Wow! It seems like you've had an excellent week! Keep up the fantastic work.");
                setImage("/fruittree.svg");
            } else if (comprehensiveScore >= 30) {
                setMessage("Great efforts! You have had a pretty great week but your efforts are yet to bear fruits.");
                setImage("/tree2.svg");
            } else if (comprehensiveScore >= 20) {
                setMessage("You're making progress! This week might have had its challenges, but you're taking steps forward.");
                setImage("/leaf.svg");
            } else {
                setMessage("Looks like you've had a tough week. Remember, every seed needs nurturing to grow.");
                setImage("/seedling.svg");
            }
        } catch (error) {
            console.error("Error calculating comprehensive score: ", error);
        }
    };
    const handleclick = () =>{
        router.push("/checkin")
    }

    return (
        <div>
            <Navbar />
            <div className="bg-white h-screen flex flex-col justify-center items-center text-black">
                <p className="text-xl  px-4 mb-20 font-bold">Your total points: {userPoints}</p>
                <div className="flex justify-center items-center w-full gap-20">
                    {<motion.div animate={{ scale: userPoints >= 0 && userPoints < 10 ? 1.8 : 1 }} className="mr-2"><Image src="/seedling.svg" alt="Seedling" width={100} height={100} /></motion.div>}
                    { <motion.div animate={{ scale: userPoints >= 20 && userPoints < 30 ? 1.8 : 1 }} className="mr-2"><Image src="/leaf.svg" alt="Leaf" width={100} height={100} /></motion.div>}
                    { <motion.div animate={{ scale: userPoints >= 30 && userPoints < 40 ? 1.8 : 1 }} className="mr-2"><Image src="/tree2.svg" alt="Tree" width={100} height={100} /></motion.div>}
                    {<motion.div animate={{ scale: userPoints >= 40 ? 1.8 : 1 }} className="mr-2"><Image src="/fruittree.svg" alt="Fruit Tree" width={100} height={100} /></motion.div>}
                </div>
                <div className="text-xl mb-2 px-4 mt-20 w-1/2" >{message}</div>
                {/* {userPoints < 100 && <button onClick={handleclick} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Deep Breathing Session</button>} */}
            </div>
        </div>
    );
};

export default RewardPage;
