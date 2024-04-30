"use client"
import React, { useState, useEffect } from 'react';
import { auth, db } from "../../firebaseconfig.js";
import { increment } from "firebase/firestore"
import { collection, getDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar/navbar.js';


const QuizPage = () => {
  // State to keep track of user selections and points
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  const router = useRouter()


  auth.onAuthStateChanged(function(user) {
    if (user) {
      setCurrentUser(user)
    } else {
      console.log("error no user")
    }
  });

  // Quiz questions and options
  const questions = [
    {
      id: 1,
      question: "How was your day?",
      options: [
        { text: "Happy ", score: 3 },
        { text: "Neutral", score: 2 },
        { text: "Sad", score: 1 },
      ]
    },
    {
      id: 2,
      question: "Did you get 6 or more hours of sleep today?",
      options: [
        { text: "Yes", score: 5 },
        { text: "No", score: 2 },
       
      ]
    },
    {
      id: 3,
      question: "Did you have 3 meals today?",
      options: [
        { text: "Yes", score: 5 },
        { text: "No", score: 2 },
       
      ]
    },
    {
      id: 4,
      question: "Did you exercise today?",
      options: [
        { text: "Yes", score: 5 },
        { text: "No", score: 2 },
       
      ]
    },
  ];

  // Function to handle user selection
  const handleOptionSelect = (questionId, selectedOption) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: selectedOption });
  };

  // Function to calculate total points
  const calculateTotalPoints = async () => {
    let total = 0;
    for (const questionId in selectedOptions) {
      if (selectedOptions.hasOwnProperty(questionId)) {
        total += selectedOptions[questionId]; // Add the score of selected option
      }
    }
    setTotalPoints(total);

    if (currentUser) {
      try {
        const userDocRef = doc(db, "points", currentUser.uid);

        // Check if the document exists
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          // Document exists, update it
          await updateDoc(userDocRef, {
            userid: currentUser.uid,
            points: increment(total) // Use increment function to add total points
          });

        } else {
          // Document does not exist, create it with the initial points
          await setDoc(userDocRef, { points: total });
        }

        console.log("Points updated successfully!");
        router.push("/reward")
      } catch (error) {
        console.error("Error updating points: ", error);
      }
    }
  };

  return (
    <div>
      <Navbar />
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg text-black">
      <h1 className="text-3xl font-bold mb-6">Quiz</h1>
      {questions.map(question => (
        <div key={question.id} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{question.question}</h2>
          <ul>
            {question.options.map(option => (
              <li key={option.text} className="mb-2 ">
                <label className="flex items-center ">
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={option.text}
                    onChange={() => handleOptionSelect(question.id, option.score)}
                    checked={selectedOptions[question.id] === option.score}
                    className="mr-2"
                  />
                  <span className="text-gray-800">{option.text}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={calculateTotalPoints} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
      <p className="mt-4">Total Points: {totalPoints}</p>
    </div>
    </div>
  );
};

export default QuizPage;
