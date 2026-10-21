
import React, { useState, useEffect } from 'react';
import { db } from './Firebaseconfig';
import { collection, getDocs } from "firebase/firestore"; 

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));  
      const postsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsList);
    };
    fetchPosts();
  }, []);  
  
  console.log('post', posts)
  return (
    <div>
      <h1>Posts</h1>
     
        {posts.map((data, index) => (
              <div key={index} className="text-center p-2">
                <h6>{data.title}</h6>
                <img src={data.imageURL} alt="img" loading="lazy" className="weather_logo_ana_d" />
                <p>{data.content}&deg;</p>
              </div>
            ))}
   
    </div>
  );
};

export default Posts;
