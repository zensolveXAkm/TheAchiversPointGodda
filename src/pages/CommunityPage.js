import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FaRegThumbsUp, FaTrashAlt } from "react-icons/fa"; // Added smile icon

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [userProfile, setUserProfile] = useState({ name: "", profilePhoto: "" });
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [userLikes, setUserLikes] = useState(new Set());
  const [showNotice, setShowNotice] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const fetchUserData = async () => {
        const userDoc = await getDocs(collection(db, "students"));
        const user = userDoc.docs.find((doc) => doc.id === currentUser.uid);
        if (user) {
          const userData = user.data();
          setUserProfile({
            name: userData.name || "",
            profilePhoto: userData.profilePhoto || "",
          });
        }

        // Fetch user's liked posts
        const likesRef = doc(db, "users_likes", currentUser.uid);
        const likesDoc = await getDoc(likesRef);
        if (likesDoc.exists()) {
          setUserLikes(new Set(likesDoc.data().likedPosts || []));
        }
      };
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    // Fetch posts from Firestore
    const fetchPosts = async () => {
      const postsQuery = query(collection(db, "community_posts"));
      const querySnapshot = await getDocs(postsQuery);
      const postsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          postedAt: data.postedAt.toDate(), // Convert timestamp to Date
        };
      });

      // Filter out posts older than 48 hours
      const filteredPosts = postsData.filter((post) => {
        const postAgeInHours = (new Date() - post.postedAt) / (1000 * 60 * 60);
        return postAgeInHours <= 48;
      });

      setPosts(filteredPosts);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Fetch the number of posts sent by the user today
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const fetchMessageCount = async () => {
        const postsQuery = query(
          collection(db, "community_posts"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(postsQuery);
        const today = new Date().toLocaleDateString();
        const todaysMessages = querySnapshot.docs.filter((doc) => {
          const timestamp = doc.data().postedAt.toDate();
          return timestamp.toLocaleDateString() === today;
        });
        setUserMessageCount(todaysMessages.length);
      };

      fetchMessageCount();
    }
  }, []);

  useEffect(() => {
    // Auto-hide notice after 5 seconds
    const timer = setTimeout(() => setShowNotice(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handlePostSubmit = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser && newPost.trim() !== "") {
      if (userMessageCount >= 100) {
        alert("You have reached the maximum number of messages for today.");
        return;
      }

      try {
        await addDoc(collection(db, "community_posts"), {
          userId: currentUser.uid,
          name: userProfile.name,
          profilePhoto: userProfile.profilePhoto,
          content: newPost,
          likes: 0,
          postedAt: new Date(),
        });

        setNewPost("");
        setUserMessageCount((prev) => prev + 1);
        alert("Message posted successfully!");
      } catch (error) {
        alert("Error posting message: " + error.message);
      }
    }
  };

  const handleLikePost = async (postId, currentLikes) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser && !userLikes.has(postId)) {
      try {
        // Increment like count in Firestore
        const postRef = doc(db, "community_posts", postId);
        await updateDoc(postRef, {
          likes: currentLikes + 1,
        });

        // Update liked posts in Firestore
        const likesRef = doc(db, "users_likes", currentUser.uid);
        const updatedLikes = new Set(userLikes);
        updatedLikes.add(postId);

        await setDoc(likesRef, { likedPosts: Array.from(updatedLikes) });

        // Update local state
        setUserLikes(updatedLikes);
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes: currentLikes + 1 } : post
          )
        );
      } catch (error) {
        alert("Error liking the post: " + error.message);
      }
    } else {
      alert("You have already liked this post!");
    }
  };

  const handleUnsendPost = async (postId) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const postRef = doc(db, "community_posts", postId);
      const postDoc = await getDoc(postRef);
      if (postDoc.exists() && postDoc.data().userId === currentUser.uid) {
        try {
          await deleteDoc(postRef);
          alert("Message unsent successfully!");
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } catch (error) {
          alert("Error unsending the message: " + error.message);
        }
      } else {
        alert("You can only unsend your own messages.");
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col">

      {showNotice && (
        <div className="bg-yellow-100 text-gray-700 text-sm p-3 rounded-xl mb-6 mx-auto max-w-lg text-center">
          <p>
            Posts will be automatically deleted after 48 hours.
          </p>
        </div>
      )}

      <div className="mb-6 bg-white p-4 rounded-lg shadow-md border-2 border-gray-200">
        <div className="flex items-center mb-4">
          <img
            src={userProfile.profilePhoto}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div className="flex items-center space-x-2 w-full">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              rows={1}
            />
          </div>
        </div>
        <button
          onClick={handlePostSubmit}
          disabled={newPost.trim() === ""}
          className="bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
        >
          Post ({userMessageCount}/100)
        </button>
      </div>

      {/* Scrollable posts section */}
      <div className="flex-1 overflow-y-auto mt-4 mb-20"> {/* Added margin-bottom of 20px */}
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts available.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded-lg mb-4 border-2 border-gray-200"
            >
              <div className="flex items-center mb-3">
                <img
                  src={post.profilePhoto}
                  alt={post.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <p className="font-semibold text-gray-800">{post.name}</p>
              </div>
              <p className="text-gray-700">{post.content}</p>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLikePost(post.id, post.likes)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaRegThumbsUp className="inline mr-2" />
                    {post.likes} Likes
                  </button>
                </div>
                {post.userId === getAuth().currentUser?.uid && (
                  <button
                    onClick={() => handleUnsendPost(post.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt className="inline mr-2" />
                    Unsend
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Navbar */}
      <div className="fixed bottom-5 left-0 right-0 mb-5">
       
      </div>
    </div>
  );
};

export default CommunityPage;
