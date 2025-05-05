import React from "react";

export default function Home() {
  return (
    <main className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Message */}
        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          Welcome Back, Student!
        </h1>
        <p className="text-lg text-blue-700 mb-6">
          Here's your personalized dashboard to access notes, communities, and
          other resources to enhance your learning journey.
        </p>

        {/* Dashboard Content - Notes and Communities */}
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
          {/* Notes Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Study Notes
            </h2>
            <p className="text-blue-700 mb-4">
              Access and review notes shared by teachers in your courses. Stay
              up-to-date with the latest content.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700">
              View Notes
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Your Profile
            </h2>
            <p className="text-blue-700 mb-4">
              Manage your profile, update personal information, and track your
              learning progress.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Upcoming Events or Notifications */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Upcoming Events
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              Webinar: How to Excel in Online Exams
            </h3>
            <p className="text-blue-700 mb-4">
              Join us for an informative session on strategies for success in
              online exams. Register now to reserve your spot.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700">
              Register Now
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
