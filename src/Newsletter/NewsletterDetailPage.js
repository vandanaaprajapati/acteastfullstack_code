
import React from "react";
import { useParams, Link } from "react-router-dom";
import newsletters from "./NewsletterData.js";

const NewsletterDetailPage = () => {
  const { id } = useParams();
  const newsletter = newsletters.find((item) => item.id === parseInt(id));

  if (!newsletter) return <p>Newsletter not found.</p>;

  const parseContent = (content) => {
    const lines = content.split("\n").filter(line => line.trim() !== "");
    const seen = new Set();

    return lines.map((line, index) => {
      const trimmed = line.trim();

      // Avoid duplicate lines
      if (seen.has(trimmed)) return null;
      seen.add(trimmed);

      // ✨ Detect if it's the "The Act East" signature
      if (/^The Act East$/i.test(trimmed)) {
        return (
          <div key={index} className="mt-2 text-left">
            <p
              className="text-2xl font-bold text-[#4D0303] tracking-wide"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {trimmed}
            </p>
        
          </div>
        );
      }

      // Detect headings
      const isHeading =
        /^[A-Z][\w\s/?:,-]+$/.test(trimmed) && trimmed.length < 100;

      if (isHeading) {
        return (
          <h3 key={index} className="text-xl font-bold text-[#4D0303] mt-6 mb-2" >{trimmed}</h3>);
          
      }
    
      return (
        <p key={index} className="mb-4 leading-relaxed text-gray-800">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 relative">
        {/* Top Image */}
        <img
          src={newsletter.image}
          alt={newsletter.title}
          className="w-full h-[400px] object-cover"
        />

        {/* Floating Card */}
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-2xl mx-auto -mt-24 relative z-10">
          <p className="text-sm text-gray-500 uppercase font-semibold mb-2">
            Greatest Hits
          </p>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {newsletter.title}
          </h1>

          <p className="text-sm text-gray-600 mb-6">
            By Act East · September 2025
          </p>

          {/* Dynamic Content Rendering */}
          <div className="prose prose-lg max-w-none text-gray-800 text-justify">
            {parseContent(newsletter.content)}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 border-l-2 pl-10">
        <h2 className="text-2xl font-bold mb-6 text-[#4D0303]">
          Recent Newsletters
        </h2>

        <div className="space-y-8">
          {newsletters
            .filter((item) => item.id !== newsletter.id)
            .slice(0, 3)
            .map((item) => (
              <div key={item.id} className="border-b pb-4 flex items-start">
                {/* Left side: Image */}
                <div className="w-20 h-20 mr-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                {/* Right side: Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <Link
                    to={`/newsletter/${item.id}`}
                    className="text-green-700 font-medium hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewsletterDetailPage;
