import React, {  useEffect, } from 'react';
import { useNews } from '../hooks/useNews';
import './css/FacebookPosts.css'


const FacebookPosts = () => {
  const { facebookPosts,
    // fetchFacebookLink
 } = useNews();

const currentPosts = facebookPosts.slice(0,3);

//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 3;

//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = facebookPosts.slice(indexOfFirstPost, indexOfLastPost);

//   const totalPages = Math.ceil(facebookPosts.length / postsPerPage);

//   const nextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
//   };

//   const prevPage = () => {
//     if (currentPage > 1) setCurrentPage(prev => prev - 1);
//   };

  useEffect(() => {
    // Ensure Facebook SDK is loaded once
    if (!window.FB) {
        const script = document.createElement("script");
        script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    } else {
        window.FB.XFBML.parse();
    }
  }, []);


    useEffect(() => {
      if (window.FB) window.FB.XFBML.parse();
    }, [currentPosts]);


  return (
    <div className="facebook-posts-container">
      <h2>Facebook Posts</h2>

      <div className="posts-list">
        {currentPosts
        .map((post) => (
        <div key={post._id} className="post-card">
            <div className="fb-post" data-href={post.facebookLink} data-width="300"></div>
        </div>
        ))}
      </div>

      {/* <div className="pagination">
        <button className="btn" onClick={prevPage} disabled={currentPage === 1}>Prev</button>
        <span className="page-indicator">Page {currentPage} of {totalPages}</span>
        <button className="btn" onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div> */}
    </div>

    );
};

export default FacebookPosts;
