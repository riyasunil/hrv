// "use client"
// import React, { useState, useEffect, useOptimistic } from 'react';
// import { auth, db } from "../../firebaseconfig.js";
// import { collection, getDoc, doc } from "firebase/firestore";
// import Image from 'next/image'
// import Navbar from '@/components/navbar/navbar.js';
// import { useRouter } from 'next/navigation'
// import { motion } from 'framer-motion';


// export default function RewardPage() {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [userPoints, setUserPoints] = useState(0);
//     const [message, setMessage] = useState("");
//     const [image, setImage] = useState("");
//     const router = useRouter()

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged(user => {
//             if (user) {
//                 setCurrentUser(user);
//                 fetchUserPoints(user.uid);
//             }
//         });

//         return () => unsubscribe();
//     }, []);

//     const fetchUserPoints = async (userId) => {
//         try {
//             console.log(currentUser)
//             const userDocRef = doc(db, "points", userId);
//             const docSnap = await getDoc(userDocRef);
//             if (docSnap.exists()) {
//                 setUserPoints(docSnap.data().points);
//             }
//         } catch (error) {
//             console.error("Error fetching user points: ", error);
//         }
//     };

//     const handleclick = () =>{
//         router.push("/checkin")
//     }

//     useEffect(() => {
//         if (userPoints >= 5 && userPoints <10) {
//             setMessage(" Looks like you've had a tough week 😕. Remember, every seed needs nurturing to grow. Take some time for self-care. Try out our features like HRV coherence and BPV for better results.Let's aim for better days ahead🤗");
//             setImage("/seedling.svg");
//         } else if (userPoints >= 10 && userPoints <20) {
//             setMessage("You're making progress! This week might have had its challenges, but you're taking steps forward. Keep watering your efforts. Do try out our features like HRV coherence and BPV for better results 🤗");
//             setImage("/leaf.svg");
//         } else if (userPoints >= 20 && userPoints <100) {
//             setMessage("Great efforts! You have had a pretty great week but your efforts are yet to bear fruits. Keep nurturing your well-being, and continue to flourish. Do try out our features like HRV Coherence and BPV for better results 🤗            ");
//             setImage("/tree2.svg");
//         } else if(userPoints >= 100) {
//             setMessage("Wow! It seems like you've had an excellent week!  Keep up the fantastic work.  Our features like HRV coherence and BPV can help nurture your well-being further . Let's strive for even more fruitful weeks ahead 🌟");
//             setImage("/fruittree.svg");
//         }
//     }, [userPoints]);

// //     https://ibb.co/hHKVJ8f
// // https://ibb.co/KWX3KWG
// // https://ibb.co/LtjQs2V
// // https://ibb.co/qRc5d4p
//     return (
// <div>
//             <Navbar />
//             <div className="bg-white h-screen flex flex-col justify-center items-center text-black">
//                 <p className="text-xl mb-2 px-4 mb-8 font-bold">Your total points: {userPoints}</p>
//                 <div className="flex justify-center items-center w-full gap-20">
//                     {userPoints >= 5 && <motion.div animate={{ scale: userPoints >= 5 && userPoints < 10 ? 1.8 : 1 }} className="mr-2"><Image src="/seedling.svg" alt="Seedling" width={100} height={100} /></motion.div>}
//                     {userPoints >= 10 && <motion.div animate={{ scale: userPoints >= 10 && userPoints < 20 ? 1.8 : 1 }} className="mr-2"><Image src="/leaf.svg" alt="Leaf" width={100} height={100} /></motion.div>}
//                     {userPoints >= 20 && <motion.div animate={{ scale: userPoints >= 20 && userPoints < 100 ? 1.8 : 1 }} className="mr-2"><Image src="/tree2.svg" alt="Tree" width={100} height={100} /></motion.div>}
//                     {userPoints >= 100 && <motion.div animate={{ scale: userPoints >= 100 ? 1.8 : 1 }} className="mr-2"><Image src="/fruittree.svg" alt="Fruit Tree" width={100} height={100} /></motion.div>}
//                 </div>
//                 <div className="text-xl mb-2 px-4 mt-20 w-1/2" >{message}</div>
//                 {userPoints < 100 && <button onClick={handleclick} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Deep Breathing Session</button>}
//             </div>
//         </div>
//     );
// }
