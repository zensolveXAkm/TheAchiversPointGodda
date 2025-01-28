import React from 'react';
import { FaBook, FaCalculator, FaUniversity, FaBalanceScale } from 'react-icons/fa';
import { GiPublicSpeaker, GiDiploma, GiAchievement } from 'react-icons/gi';
import { BsFillGridFill } from 'react-icons/bs';
import { GiTargetPrize } from "react-icons/gi";
import {  FaGraduationCap } from "react-icons/fa";
import { MdSchool } from "react-icons/md";

const coursesData = [
  {
    title: 'Class 8th, 9th & 10th',
    icon: <FaBook className="text-4xl text-blue-500" />,
    subjects: ['Math', 'Physics', 'Chemistry', 'English', 'Social Science (SST)'],
  },
  {
    title: 'Class 11th & 12th',
    icon: <FaCalculator className="text-4xl text-green-500" />,
    subjects: ['Math', 'Physics', 'Chemistry', 'English', 'Social Science (SST)'],
  },
];


const competitiveExamsData = [
  {
    exam: 'SSC',
    icon: <GiDiploma className="text-4xl text-red-500" />,
    courses: ['Basic to Advance English', 'Vocabulary', 'Practice Course', '120 Rules of Grammar'],
  },
  {
    exam: 'Banking',
    icon: <GiPublicSpeaker className="text-4xl text-orange-500" />,
    courses: ['Basic to Advance English', 'Vocabulary', 'Practice Course', '120 Rules of Grammar'],
  },
  {
    exam: 'CLAT',
    icon: <FaBalanceScale className="text-4xl text-purple-500" />,
    courses: ['Basic to Advance English', 'Vocabulary', 'Practice Course', '120 Rules of Grammar'],
  },
  {
    exam: 'CAT',
    icon: <FaGraduationCap className="text-4xl text-blue-500" />,
    courses: ['Verbal Ability and Reading Comprehension', 'Vocabulary Booster', 'Logical Reasoning', 'Grammar Skills'],
  },
  {
    exam: 'MAT',
    icon: <GiTargetPrize className="text-4xl text-yellow-500" />,
    courses: ['Reading Comprehension', 'Critical Reasoning', 'Grammar and Sentence Correction', 'Vocabulary Building'],
  },
  {
    exam: 'XAT',
    icon: <MdSchool className="text-4xl text-teal-500" />,
    courses: ['Verbal Ability and Logical Reasoning', 'Essay Writing', 'Vocabulary', 'Advanced Grammar Rules'],
  },
  {
    exam: 'CUET',
    icon: <GiDiploma className="text-4xl text-pink-500" />,
    courses: ['English Language Preparation', 'Grammar Mastery', 'Reading Skills', 'Comprehensive Practice'],
  },
  {
    exam: 'UPSC',
    icon: <GiAchievement className="text-4xl text-green-700" />,
    courses: ['Basic to Advance English', 'Vocabulary', 'Practice Course', '120 Rules of Grammar'],
  },
];


const Courses = () => {
  return (
    <div className="container-xxl py-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Courses We Offer</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coursesData.map((course, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              {course.icon}
              <h3 className="text-xl font-semibold ml-4">{course.title}</h3>
            </div>
            <ul className="space-y-2">
              {course.subjects.map((subject, idx) => (
                <li key={idx} className="flex items-center">
                  <BsFillGridFill className="mr-2 text-blue-500" />
                  <span>{subject}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {competitiveExamsData.map((exam, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              {exam.icon}
              <h3 className="text-xl font-semibold ml-4">{exam.exam}</h3>
            </div>
            <ul className="space-y-2">
              {exam.courses.map((course, idx) => (
                <li key={idx} className="flex items-center">
                  <BsFillGridFill className="mr-2 text-green-500" />
                  <span>{course}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
