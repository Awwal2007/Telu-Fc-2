import React from "react";
import Slider from "react-slick";
import "./css/EventBannerSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNews } from "../hooks/useNews";
import { Link } from "react-router-dom";

const EventBannerSlider = () => {
  const { news, loading } = useNews();

  const settings = {
    dots: true,
    infinite: news.length > 1,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // ✅ Skeleton UI while loading
  if (loading) {
    return (
      <div className="skeleton-banner-wrapper">
        {[...Array(1)]
        .map((_, index) => (
          <div key={index} className="skeleton-banner">
            <div className="skeleton-banner-image" />
            <div className="skeleton-banner-content">
              <div className="skeleton-line title" />
              <div className="skeleton-line short" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ✅ Fallback if no news available
  if (!loading && news.length === 0) {
    return (
      <div className="no-banner">
        <p>No event banners available yet.</p>
      </div>
    );
  }

  // ✅ Actual slider
  return (
    <Slider {...settings} className="event-slider">
      {news      
      .slice(0,6)
      .map((slide) => (
        <div className="event-banner" key={slide._id}>
          <img
            loading="lazy"
            src={slide.mainImage}
            alt={slide.title}
            className="banner-image"
          />
          <div className="banner-overlay">
            <h1 className="banner-title">{slide.title}</h1>
            <div className="banner-meta">
              <span>
                🗓{" "}
                {new Date(slide.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default EventBannerSlider;
