// "use client"
// import React, { useState, useEffect } from "react";
// import { TextField, Button } from "@mui/material";
// import {auth, db} from "../../firebaseconfig.js"; 
// import { addDoc, collection } from "@firebase/firestore";
// import { useRouter } from 'next/navigation'


// const promptList = [
//   "List 3 things you are grateful for today.",
//   "What is something you wanted to improve today?",
//   "Is there anything you regret that happened today ?"
// ];


// export default function Prompts() {
//   const router = useRouter()
//   const [answers, setAnswers] = useState({ a1: "", a2: "", a3: "" });
//   const [userId, setUserId] = useState(null);

//   const user = auth.currentUser;

//   useEffect(() => {
//     if (user) {
//       setUserId(user.uid);
//     } else {
//       console.log("No current user signed in");
//     }
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const data = {
//       userId, // Assuming you can retrieve the user ID
//       date: new Date().toISOString().slice(0, 10), // Formatted date

//       a1: answers.a1,
//       a2: answers.a2,
//       a3: answers.a3,

//       // Prompts are not stored as they are predefined
//     };

//     try {
//       // await firebase.firestore().collection("prompt").add(data);
//       await addDoc(collection(db, "prompt"), data).then(() => { router.push("/journal")})
//       console.log("Data successfully sent to Firestore!");
//       // Optionally, clear form or redirect
//     } catch (error) {
//       console.error("Error sending data to Firestore: ", error);
//     }
//   };

//   const handleChange = (event) => {
//     setAnswers({ ...answers, [event.target.name]: event.target.value });
//   };

//   return (
//     <div className="bg-white h-screen text-black flex flex-col justify-center items-center text-left">
//       <form onSubmit={handleSubmit}>
//         {promptList.map((prompt, index) => (
//           <div key={index}>
//             <p>{prompt}</p>
//             <TextField
//               name={`a${index + 1}`} // Dynamic answer names (a1, a2, a3)
//               variant="standard"
//               id={`outlined-multiline-static-${index + 1}`}
//               multiline
//               className="w-1/2"
//               margin="normal"
//               value={answers[`a${index + 1}`]} // Pre-fill answers
//               onChange={handleChange}
//             />
//           </div>
//         ))}
//         <Button type="submit" variant="contained" color="primary">
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// }
