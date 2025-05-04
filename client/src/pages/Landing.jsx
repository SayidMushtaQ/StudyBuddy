import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

export default function StudyBuddyLanding() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-start p-6">
      {/* Header */}
      <header className="w-full max-w-6xl mx-auto mt-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-900">StudyBuddy</h1>
        <nav className="space-x-4">
          <button
            className="text-blue-700 hover:text-blue-900 cursor-pointer"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button
            className="text-blue-700 hover:text-blue-900 cursor-pointer"
            onClick={() => setShowSignup(true)}
          >
            Signup
          </button>
        </nav>
        {showSignup && <Signup onClose={() => setShowSignup(false)} />}
        {showLogin && <Login onClose={() => setShowLogin(false)} />}
      </header>

      {/* Hero Section */}
      <section className="mt-20 text-center max-w-4xl">
        <h2 className="text-5xl font-bold text-blue-800 leading-tight">
          Empower Learning Together
        </h2>
        <p className="mt-6 text-xl text-blue-700">
          StudyBuddy connects students and teachers in one place to share notes,
          join communities, and grow collaboratively.
        </p>
        <button
          className="mt-10 bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-xl shadow-md cursor-pointer"
          onClick={() => setShowSignup(true)}
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl w-full">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">
            For Teachers
          </h3>
          <p className="text-blue-700">
            Share notes and materials with ease. Create a focused space for your
            students to learn and grow.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">
            For Students
          </h3>
          <p className="text-blue-700">
            Access notes anytime, stay organized, and ask questions directly in
            the community spaces.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">
            Join Communities
          </h3>
          <p className="text-blue-700">
            Connect with peers, collaborate on topics, and never study alone
            again.
          </p>
        </div>
      </section>
      {/* Footer */}
      <footer className="mt-40 text-sm text-blue-700">
        © {new Date().getFullYear()} StudyBuddy. All rights reserved.
      </footer>
    </div>
  );
}
