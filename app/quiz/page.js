"use client"
import React, { useState, useEffect } from 'react';
import { auth, db } from "../../firebaseconfig.js";
import { increment } from "firebase/firestore"
import { collection, getDocs, setDoc, doc, updateDoc,query,where, Timestamp } from "firebase/firestore";
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar/navbar.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const QuizPage = () => {
  // State to keep track of user selections and points
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [hasTakenQuizToday, setHasTakenQuizToday] = useState(false);

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

  useEffect(() => {
    checkIfUserHasTakenQuizToday(); // Check if the user has taken the quiz today when the component mounts
  }, []);

  // Function to check if the user has taken the quiz today
  const checkIfUserHasTakenQuizToday = async () => {
    if (!currentUser) return;

    const today = new Date().toLocaleDateString();
    const userQuizRef = collection(db, "user_quiz_scores");
    const querySnapshot = await getDocs(query(userQuizRef, where("userId", "==", currentUser.uid), where("date", "==", today)));

    if (!querySnapshot.empty) {
      setHasTakenQuizToday(true); // Set the state if the user has already taken the quiz today
    }
  };

  // Function to handle user selection
  const handleOptionSelect = (questionId, selectedOption) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: selectedOption });
  };

  // Function to calculate total points
  const calculateTotalPoints = async () => {
    if (!currentUser) return;
  
    // Check if the user has already taken the quiz today
    const today = new Date().toLocaleDateString();
    const userQuizRef = collection(db, "user_quiz_scores");
    const querySnapshot = await getDocs(query(userQuizRef, where("userId", "==", currentUser.uid), where("date", "==", today)));
    if (!querySnapshot.empty) {
      console.log("User has already taken the quiz today");
      return;
    }
  
    // Calculate total points
    let total = 0;
    for (const questionId in selectedOptions) {
      if (selectedOptions.hasOwnProperty(questionId)) {
        total += selectedOptions[questionId]; // Add the score of selected option
      }
    }
  
    // Store quiz score and timestamp
    try {
      const userQuizDocRef = doc(db, "user_quiz_scores", currentUser.uid + '_' + Date.now());
      await setDoc(userQuizDocRef, { userId: currentUser.uid, quiz_score: total, date: today });
      console.log("Quiz score stored successfully!");
    } catch (error) {
      console.error("Error storing quiz score: ", error);
    }
  
    // Navigate to the reward page
    router.push("/reward");
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
      <button onClick={calculateTotalPoints} disabled={hasTakenQuizToday} className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${hasTakenQuizToday ? "cursor-not-allowed opacity-50" : ""}`}>Submit</button>
      <p className="mt-4">Total Points: {totalPoints}</p>
    </div>
    </div>
  );
};

export default QuizPage;
