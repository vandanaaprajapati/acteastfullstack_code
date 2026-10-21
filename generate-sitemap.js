import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import dotenv from "dotenv";
import { SitemapStream, streamToPromise } from "sitemap";
import fs from "fs";
import path from "path";

dotenv.config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch slugs from Firestore based on categoryId
const fetchSlugs = async (categoryId) => {
  try {
    console.log(`Fetching slugs from Firebase for category: ${categoryId}...`);

    // Fetch posts only for the given categoryId
    const postsQuery = query(collection(db, "posts"), where("categoryId", "==", "Act-East" ));
    const querySnapshot = await getDocs(postsQuery);

    const slugs = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.slug) {
        console.log("Found slug:", data.slug);
        slugs.push(data.slug);
      }
    });
    console.log("Slugs fetched from Firestore:", slugs);
    return slugs;
  } catch (error) {
    console.error("Error fetching slugs: ", error);
    return [];
  }
};

const generateSitemap = async () => {
  const categoryId = "acteast-co-in";  

  console.log("Starting sitemap generation...");
  const slugs = await fetchSlugs(categoryId);

  if (slugs.length === 0) {
    console.log("No posts found in Firestore for category:", categoryId);
    return;
  }

  console.log("Slugs fetched:", slugs);

  const sitemapStream = new SitemapStream({ hostname: "https://acteast.co.in" });

  // Define static routes - remove parameterized ones
  const staticRoutes = [
    "/",
    "/about",
    "/product",
    "/services/carbon-credit",
    "/services/esg-credit",
    "/blog",
    "/contact",
    "/recipes",
    "/gallery",
  ];

  staticRoutes.forEach((route) => {
    console.log(`Adding static route to sitemap: ${route}`);
    sitemapStream.write({ url: route, changefreq: "daily", priority: 0.8 });
  });

  // Add dynamic blog slugs to the sitemap
  slugs.forEach((slug) => {
    console.log(`Adding slug to sitemap: /post/${slug}`);
    sitemapStream.write({ url: `/post/${slug}`, changefreq: "daily", priority: 0.7 });
  });

  sitemapStream.end();

  const outputPath = path.join(process.cwd(), "public", "sitemap.xml");
  try {
    const sitemap = await streamToPromise(sitemapStream);
    fs.writeFileSync(outputPath, sitemap.toString(), "utf8");
    console.log("Sitemap generated successfully at:", outputPath);
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
};

export default generateSitemap;
