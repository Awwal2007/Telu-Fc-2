import React from 'react';
import { FaClock, FaUser } from 'react-icons/fa';
import './css/MissedArticle.css';
// import image1 from '../assets/IMG-20250722-WA0086.jpg'
// import image2 from '../assets/IMG-20250722-WA0088.jpg'
// import image3 from '../assets/IMG-20250722-WA0090.jpg'
// import image4 from '../assets/IMG-20250722-WA0088.jpg'
import { Link } from 'react-router-dom';
import { useNews } from '../hooks/useNews';

// const missedArticles = [
//   {
//     title: '14th Chigho Aghofen: A...',
//     image: image1,
//     categories: ['IWO PEOPLE'],
//     date: '21 JUNE 2025',
//     author: 'ALIWERE',
//   },
//   {
//     title: 'Oluwo of Iwo trek around the road construstion ...',
//     image: image3,
//     categories: ['IWO PEOPLE'],
//     date: '20 JUNE 2025',
//     author: 'ALIWERE',
//   },
//   {
//     title: 'IWO Roundabout: A Gran...',
//     image: image2,
//     categories: ['IWO ROUNDABOUT', 'IWO PEOPLE', 'OLUWO OF IWO'],
//     date: '20 JUNE 2025',
//     author: 'ALIWERE',
//   },
//   {
//     title: 'Iwo: A Land full of Muslims...',
//     image: image4,
//     categories: ['GOVERNANCE', 'IWO PEOPLE'],
//     date: '12 JUNE 2025',
//     author: 'IWO MEDIA',
//   },
// ];



const MissedArticles = () => {
  const {news} = useNews()
  return (
    <div className="missed-container">
      <div className="missed-header">
        <h2>You missed</h2>
      </div>

      <div className="missed-grid">
        {news
        .slice(3, 7)
        .map((article, idx) => (
          <Link to={`/singleblog/${article?._id}`} key={idx} className="missed-card">
            <div
              className="missed-image"
              style={{ backgroundImage: `url(${article.mainImage})` }}
            >
              <div className="image-overlay"></div>
              {/* <div className="missed-categories">
                {article.categories.map((cat, i) => (
                  <span key={i} className="missed-category">
                    {cat}
                  </span>
                ))}
              </div> */}
            </div>
            <div className="missed-content">
              <h3>{article.title}</h3>
              {/* <div className="missed-meta">
                <span><FaClock /> {article.date}</span>
                <span><FaUser /> {article.author}</span>
              </div> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MissedArticles;
