"use client"
import React, {useState, useEffect} from "react";
import Image from 'next/image'
import { auth, db } from "../../firebaseconfig.js";
import { collection, getDoc, doc } from "firebase/firestore";
export default function Navbar() {
    const [userPoints, setUserPoints] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
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

    return(
        

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">HRV</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="/home" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <a href="/quiz" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Wellness Checkin</a>
        </li>
        <li>
          <a href="/yoga" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Yoga</a>
        </li>
      </ul>
      {/* <li>
          <a href="/reward" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
            <Image src="/leaf" width = {20} height={20}/>
          </a>
        </li> */}
    </div>
    <div>
    <a href="/reward" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 flex flex-row" aria-current="page">
            <Image src="/leaf.png" width = {20} height={20}/>
            {userPoints}
          </a>
    </div>
  </div>
</nav>

    );
}