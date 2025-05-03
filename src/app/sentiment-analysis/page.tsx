"use client";

import axios from "axios";
import React, { useState } from "react";
import bgImage from "../assets/images/image.png";
import { db, collection, addDoc } from "../firebase";  // Import Firebase functions

const SentimentAnalysis = () => {
  const [customerMessage, setCustomerMessage] = useState("");
  const [businessType, setBusinessType] = useState("e-commerce");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnalysisResult(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/analyze-sentiment",
        {
          message: customerMessage,
          business_type: businessType,
        }
      );

      // Store analysis result in Firebase Firestore
      const analysisData = {
        message: customerMessage,
        business_type: businessType,
        sentiment: response.data.sentiment,
        suggested_response: response.data.suggested_response,
        timestamp: new Date(),
      };

      // Add data to Firestore collection "sentiment_analysis"
      await addDoc(collection(db, "sentiment_analysis"), analysisData);

      setAnalysisResult(response.data);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
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
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Sentiment Analysis</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
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

            <button
              type="submit"
              className="w-full py-2 bg-white text-bluedark rounded-lg hover:bg-lightblue transition"
            >
              {loading ? "Analyzing..." : "Analyze Sentiment"}
            </button>
          </form>
        </div>

        {/* Right Side - Result */}
        {analysisResult && (
          <div className="md:w-1/2 w-full bg-white p-6 rounded-lg shadow-md text-bluedark border border-gray-300">
            <h3 className="text-xl font-bold mb-4">Analysis Result</h3>
            <p><strong>Customer Sentiment:</strong> {analysisResult.sentiment}</p>
            <p><strong>Suggested Response:</strong> {analysisResult.suggested_response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentAnalysis;
