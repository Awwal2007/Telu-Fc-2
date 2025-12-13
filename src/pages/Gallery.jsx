import React, { useState } from 'react';
import galleryImages from '../components/galleryImages';
import './css/Gallery.css';
import SideBar from '../components/SideBar';
import { Helmet } from 'react-helmet-async';
import MissedArticles from '../components/MissedArticles';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>

      {/* <Helmet>
        <title>Gallery | Iwo Land</title>
        <link rel="robot" content="index, follow" />
        <meta name="description" content="Explore stunning photos capturing the culture, people, and heritage of Iwo Land." />
        <meta name="keywords" content="Iwo Land, Iwo news, Iwo Land news, Oluwo, Iwo, Iwo Osun State, Osun State, History of Iwo, Odidere, Raven, Yoruba Land, Osun Oshogo, Oshogo, Telu 1" />
        <link rel="canonical" href="https://iwoland.com/gallery" />
        <meta property="og:title" content="Iwo Land Gallery" />
        <meta property="og:description" content="Discover a curated gallery of images from Iwo Land." />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Helmet> */}

      <div className="home-content">
        <div className="first-side">
          <div className="gallery-container">
            <h1 className="gallery-title">Our Gallery</h1>
            <div className="gallery-grid">
              {galleryImages
              .slice(0, 10)
              .map((img) => (
                <div
                  role='button'
                  tabIndex="0"
                  key={img.id}
                  className="gallery-item"
                  onClick={() => handleImageClick(img)}
                >
                  <img
                    loading="lazy"
                    src={img.src}
                    alt={img.alt}
                    className="gallery-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="second-side">
          <SideBar />
        </div>

        {/* ✅ Modal for zoomed image */}
        {selectedImage && (
          <div className="image-modal" onClick={closeModal}>
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="modal-image"
            />
            <p className="modal-caption">{selectedImage.alt}</p>
          </div>
        )}
      </div>
      <div>
        <MissedArticles />
      </div>
    </>
    
  );
};

export default Gallery;
