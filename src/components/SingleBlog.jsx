import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { Helmet } from "react-helmet-async";
import "./css/SingleBlog.css";
import { useNews } from "../hooks/useNews";

const SingleBlog = () => {
  const { singleNews, getNewsById, singleNewsLoading } = useNews();
  const { id } = useParams();

  useEffect(() => {
    getNewsById(id);
  }, [id]);

  if (singleNewsLoading) {
    // 🦴 Skeleton that mimics final layout exactly
    return (
      <div className="single-blog-container">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={500}
          animation="wave"
          sx={{ borderRadius: "14px", mb: 4 }}
        />

        <Skeleton
          variant="text"
          width="70%"
          height={60}
          animation="wave"
          sx={{ mb: 2 }}
        />
        <Skeleton
          variant="text"
          width="40%"
          height={30}
          animation="wave"
          sx={{ mb: 4 }}
        />

        <Skeleton
          variant="text"
          width="100%"
          height={25}
          animation="wave"
          sx={{ mb: 1 }}
        />
        <Skeleton
          variant="text"
          width="95%"
          height={25}
          animation="wave"
          sx={{ mb: 1 }}
        />
        <Skeleton
          variant="text"
          width="90%"
          height={25}
          animation="wave"
          sx={{ mb: 4 }}
        />

        <div className="sub-image-container">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={350}
              animation="wave"
              sx={{ borderRadius: "12px" }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!singleNews || Object.keys(singleNews).length === 0) return null;

  const { title, description, mainImage, author = "Iwo Land Editor", date } =
    singleNews;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: title,
      image: [mainImage],
      author: { "@type": "Person", name: author },
      publisher: {
        "@type": "Organization",
        name: "Iwo Land",
        logo: {
          "@type": "ImageObject",
          url: "https://iwoland.com/favicon.png",
        },
      },
      datePublished: date,
      dateModified: date,
      description,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://iwoland.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://iwoland.com/blogs",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: `https://iwoland.com/singleblog/${id}`,
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>{`${title} | Iwo Land`}</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://iwoland.com/singleblog/${id}`} />

        {/* Open Graph / Twitter */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={mainImage} />
        <meta
          property="og:url"
          content={`https://iwoland.com/singleblog/${id}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={mainImage} />

        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <article
        itemScope
        itemType="https://schema.org/NewsArticle"
        className="single-blog-container"
      >
        <h1 itemProp="headline" className="sub-head">
          {title}
        </h1>
        <div className="main-image-container">
          <img
            itemProp="image"
            loading="lazy"
            src={mainImage}
            alt={title}
            className="main-image"
          />
        </div>
        <p className="meta">
          <span itemProp="author">{author}</span> •{" "}
          <time itemProp="datePublished" dateTime={date}>
            {formattedDate}
          </time>
        </p>
        <p itemProp="articleBody" className="description">
          {description}
        </p>
        <div className="sub-image-container">
          {singleNews.image1 && (
            <img
              loading="lazy"
              src={singleNews.image1}
              alt={title}
              className="sub-image"
            />
          )}
          {singleNews.image2 && (
            <img
              loading="lazy"
              src={singleNews.image2}
              alt={title}
              className="sub-image"
            />
          )}
          {singleNews.image3 && (
            <img
              loading="lazy"
              src={singleNews.image3}
              alt={title}
              className="sub-image"
            />
          )}
        </div>
      </article>
    </>
  );
};

export default SingleBlog;
