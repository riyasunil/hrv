"use client"
import React, { useState, useEffect } from 'react';
import { auth, db } from "../../firebaseconfig.js";
import { increment } from "firebase/firestore"
import { collection, getDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation'


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
      question: "What is the capital of France?",
      options: [
        { text: "Paris", score: 3 },
        { text: "London", score: 0 },
        { text: "Berlin", score: 0 },
        { text: "Rome", score: 0 }
      ]
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: [
        { text: "Mars", score: 5 },
        { text: "Venus", score: 0 },
        { text: "Mercury", score: 0 },
        { text: "Jupiter", score: 0 }
      ]
    },
    // Add more questions here...
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
  );
};

export default QuizPage;
