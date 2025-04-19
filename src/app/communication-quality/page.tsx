"use client";

import axios from "axios";
import React, { useState } from "react";
import bgImage from "../assets/images/image.png";

const CommunicationQuality = () => {
  const [businessType, setBusinessType] = useState("e-commerce");
  const [customerId, setCustomerId] = useState("");
  const [customerMessage, setCustomerMessage] = useState("");
  const [businessResponse, setBusinessResponse] = useState("");
  const [qualityResult, setQualityResult] = useState<string | null>(null);  // Updated type to handle string feedback
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setQualityResult(null);  // Reset previous result

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/evaluate-communication",  // API endpoint
        {
          business_type: businessType,  // Send business type
          customer_id: customerId,  // Send customer ID
          customer_message: customerMessage,  // Send customer message
          business_response: businessResponse,  // Send business response
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Set the feedback evaluation response
      setQualityResult(response.data.evaluation);  // Assuming response contains evaluation feedback
    } catch (error) {
      console.error("Error analyzing communication quality:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative max-w-full h-screen bg-cover bg-no-repeat bg-bluedark flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <div className="flex w-3/4 gap-10">
        {/* Left Side - Form */}
        <div className="bg-opacity-75 bg-bluedark p-10 rounded-lg shadow-lg w-1/2">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Communication Quality Analysis
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-md font-medium mb-2 text-white">
                Customer ID:
              </label>
              <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-lightblue text-bluedark focus:outline-none focus:ring-2 focus:ring-lightblue"
                required
              />
            </div>

            <div>
              <label className="block text-md font-medium mb-2 text-white">
                Customer Message:
              </label>
              <textarea
                value={customerMessage}
                onChange={(e) => setCustomerMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-lightblue text-bluedark focus:outline-none focus:ring-2 focus:ring-lightblue"
                required
              />
            </div>
            <div>
              <label className="block text-md font-medium mb-2 text-white">
                Business Response:
              </label>
              <textarea
                value={businessResponse}
                onChange={(e) => setBusinessResponse(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-lightblue text-bluedark focus:outline-none focus:ring-2 focus:ring-lightblue"
                required
              />
            </div>
            <div>
              <label className="block text-md font-medium mb-2 text-white">
                Business Type:
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-lightblue text-bluedark focus:outline-none focus:ring-2 focus:ring-lightblue"
              >
                <option value="e-commerce">E-Commerce</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="tech support">Tech Support</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-bluedark text-white rounded-lg hover:bg-white hover:text-bluedark transition"
            >
              {loading ? "Analyzing..." : "Analyze Quality"}
            </button>
          </form>
        </div>

        {/* Right Side - Analysis Result */}
        {qualityResult && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 text-bluedark">
            <h3 className="text-xl font-bold mb-4">Analysis Result</h3>
            <p className="text-bluedark">
              <strong>Response Evaluation:</strong> {qualityResult}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationQuality;
