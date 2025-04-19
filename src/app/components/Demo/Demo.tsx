"use client";

import { FC } from "react";

const Demo: FC = () => {
  const handleDemoRequest = () => {
   
    console.log("Demo requested");
  };

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 p-8 flex items-center justify-center">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-6">Experience LeadZen</h1>
        <p className="text-lg mb-4">
          Discover how LeadZen can transform your customer management and lead generation processes. Our platform offers advanced insights and tools to help you track, analyze, and optimize your customer interactions across multiple channels.
        </p>
        <p className="text-lg mb-4">
          Whether you're looking to improve communication quality, understand customer sentiments, or map out entire customer journeys, LeadZen provides the solutions you need to stay ahead in the competitive market.
        </p>
        <p className="text-lg mb-6">
          Get a hands-on experience of LeadZen and see how it can drive your business growth. Request a demo today and let us show you the power of smarter data-driven strategies.
        </p>
        <button
          onClick={handleDemoRequest}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Request a Demo
        </button>
      </div>
    </div>
  );
};

export default Demo;
