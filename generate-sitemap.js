import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import axios from "axios";

async function generateSitemap() {
  const BASE_URL = "https://iwoland.com";
  const API_URL = "https://iwo-land-backend.onrender.com/api/news"; // 👈 your backend endpoint

  try {
    const sitemap = new SitemapStream({ hostname: BASE_URL });

    // 🧩 Static routes
    const staticLinks = [
      { url: "/", changefreq: "daily", priority: 1.0 },
      { url: "/blogs", changefreq: "monthly", priority: 0.9 },
      { url: "/gallery", changefreq: "monthly", priority: 0.8 },
    //   { url: "/about", changefreq: "monthly", priority: 0.7 },
    //   { url: "/contact", changefreq: "monthly", priority: 0.7 },
    ];

    staticLinks.forEach((link) => sitemap.write(link));

    // 📰 Fetch dynamic blog pages
    const { data } = await axios.get(API_URL);
    const news = data || [];

    news.news.forEach((item) => {
      sitemap.write({
        url: `/singleblog/${item?._id}`, // 👈 adjust if your route uses a slug
        changefreq: "weekly",
        priority: 0.8,
        lastmodISO: new Date(item?.date || Date.now()).toISOString(),
      });
    });

    // ✅ Finish and save
    sitemap.end();
    const dataBuffer = await streamToPromise(sitemap);
    createWriteStream("./public/sitemap.xml").write(dataBuffer);

    console.log("✅ Sitemap successfully generated at public/sitemap.xml");
  } catch (err) {
    console.error("❌ Failed to generate sitemap:", err.message);
  }
}

generateSitemap();
