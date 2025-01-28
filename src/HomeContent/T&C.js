import React from 'react';
import { FaClipboardList, FaInfoCircle, FaQuestionCircle, FaShieldAlt, FaRegFileAlt } from 'react-icons/fa';

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
          <h2 className="text-4xl font-bold">Terms and Conditions</h2>
          <p className="mt-2 text-lg">By accessing and using "The Achievers' Point" website or enrolling in our courses, you agree to these terms and conditions.</p>
        </div>

        {/* General Section */}
        <section className="p-8">
          <h3 className="text-2xl font-semibold mb-4">
            <FaClipboardList className="inline-block mr-2" />
            General
          </h3>
          <p className="text-gray-700">By accessing and using "The Achievers' Point" website or enrolling in our courses, you agree to these terms and conditions.</p>
        </section>

        {/* Admissions Section */}
        <section className="p-8">
          <h3 className="text-2xl font-semibold mb-4">
            <FaInfoCircle className="inline-block mr-2" />
            Admissions
          </h3>
          <ul className="list-disc pl-8 text-gray-700">
            <li>Admission is subject to availability and completion of the registration process.</li>
            <li>Students must submit accurate information during registration.</li>
          </ul>
        </section>

        {/* Fee Policy Section */}
        <section className="p-8 bg-gray-50">
          <h3 className="text-2xl font-semibold mb-4">
            <FaRegFileAlt className="inline-block mr-2" />
            Fee Policy
          </h3>
          <ul className="list-disc pl-8 text-gray-700">
            <li>Fees must be paid in full before the start of the course.</li>
            <li>Fees are non-refundable and non-transferable except in specific cases approved by management.</li>
            <li>Payment methods include online transactions, UPI, and offline payment at our institute.</li>
          </ul>
        </section>

        {/* Online Classes Section */}
        <section className="p-8">
          <h3 className="text-2xl font-semibold mb-4">
            <FaRegFileAlt className="inline-block mr-2" />
            Online Classes
          </h3>
          <ul className="list-disc pl-8 text-gray-700">
            <li>Online classes are conducted via secure platforms. Login details are provided upon enrollment.</li>
            <li>Students are responsible for ensuring a stable internet connection during classes.</li>
          </ul>
        </section>

        {/* Study Material Section */}
        <section className="p-8 bg-gray-50">
          <h3 className="text-2xl font-semibold mb-4">
            <FaShieldAlt className="inline-block mr-2" />
            Study Material and Intellectual Property
          </h3>
          <ul className="list-disc pl-8 text-gray-700">
            <li>All study materials, video lectures, and notes provided are for personal use only.</li>
            <li>Unauthorized sharing, reproduction, or distribution is strictly prohibited.</li>
          </ul>
        </section>

        {/* Code of Conduct Section */}
        <section className="p-8">
          <h3 className="text-2xl font-semibold mb-4">
            <FaShieldAlt className="inline-block mr-2" />
            Code of Conduct
          </h3>
          <p className="text-gray-700">
            Students are expected to maintain discipline during both online and offline classes. Misuse of class platforms or inappropriate behavior may result in removal from the course.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="p-8 bg-gray-50">
          <h3 className="text-2xl font-semibold mb-4">
            <FaQuestionCircle className="inline-block mr-2" />
            Frequently Asked Questions (FAQ)
          </h3>
          <ul className="list-disc pl-8 text-gray-700">
            <li><strong>What courses do you offer?</strong> We offer classes for Grades 8 to 12 in Mathematics, Physics, Chemistry, English, and Social Science.</li>
            <li><strong>Do you provide online classes?</strong> Yes, we offer both online and offline classes. Online classes are conducted via secure platforms.</li>
            <li><strong>What is the fee structure?</strong> Fee details vary by course and are provided during the admission process.</li>
            <li><strong>How can I enroll?</strong> You can register online through our website or visit our institute at Babu Para Hospital Road, Godda.</li>
            <li><strong>What competitive exams do you prepare for?</strong> We prepare students for general competitive exams, focusing on English and reasoning.</li>
            <li><strong>Do you offer demo classes?</strong> Yes, demo classes are available. Contact us for details.</li>
          </ul>
        </section>

        {/* Privacy Policy Section */}
        <section className="p-8 bg-gray-50">
          <h3 className="text-2xl font-semibold mb-4">
            <FaShieldAlt className="inline-block mr-2" />
            Privacy Policy
          </h3>
          <ul className="list-disc pl-8 text-gray-700">
            <li><strong>Collection of Information:</strong> We collect personal information such as name, contact details, and educational qualifications for registration and academic purposes.</li>
            <li><strong>Use of Information:</strong> The collected data is used for enrollment, communication, and performance tracking.</li>
            <li><strong>Data Security:</strong> We use secure servers and encryption to protect your information. Personal data will not be shared with third parties without prior consent.</li>
            <li><strong>Marketing Communication:</strong> By enrolling, you agree to receive updates, promotional offers, and academic notifications via email or SMS.</li>
            <li><strong>Cookies and Tracking:</strong> Our website uses cookies to improve user experience. You can disable cookies in your browser settings.</li>
            <li><strong>Third-Party Services:</strong> We may integrate third-party tools for online classes, payments, or feedback collection.</li>
            <li><strong>Updates to the Privacy Policy:</strong> We may update the policy periodically. Changes will be communicated via email or posted on our website.</li>
          </ul>
        </section>

        {/* Contact Section */}
        <section className="p-8 bg-gray-50">
          <h3 className="text-2xl font-semibold mb-4">
            <FaQuestionCircle className="inline-block mr-2" />
            Contact Us
          </h3>
          <p className="text-gray-700">
            For any privacy-related queries, contact us at our office on Babu Para Hospital Road, Godda, or via email provided on our website.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
