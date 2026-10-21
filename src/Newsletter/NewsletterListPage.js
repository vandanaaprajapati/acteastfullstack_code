// import React, { useState } from "react";
// import NewsletterCard from "./NewsletterCard";
// import newsletters from "./NewsletterData";

// const NewsletterListPage = () => {
//   const [expandedCardId, setExpandedCardId] = useState(null); // ✅

//   return (
//     <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//       {newsletters.map((item) => (
//         <NewsletterCard
//           key={item.id}
//           newsletter={item}
//           isExpanded={expandedCardId === item.id}
//           onToggle={() =>
//             setExpandedCardId((prevId) => (prevId === item.id ? null : item.id))
//           }
//         />
//       ))}
//     </div>
//   );
// };

// export default NewsletterListPage;

