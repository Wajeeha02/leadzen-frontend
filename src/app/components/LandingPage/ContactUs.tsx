"use client";

import { FC, useState } from "react";
import bgImage from "../../assets/images/image.png";

const ContactUs: FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResponseMessage(data.message);

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" }); // Reset form on success
      }
    } catch (error) {
      setResponseMessage("Failed to send message.");
    }
  };

  const bgImageUrl = `url(${bgImage.src})`;

  return (
    <div className="relative max-w-full h-screen bg-cover bg-no-repeat bg-bluedark" style={{ backgroundImage: bgImageUrl }}>
      <div className="flex items-center justify-center h-full text-white">
        <div className="bg-opacity-75 bg-bluedark p-10 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
          {responseMessage && <p className="text-center text-lightblue">{responseMessage}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-black"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-black"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-black h-32 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-lightblue text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
