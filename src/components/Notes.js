import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { FaExternalLinkAlt } from "react-icons/fa";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]); // Store unfiltered notes
  const [userClass, setUserClass] = useState("");
  const [userSubject, setUserSubject] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDoc = await getDoc(doc(db, "students", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserClass(userDoc.data().class || "");
          setUserSubject(""); // Default to show all subjects initially
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (auth.currentUser) {
      fetchUserDetails();
    }
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notes"));
        const notesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllNotes(notesData); // Store all notes initially
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const filteredNotes = allNotes.filter(
      (note) =>
        note.class === userClass &&
        (userSubject ? note.subject === userSubject : true)
    );
    setNotes(filteredNotes);
  }, [userClass, userSubject, allNotes]);

  return (
    <div className="bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Class Notes</h2>

        {/* Subject Filter */}
        <div className="mb-6">
          <label htmlFor="subject" className="block text-gray-600 mb-2">
            Filter by Subject:
          </label>
          <select
            id="subject"
            value={userSubject}
            onChange={(e) => setUserSubject(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">All Subjects</option>
            <option value="Science">Science</option>
            <option value="Maths">Maths</option>
            <option value="Social Science">Social Science</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Computer">Computer</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-lg overflow-hidden border border-gray-300 hover:border-black hover:bg-gray-100 transition-all cursor-pointer"
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {note.topic}
                  </h3>
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
