"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

const Dashboard: FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-8xl">
        {/* Sentiment Analysis Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Sentiment Analysis</h2>
          <p className="text-gray-600 mb-4">
            Analyze the tone of a message and classify it as Positive, Negative, or Neutral.
          </p>
          <button
            className="px-4 py-2 bg-bluedark text-white font-bold rounded-lg hover:bg-blue-600 transition"
            onClick={() => router.push("/sentiment-analysis")}
          >
            Try Now
          </button>
        </div>

        {/* Communication Quality Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Communication Quality</h2>
          <p className="text-gray-600 mb-4">
            Rate the quality of a business response and get suggestions for improvement.
          </p>
          <button
            className="px-4 py-2 bg-bluedark text-white font-bold rounded-lg hover:bg-green-600 transition"
            onClick={() => router.push("/communication-quality")}
          >
            Try Now
          </button>
        </div>

        {/* Customer Journey Mapping Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Customer Journey Mapping</h2>
          <p className="text-gray-600 mb-4">
            Visualize and analyze customer interactions to enhance their experience.
          </p>
          <button
            className="px-4 py-2 bg-bluedark text-white font-bold rounded-lg hover:bg-purple-600 transition"
            onClick={() => router.push("/customer-journey")}
          >
            Try Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
