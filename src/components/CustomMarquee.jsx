// src/components/CustomMarquee.jsx
import React from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';
import { useNews } from '../hooks/useNews';

function CustomMarquee() {
  const {news} = useNews();
  return (
    <Marquee
      style={{ background: "white", padding: "10px", color: "var(--main-color)"}}
      pauseOnHover
      speed={80}
      gradient={false}
      className='marquee'
    >
      {news.map((newsItem) => (
        <span key={newsItem?._id} style={{ marginRight: '50px', fontWeight: '500' }}>
           {/* {newsItem.head} */}
          <Link to={`/singleblog/${newsItem?._id}`}>📰 {newsItem?.title}</Link>
        </span>
      ))}
    </Marquee>
  );
}

export default CustomMarquee;
