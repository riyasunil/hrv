"use client"
import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebaseconfig.js'; // Assuming you have Firebase initialized and imported properly

export default function JournalPage() {
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        const fetchJournals = async () => {
            if (!auth.currentUser) return(
               console.log("no uer signed in")
            ); // If no user is signed in, return
            const userId = auth.currentUser.uid;
            console.log(userId)
            const q = query(collection(db, 'prompt'), 
                            where('userId', '==', userId),
                            orderBy('date', 'desc')); // Ordering by 'date' in descending order

            try {
                const querySnapshot = await getDocs(q);
                console.log(querySnapshot)
                const fetchedJournals = [];
                querySnapshot.forEach((doc) => {
                    fetchedJournals.push({ id: doc.id, ...doc.data() });
                });
                setJournals(fetchedJournals);
                
            } catch (error) {
                console.error('Error fetching journals:', error);
            }
        };

        fetchJournals();
    }, []);

    console.log(journals);

    return(
        <div className="bg-white min-h-screen text-black py-8 px-4">
        <div className="text-3xl font-semibold mb-4">Your Journals</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {journals.map(journal => (
                <div key={journal.id} className="bg-gray-100 p-4 rounded-md">
                     <h3 className="text-lg font-semibold mb-2">Date: {journal.date}</h3>
                    <p className="mb-2">{journal.a1}</p>
                    <p className="mb-2">{journal.a2}</p>
                    <p className="mb-2">{journal.a3}</p>
                   
                </div>
            ))}
        </div>
    </div>
    );
}
