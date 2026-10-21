export const GenerateSchema = (type, data = {}) => {
  const commonProvider = {
    "@type": "LocalBusiness",
    "name": "ActEast",
    "url": "https://acteast.co.in/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://acteast.co.in/static/media/ActEast-Logo.0278991677c1e8e8fc7e.webp",
      "width": 250,
      "height": 60
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61579275965804",
      "https://x.com/ActEast_vision",
      "https://www.instagram.com/act.east/",
      "https://www.youtube.com/@ActEast",
      "https://www.linkedin.com/company/acteast/"
    ]
  };

  const commonContact = {
    "@type": "ContactPoint",
    "telephone": "+91 - 8097283444",
    "contactType": "customer support",
    "email": "mail@acteast.co.in",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  };

  const commonAddress = {
    "@type": "PostalAddress",
    "streetAddress": "Unit No 22, Building No. 2(A3), Sector 1, Millennium Business Park, Mahape",
    "addressLocality": "Navi Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400710",
    "addressCountry": "IN"
  };

  switch (type) {
    case "HomePage":
      return {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            ...commonProvider, 
            "description": "From Meghalaya’s orchards to Mizoram’s spices Act East brings North East India’s freshest produce, rare ingredients, and vibrant cultural flavors.",
            "email": "mail@acteast.co.in",
            "contactPoint": [commonContact],
            "address": commonAddress
          },
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": {
                  "@type": "WebPage",
                  "name": "Home",
                  "url": "https://acteast.co.in/"
                }
              }
            ]
          }
        ]
      };
    
   case "AboutPage":
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://acteast.co.in/about",
        "name": "About ActEast",
        "url": "https://acteast.co.in/about",
        "description": "From Meghalaya’s orchards to Mizoram’s spices Act East brings North East India’s freshest produce, rare ingredients, and vibrant cultural flavors."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://acteast.co.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About",
            "item": "https://acteast.co.in/about"
          }
        ]
      }
    ]
  };


   
    case "ProductPage":
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://acteast.co.in/product",
        "name": "Act East Products | Fresh Harvest from North East India",
        "url": "https://acteast.co.in/product",
        "description": "Explore Act East’s authentic products—fruits, vegetables & spices from North East India’s orchards and farms—delivered fresh to your home or kitchen."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://acteast.co.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Product",
            "item": "https://acteast.co.in/product"
          }
        ]
      }
    ]
  };

case "ContactPage":
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://acteast.co.in/contact",
        "name": "Contact Act East | Share Your North East Harvest Story",
        "url": "https://contact.co.in/contact",
        "description": "Reach out to Act East—connect with farmers, share feedback, or inquire about fresh products & cultural stories from North East India’s farms and markets.",
        "about": {
          ...commonProvider,
          "contactPoint": commonContact,
          "address": commonAddress
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://acteast.co.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contact",
            "item": "https://acteast.co.in/contact"
          }
        ]
      }
    ]
  };


        case "BlogPage":
          const isDetailPage = data && data.slug; 
      
          return {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": isDetailPage ? "Article" : "CollectionPage",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": isDetailPage 
                    ? `https://acteast.co.in/post/${data.slug} `
                    : "https://acteast.co.in/blog"
                },
                "name": isDetailPage ? data.title : "Act East Blog | Stories of Culture & North East Harvests",
                "url": isDetailPage 
                  ? `https://acteast.co.in/post/${data.slug} `
                  : "https://acteast.co.in/blog",
                "description": isDetailPage 
                  ? data.metaDescription || "Join the Acteast." 
                  : " Dive into Act East’s blog—rich stories of culture, farming, and fresh produce from North East India’s fields, from Meghalaya to Mizoram.",
                ...(isDetailPage && data.imageURL ? { "image": data.imageURL } : {}), // Include only if available
                ...(isDetailPage && data.authorName ? { "author": { "@type": "Person", "name": data.authorName } } : {}), 
                ...(isDetailPage && data.datePublished ? { "datePublished": data.datePublished } : {}),
                ...(isDetailPage && data.dateModified ? { "dateModified": data.dateModified } : {}),
                "publisher": commonProvider
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://acteast.co.in/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blog",
                    "item": "https://acteast.co.in/blog"
                  },
                  ...(isDetailPage
                    ? [
                        {
                          "@type": "ListItem",
                          "position": 3,
                          "name": data.title,
                          "item":`https://acteast.co.in/post/${data.slug}`
                        }
                      ]
                    : [])
                ]
              }
            ]
          };
      

   case "ServicesPage":
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Services",
        "@id": data.url || "https://acteast.co.in/services",
        "name": data.name || "Act East Carbon Credit Services | Sustainable Impact",
        "url": data.url || "https://acteast.co.in/services",
        "description":
          data.description ||
          "Empower sustainable agriculture with Act East’s Carbon Credit Services turn farming into climate action through eco-conscious produce and partnerships"
      },
      {
        "@type": "Service",
        "@id": data.url || "https://acteast.co.in/services",
        "url": data.url || "https://acteast.co.in/services",
        "name": data.name || "actEast services",
        "serviceType": data.serviceType || "Acteast product services",
        "description":
          data.description ||
          "Empower sustainable agriculture with Act East’s Carbon Credit Services turn farming into climate action through eco-conscious produce and partnerships",
        "provider": {
          ...commonProvider,
          "contactPoint": commonContact
        },
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "serviceAudience": {
          "@type": "Audience",
          "name": "ActEast"
        },
        "image":
          "https://acteast.co.in/static/media/Acteast_Carbon-credit.0c11e745962fb5644de0.webp"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://acteast.co.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": data.name || "Services",
            "item": data.url || "https://acteast.co.in/services"
          }
        ]
      }
    ]
  };
  
     case "RecipeAndInspirationPage":
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://acteast.co.in/recipes",
        "name": "Authentic North-East Indian Recipes | Act East Kitchen",
        "url": "https://acteast.co.in/recipes",
        "description": "Explore Act East’s collection of vibrant and healthy North-East Indian recipes. Authentic flavors and easy-to-follow dishes from the region await!",
        "about": {
          ...commonProvider,
          "contactPoint": commonContact,
          "address": commonAddress
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://acteast.co.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Recipe And Inspiration",
            "item": "https://acteast.co.in/recipes"
          }
        ]
      }
    ]
  };

      
    
 case "galleryPage":
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Gallery",
        "@id": data.url || "https://acteast.co.in/gallery",
        "name": data.name || "Act East Carbon Credit Services | Sustainable Impact",
        "url": data.url || "https://acteast.co.in/gallery",
        "description":
          data.description ||
          "Empower sustainable agriculture with Act East’s Carbon Credit Services turn farming into climate action through eco-conscious produce and partnerships"
      },
      {
        "@type": "Service",
        "@id": data.url || "https://acteast.co.in/gallery",
        "url": data.url || "https://acteast.co.in/gallery",
        "name": data.name || "actEast gallery",
        "serviceType": data.serviceType || "Acteast gallery",
        "description":
          data.description ||
          "Empower sustainable agriculture with Act East’s Carbon Credit Services turn farming into climate action through eco-conscious produce and partnerships",
        "provider": {
          ...commonProvider,
          "contactPoint": commonContact
        },
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "serviceAudience": {
          "@type": "Audience",
          "name": "ActEast"
        },
        "image":
          "https://api.ecrop.co/assets/acteast/image/Guwahati1.webp"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://acteast.co.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": data.name || "gallery",
            "item": data.url || "https://acteast.co.in/gallery"
          }
        ]
      }
    ]
  };
    default:
  return null;
  }
};