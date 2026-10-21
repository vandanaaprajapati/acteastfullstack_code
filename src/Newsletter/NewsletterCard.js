


import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";

import { Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { emaildb } from "../Blog/Firebaseconfig.js"; 


const NewsletterCard = ({ newsletter, isExpanded, onToggle }) => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [sentLink, setSentLink] = useState("");

  const addNewsletterEmail = async (email, newsletterLink) => {
    try {
      await addDoc(collection(emaildb, "newsletter"), {
        email: email,
        newsletterLink: newsletterLink,
        timestamp: new Date(),
      });
      console.log("Email added to the newsletter collection!");
    } catch (error) {
      console.error("Error adding email to the newsletter collection:", error);
    }
  };

  const handleSendLink = async (e) => {
    e.preventDefault();
    setSending(true);
    setMessage("");
    setSentLink("");

    if (!newsletter.link) {
      setMessage("Newsletter link is not available.");
      setSending(false);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      setSending(false);
      return;
    }

    try {
      await addDoc(collection(emaildb, "newsletterEmails"), {
        email: email,
        newsletterLink: newsletter.link,
        timestamp: new Date(),
      });

      await addNewsletterEmail(email, newsletter.link);

      setMessage("Newsletter link request recorded successfully!");
      setSentLink(newsletter.link);
      setEmail(""); 
    } catch (error) {
      console.error("Error during Firestore operation:", error);

      if (error.code === "permission-denied") {
        setMessage("You do not have permission to perform this action.");
      } else if (error.code === "unavailable") {
        setMessage("Firestore service is temporarily unavailable. Please try again later.");
      } else if (error.code === "invalid-argument") {
        setMessage("The provided email or data is invalid. Please check your input.");
      } else {
        setMessage(`Failed to store email. Error: ${error.message}`);
      }
    } finally {
      setSending(false);
    }
  };

  const getFormattedDate = (date) => {
    if (!date) return "No date";
    try {
      const jsDate =
        typeof date === "object" && date.seconds
          ? new Date(date.seconds * 1000)
          : new Date(date);

      return jsDate.toLocaleDateString("en-US", {
        month: "long", 
        year: "numeric" 
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="border rounded-2xl p-4 shadow-lg bg-white max-w-md mx-auto my-6">
      <img
        src={newsletter.image}
        alt={newsletter.title}
        className="w-full h-48 object-cover mb-2"
      />

      <div className="text-left text-md text-gray-900 mb-2">
        {getFormattedDate(newsletter.date)}
      </div>

      <h2 className="text-xl font-bold mb-2">{newsletter.title}</h2>

      <p className="text-gray-700 mb-4">
        {typeof newsletter.content === "string"
          ? newsletter.content.slice(0, 100) + "..."
          : "No content available."}
      </p>

      <div className="flex items-center space-x-4">
        <Link
          to={`/newsletter/${newsletter.id}`}
          className="text-blue-600 hover:underline"
        >
          Read More →
        </Link>

        <button
          type="button"
          onClick={onToggle}
          className="flex items-center space-x-2 border border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-100 transition"
        >
          <FiDownload className="h-5 w-5" />
          <span className="font-semibold">Download</span>
        </button>
      </div>

      {/* Expandable form */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <form onSubmit={handleSendLink} className="flex flex-col space-y-4 mt-4">
          <label className="flex items-center space-x-2">
            <span className="bg-yellow-500 text-white p-2 rounded">📧</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 border rounded p-2"
            />
          </label>

          <button
            type="submit"
            disabled={sending}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            {sending ? "Sending..." : "Send link"}
          </button>

          {message && <p className="text-green-800">{message}</p>}

          {sentLink && (
            <div className="mt-4 bg-gray-100 px-4 p-3 rounded text-center">
              <p className="font-semibold">
                Newsletter link:
                <a
                  href={sentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline ml-1"
                >
                  {sentLink}
                </a>
              </p>
              <br />
              
            <a href=" https://api.ecrop.co/assets/acteast/newsletter/Newsletter-for-September -2025.pdf" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300" >  Download PDF </a>

            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewsletterCard;
