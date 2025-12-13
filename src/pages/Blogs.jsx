import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomMarquee from "../components/CustomMarquee";
import SideBar from "../components/SideBar";
import LatestNews from "../components/LatestNews";
import "./css/Blogs.css";
import EventBannerSlider from "../components/EventBannerSlider";
import { useNews } from "../hooks/useNews";
import { Helmet } from "react-helmet-async";
import MissedArticles from "../components/MissedArticles";

const Blogs = () => {
  const { news, loading, error } = useNews();

  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 8;

  const totalPages = Math.ceil(news.length / newsPerPage);
  const startIndex = (currentPage - 1) * newsPerPage;
  const currentNews = news.slice(startIndex, startIndex + newsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
        <Helmet>
            <title>Iwo Land Blog | History & Latest News</title>
            <meta name="robots" content="index, follow" />
            <meta name="description" content="Explore the deep history and culture of Iwo Land. Stay updated with the latest news and stories from Iwo Land, Osun State, Nigeria." />
            <link rel="canonical" href="https://iwoland.com/blogs" />
            <meta name="keywords" content="Iwo Land, Iwo news, Iwo Land news, Oluwo, Iwo, Iwo Osun State, Osun State, History of Iwo, Odidere, Raven, Yoruba Land, Osun Oshogo, Oshogo, Telu 1" />

            <meta property="og:title" content="Iwo Land Blog | Yoruba History & Culture" />
            <meta property="og:description" content="Discover stories, history, and cultural heritage of Iwo Land in Osun State, Nigeria." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://iwoland.com/blogs" />
            <meta property="og:image" content="https://iwoland.com/favicon.png" />
            <link rel="icon" type="image/png" href="/favicon.png" />
            <link rel="shortcut icon" href="/favicon.png" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Iwo Land Blog | Yoruba History & Culture" />
            <meta name="twitter:description" content="Stay informed about the traditions and people of Iwo Land." />
            <meta name="twitter:image" content="https://iwoland.com/favicon.png" />

            <script type="application/ld+json">
                {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Blog",
                "name": "Iwo Land Blog",
                "url": "https://iwoland.com/blogs",
                "description": "Cultural stories and news from Iwo Kingdom.",
                "publisher": {
                    "@type": "Organization",
                    "name": "Iwo Land",
                    "logo": {
                    "@type": "ImageObject",
                    "url": "https://iwoland.com/favicon.png"
                    }
                }
                })}
            </script>
        </Helmet>



      <div>
        {/* Top Section */}
        <div className="marquee-container">
          <div className="latest-news">Latest News</div>
          <div className="marquee-wrapper">
            <CustomMarquee />
          </div>
        </div>

        <div className="hero-section">
          <div className="carousel">
            <EventBannerSlider />
          </div>
          <div className="latest-section">
            <LatestNews />
          </div>
        </div>

        {/* Main Content */}
        <div className="home-content">
          <div className="first-side no-padding">
            <div>
                <h1 className="page-title">News</h1>
            </div>
            {/* Skeleton Loader */}
            {loading && (
              <div className="skeleton-news-list">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="skeleton-event-card">
                    <div className="skeleton-event-image" />
                    <div className="skeleton-event-content">
                      <div className="skeleton-line title" />
                      <div className="skeleton-line" />
                      <div className="skeleton-line short" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error / Empty States */}
            {error && <p className="error-text">Failed to load news.</p>}
            {!loading && !error && news.length === 0 && (
              <p className="no-news-text">No news available yet.</p>
            )}

            {/* News List */}
            {!loading &&
              currentNews.map((item) => {
                const truncatedHead =
                  item.title.length > 40
                    ? item.title.slice(0, 40) + "..."
                    : item.title;
                const truncatedSubHead =
                  item.description.length > 100
                    ? item.description.slice(0, 100) + "..."
                    : item.description;

                return (
                  <Link
                    aria-label={`Read more about ${item.title}`}
                    to={`/singleblog/${item?._id}`}
                    key={item?._id}
                    className="event-card-container"
                  >
                    <article className="event-card">
                      <div className="event-image-container">
                        <img
                            loading="lazy"
                            src={item.mainImage}
                            alt={truncatedHead}
                            className="event-image"
                        />
                      </div>
                      <div className="event-content">
                        <h2 className="event-title">{truncatedHead}</h2>
                        <div className="event-meta">
                          <span className="meta-item">
                            🗓{" "}
                            {new Date(item.date).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="event-description">{truncatedSubHead}</p>
                      </div>
                    </article>
                  </Link>
                );
              })}

            {/* Pagination */}
            {!loading && news.length > 0 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  ⬅ Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="page-btn"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next ➡
                </button>
              </div>
            )}
          </div>

          {/* S idebar */}
          <div className="second-side">
            <SideBar />
          </div>
        </div>
      </div>
      <div>
        <MissedArticles />
      </div>
    </>
  );
};

export default Blogs;
