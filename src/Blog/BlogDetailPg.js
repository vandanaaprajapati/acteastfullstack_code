
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "./Firebaseconfig.js";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { Helmet } from 'react-helmet-async';
import {  FacebookShareButton,  TwitterShareButton,  LinkedinShareButton,  WhatsappShareButton, } from "react-share";
import {  FaFacebook,  FaLinkedin,  FaWhatsapp,  FaTimes,  FaShareAlt,} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const BlogDetailPg = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [shareOpen, setShareOpen] = useState(false);

  // Fetch blog detail and previous/next posts

  useEffect(() => {
    const fetchPosts = async () => {

      try {
        const q = query(
          collection(db, "posts"),
          where("categoryId", "==", "Act-East")
        );

        const querySnapshot = await getDocs(q);
        const postsList = querySnapshot.docs.map((doc) => {
          const d = doc.data();

          return {

            id: doc.id,
            slugField: d.slug || null,
            title: d.title || "",
            authorName: d.authorName || "",
            imageURL: d.imageURL || "",
            content: d.content || "",
            metaDescription: d.metaDescription || "",
            timestamp: d.timestamp || null,
            categoryId: d.categoryId || "",
          };
        });

        let currentIndex = postsList.findIndex(p => p.slugField === slug);
        if (currentIndex === -1) {
          currentIndex = postsList.findIndex(p => p.id === slug);
        }

        if (currentIndex !== -1) {
          setPost(postsList[currentIndex]);
          setPrevPost(postsList[currentIndex - 1] || null);
          setNextPost(postsList[currentIndex + 1] || null);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [slug]);

  // Fetch recent blogs
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          where("categoryId", "==", "Act-East"),
          orderBy("timestamp", "desc"),
          limit(5)
        );
        const snapshot = await getDocs(q);
        const recent = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((p) => p.slug !== slug && p.slugField !== slug); // Exclude current blog
        setRecentPosts(recent);
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };

    fetchRecentPosts();
  }, [slug]);

  const cleanHTMLContent = (html) => {
    return html
      ? html.replace(/<br\s*\/?>/g, "").replace(/<p>\s*<\/p>/g, "").trim()
      : "";
  };

  if (loading) {
    return <h3 className="text-center text-lg">Loading...</h3>;
  }

  if (!post) {
    return (
      <h3 className="text-center text-red-600 text-lg">Blog not found</h3>
    );
  }

  const shareMessage = `Read this amazing article: ${post.title}. Click to read the full post!`;

  return (
    <>
      <Helmet>
        <title>{post.title || "Blog Detail"}</title>
        <meta name="description" content={post.metaDescription || ""} />
        <meta property="og:title" content={post.title || ""} />
        <meta property="og:description" content={post.metaDescription || ""} />
        <meta
          property="og:image"
          content={post.imageURL || "https://via.placeholder.com/150"}
        />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="py-28">
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Sidebar - Recent Blogs */}
         <aside className="w-full md:w-1/4  px-4 border-r ">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Recent Blogs</h2>
          <ul className="space-y-6">
            {recentPosts.map((blog) => (
              <li key={blog.id} className="flex items-start gap-4 border-b pb-3">
                {blog.imageURL && (
                  <img
                    src={blog.imageURL}
                    alt={blog.title}
                    loading="lazy"
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <Link
                    to={`/post/${blog.slug || blog.id}`}
                    className="block hover:text-[#4D0303] "
                  >
                    <h3 className="font-semibold text-base">{blog.title}</h3>
                  </Link>
                  <p className="text-md text-gray-500">
                    {blog.timestamp
                      ? new Date(blog.timestamp.seconds * 1000).toLocaleDateString("en-GB")
                      : "No date"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </aside>

            {/* Main Blog Content */}
            <main className="w-full md:w-3/4">
              <nav className="text-sm mb-2">
                <ol className="flex flex-wrap gap-2 text-blue-600">
                  <li>
                    <Link to="/" className="text-xl text-black font-bold hover:text-green-800 hover:underline">Home</Link>
                  </li>
                  <li className="text-xl text-black font-bold">/</li>
                  <li>
                    <Link to="/blog" className="text-xl text-black font-bold hover:text-green-800 hover:underline">Blog</Link>
                  </li>
                </ol>
              </nav>

              <h1 className="text-3xl font-bold mt-4 mb-6 text-[#4D0303] ">{post.title}</h1>

              {post.imageURL && (
                <img
                  src={post.imageURL}
                  alt={post.title} loading="lazy"
                  className="w-full mb-6 rounded shadow" 
                />
              )}

              <p className="text-sm text-gray-700 mb-6 border-b pb-4">
                Author: <strong>{post.authorName || "Unknown"}</strong> | Published Date:{" "}
                <strong>
                  {post.timestamp
                    ? new Date(post.timestamp.seconds * 1000).toLocaleDateString("en-GB")
                    : "Unknown"}
                </strong>
              </p>

             <div className="prose prose-blue max-w-none text-justify relative px-4">
              <div
                className="content-hyperlink [&_p]:mb-2 [&_a]:text-blue-600 [&_a]:font-semibold hover:[&_a]:text-blue-800 hover:[&_a]:bg-blue-100 [&_img]:float-right [&_img]:max-w-md [&_img]:ml-6"
                dangerouslySetInnerHTML={{
                  __html: cleanHTMLContent(post.content),
                }}
              />
            </div>

              {/* Bottom Section - Pagination + Share */}
              <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4">
                <div className="flex gap-2">
                  {prevPost && (
                    <Link to={`/post/${prevPost.slugField || prevPost.id}`} title={prevPost.title}>
                      <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                        ← Prev
                      </button>
                    </Link>
                  )}
                  {nextPost && (
                    <Link to={`/post/${nextPost.slugField || nextPost.id}`} title={nextPost.title}>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        Next →
                      </button>
                    </Link>
                  )}
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-3">
                  <div className={`flex gap-2 transition-all duration-500 ${shareOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"} ease-in-out`}>
                    <FacebookShareButton url={window.location.href} quote={shareMessage}>
                      <FaFacebook className="text-white bg-[#3b5998] p-2 w-10 h-10 rounded-full" />
                    </FacebookShareButton>
                    <TwitterShareButton url={window.location.href} title={shareMessage}>
                      <FaXTwitter className="text-white bg-[#1da1f2] p-2 w-10 h-10 rounded-full" />
                    </TwitterShareButton>
                    <LinkedinShareButton url={window.location.href} title={shareMessage} summary={post.metaDescription}>
                      <FaLinkedin className="text-white bg-[#0077b5] p-2 w-10 h-10 rounded-full" />
                    </LinkedinShareButton>
                    <WhatsappShareButton url={window.location.href} title={shareMessage}>
                      <FaWhatsapp className="text-white bg-[#25d366] p-2 w-10 h-10 rounded-full" />
                    </WhatsappShareButton>
                  </div>

                  <button
                    onClick={() => setShareOpen(!shareOpen)}
                    title={shareOpen ? "Close Share Options" : "Share This Post"}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg transition-colors ${shareOpen ? "bg-red-600" : "bg-blue-600"}`}
                  >
                    {shareOpen ? <FaTimes /> : <FaShareAlt />}
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPg;
