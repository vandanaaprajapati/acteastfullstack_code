
import fs from "fs";
import path from "path";
import generateSitemap from "./generate-sitemap.js";


const domain = "https://acteast.co.in";

async function updateSitemapIndex() {
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  const sitemapIndexPath = path.join(process.cwd(), "public", "sitemap_index.xml");

  if (!fs.existsSync(sitemapPath)) {
    console.log("❌ sitemap.xml file not found. Sitemap index cannot be created.");
    return;
  }

  const sitemapStats = fs.statSync(sitemapPath);
  const lastModifiedDate = sitemapStats.mtime.toISOString();

  const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${domain}/sitemap.xml</loc>
    <lastmod>${lastModifiedDate}</lastmod>
  </sitemap>
</sitemapindex>`;

  fs.writeFileSync(sitemapIndexPath, sitemapIndexContent);
  console.log("🎉 Sitemap index updated successfully!");
}


async function runSitemapGeneration() {
  await generateSitemap(); 
  await updateSitemapIndex(); 
}

runSitemapGeneration();

