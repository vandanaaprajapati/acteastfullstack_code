


import React, { useState, useEffect } from "react";
import { db } from "./Firebaseconfig.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import Blogcard from "./Blogcard.js";
import { Helmet } from "react-helmet-async";
import NewsletterCard from "../Newsletter/NewsletterCard.js"; // Import NewsletterCard
import newsletters from "../Newsletter/NewsletterData.js"; // Newsletter Data

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const blogsPerPage = 3; // Show 6 blogs per page
  const newslettersPerPage = 3; // Show 3 newsletters per page
  const [currentNewsletterPage, setCurrentNewsletterPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          where("categoryId", "==", "Act-East")
        );
        const querySnapshot = await getDocs(q);
        const postsList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled",
            authorName: data.authorName || "Unknown Author",
            imageURL: data.imageURL || "https://via.placeholder.com/150",
            content: data.content || "No content available",
            date: data.timestamp
              ? new Date(data.timestamp.seconds * 1000)
              : new Date(),
          };
        });

        const sortedPosts = postsList.sort((a, b) => b.date - a.date);
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const totalBlogs = posts.length;
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);
  const currentBlogs = posts.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const totalNewsletters = newsletters.length;
  const totalNewsletterPages = Math.ceil(totalNewsletters / newslettersPerPage);
  const currentNewsletters = newsletters.slice(
    (currentNewsletterPage - 1) * newslettersPerPage,
    currentNewsletterPage * newslettersPerPage
  );

  const handleBlogPageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const handleNewsletterPageChange = (page) => {
    if (page >= 1 && page <= totalNewsletterPages) {
      setCurrentNewsletterPage(page);
      window.scrollTo(0, 0);
    }
  };

  const generatePagination = (total, currentPage, handlePageChange) => {
    const pageNumbers = [];
    const maxPagesToShow = 4;

    if (total <= maxPagesToShow) {
      for (let i = 1; i <= total; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pageNumbers.push(1, 2, 3, "...", total);
      } else if (currentPage >= total - 1) {
        pageNumbers.push(1, "...", total - 2, total - 1, total);
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          total
        );
      }
    }

    return (
      <div className="flex justify-center mt-10 space-x-2">
        <button
          className="px-4 py-2 bg-[#337d7d] text-white rounded disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {pageNumbers.map((page, index) => (
          <button
            key={index}
            className={`px-3 py-2 rounded border ${
              currentPage === page
                ? "bg-[#337d7d] text-white"
                : "bg-white text-[#337d7d] border-[#337d7d]"
            }`}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          className="px-4 py-2 bg-[#337d7d] text-white rounded disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === total}
        >
          Next
        </button>
      </div>
    );
  };

  const options = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const currentDate = new Date().toLocaleDateString("en-GB", options);

  return (
    <>
      <Helmet>
        <title>Act East Blog | North East India’s Agriculture and Marketing</title>
        <meta
          name="description"
          content="Explore the Act East Blog for stories on agriculture and marketing, culture, and local produce from North East India highlighting lives from Meghalaya to Mizoram."
        />
        <link rel="canonical" href="https://acteast.co.in/blog" />
      </Helmet>

      <div className="bg-white px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
            <div>
              <b>Date:</b> {currentDate}
            </div>
            <div>
              <b>Category:</b> Act East
            </div>
          </div>

          <h1 className="text-3xl font-bold text-[#337d7d] mb-4 text-left">
            Act East | Blogs
          </h1>
          <p className="italic mb-10 text-left font-bold">
            "Every spice, vegetable and fruit of Northeast India carries a
            story of the soil, the seasons, and the people who nurture them. At
            Act East, we celebrate these harvests while empowering farmers,
            preserving traditions, and connecting you to nature’s purest gifts
            with transparency and care."
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBlogs.length > 0 ? (
              currentBlogs.map((blog) => (
                <Blogcard
                  key={blog.id}
                  image={blog.imageURL}
                  title={blog.title}
                  date={blog.date}
                  author={blog.authorName}
                  detailPage={`/post/${blog.id}`}
                />
              ))
            ) : (
              <p className="text-center col-span-3">Loading...</p>
            )}
          </div>

          {/* Blog Pagination */}
          {totalPages > 1 && generatePagination(totalPages, currentPage, handleBlogPageChange)}

          {/* Newsletter Section */}
          <div className="mt-20 max-w-7xl text-center">
            <h3 className="text-4xl font-bold text-green-800 text-center mb-4">Our Newsletter</h3>
            <p className="italic font-semibold text-xl max-w-5xl mx-auto">The Flavours & Traditions of the Northeast, Join our newsletter for fresh stories, organic journeys, and cultural treasures from the heart of India’s Act East vision</p>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentNewsletters.map((item) => (
                <NewsletterCard
                  key={item.id}
                  newsletter={item}
                  isExpanded={expandedCardId === item.id}
                  onToggle={() =>
                    setExpandedCardId((prevId) => (prevId === item.id ? null : item.id))
                  }
                />
              ))}
            </div>

            {/* Newsletter Pagination */}
            {totalNewsletterPages > 1 && generatePagination(totalNewsletterPages, currentNewsletterPage, handleNewsletterPageChange)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
