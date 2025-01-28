import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const PastClassDetails = () => {
  const { id } = useParams(); // Get ID from URL
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      const docRef = doc(db, "pastClasses", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setClassData(docSnap.data());
      } else {
        console.error("No such document!");
      }
    };
    fetchClassDetails();
  }, [id]);

  if (!classData) {
    return <p>Loading class details...</p>;
  }

  const youtubeId = classData.videoLink.split("v=")[1]?.split("&")[0];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Class Details</h2>
      <div className="mb-6">
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p><strong>Description:</strong> {classData.description}</p>
      <p><strong>Date:</strong> {classData.date}</p>
      <p><strong>Remarks:</strong> {classData.remarks}</p>
      {classData.notesUrl && (
        <p>
          <strong>Additional Notes:</strong>{" "}
          <a href={classData.notesUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
            Download
          </a>
        </p>
      )}
    </div>
  );
};

export default PastClassDetails;
