import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase"; // Ensure correct Firestore import
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { FaExternalLinkAlt } from "react-icons/fa";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const userDoc = await getDoc(doc(db, "students", auth.currentUser.uid));
        if (userDoc.exists()) {
          const userClass = userDoc.data().class; // Fetch user's class
          const querySnapshot = await getDocs(collection(db, "notes"));
          const notesData = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((note) => note.class === userClass); // Filter by class
          setNotes(notesData);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Class Notes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-lg overflow-hidden border border-gray-300 hover:border-black hover:bg-gray-100 transition-all cursor-pointer"
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{note.topic}</h3>
                  <p className="text-gray-600 mb-1">
                    <strong>Subject:</strong> {note.subject}
                  </p>
                  <p className="text-gray-600 mb-2">{note.description}</p>
                  {note.remarks && (
                    <p className="text-gray-500 mb-2">Remarks: {note.remarks}</p>
                  )}
                  {note.attachmentUrl && (
                    <a
                      href={note.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-black font-medium"
                    >
                      View Attachment <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No notes available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
