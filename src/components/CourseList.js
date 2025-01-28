import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const categoryOptions = [
  "Science Students", "Commerce Students", "Class 1", "Class 2", "Class 3", 
  "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", 
  "Class 10", "Class 11", "Class 12", "More"
];

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const courseData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCourses(courseData);
        setFilteredCourses(courseData); // Initially show all courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    filterCourses(updatedCategories);
  };

  const filterCourses = (categories) => {
    if (categories.length === 0) {
      setFilteredCourses(courses); // Show all if no filter is selected
    } else {
      const filtered = courses.filter((course) =>
        categories.some((category) => course.categories.includes(category))
      );
      setFilteredCourses(filtered);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Available Courses</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Filter by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryOptions.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} className="bg-white p-4 shadow-sm rounded-lg">
              <img
                src={course.thumbnailUrl}
                alt={course.topic}
                className="w-full h-32 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-4">{course.topic}</h3>
              <p className="text-gray-600 mt-2 text-sm">{course.description}</p>
              <p className="mt-2 text-sm">Author: {course.author}</p>
              <p className="mt-2 text-sm">Duration: {course.duration}</p>
              <p className="mt-2 text-sm">Best For: {course.bestFor}</p>
              <p className="mt-2 text-sm">Categories: {course.categories.join(", ")}</p>
              <p className="mt-2 text-sm">
                Price: <strong>{course.price}</strong>
              </p>
              <a href={course.courseLink} className="mt-4 block text-blue-500 text-sm underline">
                Go to Course
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No courses found for the selected categories.</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;
