import React, { useState, useEffect } from "react";
import { FaStar, FaUserCircle } from "react-icons/fa";
import { db } from "../firebase"; // Import Firebase setup
import { collection, addDoc, getDocs } from "firebase/firestore";

const ReviewsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from Firestore
  const fetchReviews = async () => {
    const reviewsCollection = collection(db, "reviews");
    const reviewsSnapshot = await getDocs(reviewsCollection);
    const reviewsList = reviewsSnapshot.docs.map(doc => doc.data());
    setReviews(reviewsList);
  };

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit Review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save review to Firestore
      await addDoc(collection(db, "reviews"), {
        name,
        review,
        rating,
      });

      // Fetch updated reviews after submission
      fetchReviews();

      setIsModalOpen(false); // Close modal after submission
      setReview("");
      setName("");
      setRating(5);
    } catch (e) {
      console.error("Error saving review: ", e);
    }
  };

  return (
    <>
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Student Reviews</h2>

        {/* Display reviews */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((reviewData, index) => (
            <div key={index} className="p-6 bg-gray-50 shadow-lg rounded-lg">
              <FaUserCircle className="text-indigo-500 text-4xl mb-4" />
              <h3 className="font-semibold text-lg">{reviewData.name}</h3>
              <p>"{reviewData.review}"</p>
              <div className="flex mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-${i < reviewData.rating ? "yellow-500" : "gray-300"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Button to Open Review Modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-8 mx-auto block text-white bg-indigo-700 px-6 py-3 rounded-full hover:bg-indigo-600"
        >
          Leave a Review
        </button>
      </section>

      {/* Modal for adding a review */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Submit Your Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Name</label>
                <input
                  type="text"
                  className="w-full mt-2 p-3 border rounded"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Review</label>
                <textarea
                  className="w-full mt-2 p-3 border rounded"
                  placeholder="Your Review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Rating</label>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`cursor-pointer ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
                      onClick={() => setRating(index + 1)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-gray-500 border rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-700 text-white font-bold rounded-md hover:bg-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewsSection;
