import React from "react";
import { Link, useLocation } from "react-router-dom";
import Blogdata from "./Blogdata";
import './Popularpost.css'

const Popularpost = () => {
  const location = useLocation();
  const currentBlog = Blogdata.find((blog) => blog.detailPage === location.pathname);

  if (!currentBlog) return <p>Loading...</p>;

  const today = new Date();
  today.setHours(0, 0, 0, 0); 


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }

 
  const filteredBlogs = Blogdata.filter((blog) => {
    const blogDate = new Date(blog.date);
    const timeDiff = (today - blogDate) / (1000 * 60 * 60 * 24); 

    return (
      timeDiff >= 0 &&
      timeDiff <= 3 &&
      blog.detailPage !== location.pathname 
    );
  });

  return (
    <div className="popular-blogs">
      <h1 className="py-2 fw-bold fs-3">Popular Posts</h1>
      <ul>
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <li key={blog.detailPage} className="popular-blog-item my-3">
              <Link to={blog.detailPage} className="popular-blog-link">
                <img src={blog.image} alt={blog.title} loading="lazy" className="popular-blog-img" />
                <span className="popular-blog-title text-dark">{blog.title}</span>
                <span className="blog-date">{formatDate(blog.date)}</span> 
              </Link>
            </li>
          ))
        ) : (
          <p>No recent blogs found.</p>
        )}
      </ul>
    </div>
  );
};

export default Popularpost;
