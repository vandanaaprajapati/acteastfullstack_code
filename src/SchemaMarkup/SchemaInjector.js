import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Blog/Firebaseconfig.js"; 
import useSchemaMarkup from "./useSchemaMarkup.js";


function stripHtmlTags(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

const servicesData = {
  "carboncredit": {
    aboutType: "Act East Carbon Credit Services | Sustainable Impact",
    description:
      "Empower sustainable agriculture with Act East’s Carbon Credit Services turn farming into climate action through eco-conscious produce and partnerships.",
    image:
      "https://api.ecrop.co/assets/acteast/image/carbon-credit.webp",
    url: "https://acteast.co.in/services/carbon-credit",
  },
  "esg": {
    aboutType: "Act East ESG Services | Empower Farmers & Planet",
    description:
      "Elevate sustainability with Act East’s ESG Credit Services—support North East farmers while driving environmental impact and ethical produce delivery",
    image:
      "https://api.ecrop.co/assets/acteast/image/ESG.webp",
    url: "https://acteast.co.in/services/esg-credit",
  },
};

const galleryData = {
  "ourgallery": {
    aboutType: "Act East Gallery | Organic Agriculture in North East India",
    description:
      "Discover Act East’s organic agriculture initiatives in North East India through our gallery. Experience how sustainable farming meets modern technology.",
    image:
      "https://api.ecrop.co/assets/acteast/image/Guwahati4.webp",
    url: "https://acteast.co.in/gallery/our-gallery",
  },
  "latestnews": {
    aboutType: "Act East Latest News | Empower Farmers & Planet",
    description:
      "Elevate sustainability with Act East’s ESG Credit Services—support North East farmers while driving environmental impact and ethical produce delivery",
    image:
      "https://api.ecrop.co/assets/acteast/image/knows-that-all.webp",
    url: "https://acteast.co.in/gallery/latest-news",
  },
    "giftingsolution": {
    aboutType: "Act East Gifting Solution| Empower Farmers & Planet",
    description:
      "Elevate sustainability with Act East’s ESG Credit Services—support North East farmers while driving environmental impact and ethical produce delivery",
    image:
      "https://api.ecrop.co/assets/acteast/gifting-solution/Neramac-back-page.webp",
    url: "https://acteast.co.in/gallery/gifting-solution",
  },
 };

const SchemaInjector = () => {
  const location = useLocation();
  const [schemaType, setSchemaType] = useState(null);
  const [schemaData, setSchemaData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSchemaData = async () => {
      let type = null;
      let data = {};
      const path = location.pathname;
      const slug = path.replace("/", "");

   if (path === "/") {
          type = "HomePage";
        } else if (path === "/about") {
          type = "AboutPage";
        } else if (path === "/product") {
          type = "ProductPage";
        } else if (path === "/contact") {
          type = "ContactPage";
        } else if (path === "/recipes") {
          type = "RecipeAndInspirationPage";
        }  else if (path === "/blog") {
          type = "BlogPage";
           data = {
            name: "Act East Blog | Stories of Culture & North East Harvests",
            description:
              "Dive into Act East’s blog rich stories of culture, farming, and fresh produce from North East India’s fields, from Meghalaya to Mizoram.",
            url: "https://acteast.co.in/blog",
          };
        } else if (path.startsWith("/post/")) {
          const blogSlug = path.replace("/post/", "");
          type = "BlogPage";

        try {
          const docRef = doc(db, "posts", blogSlug);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists() && isMounted) {
            const docData = docSnap.data();
            data = {
              title: docData.title || "Untitled Blog",
              slug: blogSlug,
              metaDescription: docData.metaDescription || "",
              content: stripHtmlTags(docData.content),
              imageURL: docData.imageURL || "",
              authorName: docData.authorName || "Unknown",
              url: `https://acteast.co.in/post/${blogSlug}`,
            };
          } else {
            console.warn(`⚠️ No blog data found for slug: ${blogSlug}`);
            return;
          }
        } catch (error) {
          console.error("❌ Error fetching blog:", error);
          return;
        }
      } else if (servicesData[slug]) {
        type = "ServicesPage";
        data = servicesData[slug];
      } else if (galleryData[slug]) {
        type = "GalleryPage";
        data = galleryData[slug];
      } else {
        console.warn(`⚠️ No schema match for path: ${path}`);
        return;
      }

      if (isMounted) {
        setSchemaType(type);
        setSchemaData(data);
      }
    };

    fetchSchemaData();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  useSchemaMarkup(schemaType, schemaData);

  return null;
};

export default SchemaInjector;
