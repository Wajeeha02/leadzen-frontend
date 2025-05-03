"use client";

import axios from "axios";
import React, { useState } from "react";
import { db } from "../firebase"; // Firestore config
import { collection, addDoc } from "firebase/firestore";
import bgImage from "../assets/images/image.png";

const CustomerJourney = () => {
  const [businessType, setBusinessType] = useState("e-commerce");
  const [customerId, setCustomerId] = useState("");
  const [customerMessage, setCustomerMessage] = useState("");
  const [businessResponse, setBusinessResponse] = useState("");
  const [conversations, setConversations] = useState<{ customer_message: string; business_response: string }[]>([]);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAddConversation = () => {
    if (customerMessage && businessResponse) {
      setConversations([...conversations, { customer_message: customerMessage, business_response: businessResponse }]);
      setCustomerMessage("");
      setBusinessResponse("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnalysisResult(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/analyze-journey",
        {
          business_type: businessType,
          customer_id: customerId,
          conversations: conversations,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setAnalysisResult(response.data);
      setConversations([]);

      await addDoc(collection(db, "customerJourneys"), {
        business_type: businessType,
        customer_id: customerId,
        conversations: conversations,
        analysis_result: response.data,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error analyzing customer journey:", error);
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
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Customer Journey</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Customer ID:</label>
              <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-lightblue text-bluedark focus:outline-none focus:ring-2 focus:ring-lightblue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Customer Message:</label>
              <textarea
                value={customerMessage}
                onChange={(e) => setCustomerMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-lightblue text-bluedark focus:outline-none focus:ring-2 focus:ring-lightblue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Business Response:</label>
              <textarea
                value={businessResponse}
                onChange={(e) => setBusinessResponse(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-lightblue text-bluedark focus:outline-none focus:ring-2 focus:ring-lightblue"
                required
              />
            </div>

            {/* Business Type Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Business Type:</label>
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

            {/* Add Conversation Button */}
            <button
              type="button"
              onClick={handleAddConversation}
              className="w-full py-2 bg-lightblue text-bluedark rounded-lg hover:bg-white transition"
            >
              Add Conversation
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-white text-bluedark rounded-lg hover:bg-lightblue transition"
            >
              {loading ? "Analyzing..." : "Analyze Customer Journey"}
            </button>
          </form>

          {/* Display Added Conversations */}
          <div className="mt-6">
            <h3 className="text-white">Added Conversations:</h3>
            <ul className="text-white">
              {conversations.map((conv, index) => (
                <li key={index} className="my-2">
                  <strong>Interaction {index + 1}:</strong><br />
                  <em>Customer:</em> {conv.customer_message}<br />
                  <em>Business:</em> {conv.business_response}
                </li>
              ))}
            </ul>
          </div>
        </div>

       {/* Right Side - Result */}
{analysisResult && (
  <div className="md:w-1/2 w-full bg-white p-6 rounded-lg shadow-md text-bluedark border border-gray-300">
    <h3 className="text-xl font-bold mb-4">Analysis Result</h3>
    <p><strong>Business Type:</strong> {analysisResult.business_type || businessType}</p>
    <p><strong>Total Interactions:</strong> {analysisResult.total_interactions || conversations.length}</p>
    
    <div className="mt-4">
      <p><strong>Journey Summary:</strong></p>
      <p>{analysisResult.summary}</p>

    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default CustomerJourney;
