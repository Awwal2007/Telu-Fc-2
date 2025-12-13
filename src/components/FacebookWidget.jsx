import React from 'react';
import { FaTwitter, FaRetweet, FaHeart, FaReply, FaFacebook } from 'react-icons/fa';
import './css/TwitterWidget.css'; // Regular CSS

const FacebookWidget = () => {
  return (
    <>
      {/* Header */}
      <div className="twitter-header">
        <h2>FACEBOOK</h2>
      </div>
      <div className="twitter-widget">

        {/* Main Profile */}
        <div className="twitter-main-profile">
          <img
            loading='lazy'
            src="/user.jpg"
            alt="Àlẹ̀ Ìwẹrẹ́"
            className="profile-img"
          />
          <div>
            <div style={{ display: "flex", gap: "5px" }}>
              <h3 style={{ color: "#1e3a8a", fontWeight: "bold" }}>Iwo Land</h3>
              <button className="follow-button">
                <FaFacebook /> Follow
              </button>
            </div>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Facebook Page for the people, land and history of IwoLand (Iwo Land)
            </p>
          </div>
        </div>

        {/* Retweet Indicator */}
        <div className="twitter-retweet">
          <FaRetweet style={{ marginRight: "6px" }} />
          Àlẹ̀ Ìwẹrẹ́ Retweeted
        </div>

        {/* Tweet */}
        <div className="tweet-section">
          <div className="tweet-user">
            <img src="/user.jpg" alt="Lord Of Warri" />
            <div>
              <span className="tweet-user-name">Oluwo Of Iwo</span>
              <div className="tweet-user-meta">@Emperortelu · 12 Feb</div>
            </div>
            <span className="tweet-close">✕</span>
          </div>
          <p className="tweet-content">
            Iwo People are predominantly Yoruba-speaking, culturally rich, religiously diverse, and proud of their deep-rooted heritage.
          </p>

          {/* Actions */}
          <div className="tweet-actions">
            <div><FaReply /> 35</div>
            <div><FaRetweet /> 60</div>
            <div><FaHeart /> 91</div>
          </div>
        </div>
        <hr />
        <div className="tweet-section">
          <div className="tweet-user">
            <img src="/user.jpg" alt="Lord Of Warri" />
            <div>
              <span className="tweet-user-name">Oluwo Of Iwo</span>
              <div className="tweet-user-meta">@Emperortelu · 12 Feb</div>
            </div>
            <span className="tweet-close">✕</span>
          </div>
          <p className="tweet-content">
            Iwo People are predominantly Yoruba-speaking, culturally rich, religiously diverse, and proud of their deep-rooted heritage.
          </p>

          {/* Actions */}
          <div className="tweet-actions">
            <div><FaReply /> 35</div>
            <div><FaRetweet /> 60</div>
            <div><FaHeart /> 91</div>
          </div>
        </div>
        <hr />
        <div className="tweet-section">
          <div className="tweet-user">
            <img src="/user.jpg" alt="Lord Of Warri" />
            <div>
              <span className="tweet-user-name">Oluwo Of Iwo</span>
              <div className="tweet-user-meta">@Emperortelu · 12 Feb</div>
            </div>
            <span className="tweet-close">✕</span>
          </div>
          <p className="tweet-content">
            Iwo People are predominantly Yoruba-speaking, culturally rich, religiously diverse, and proud of their deep-rooted heritage.
          </p>

          {/* Actions */}
          <div className="tweet-actions">
            <div><FaReply /> 35</div>
            <div><FaRetweet /> 60</div>
            <div><FaHeart /> 91</div>
          </div>
        </div>
        <hr />
        <div className="tweet-section">
          <div className="tweet-user">
            <img src="/user.jpg" alt="Lord Of Warri" />
            <div>
              <span className="tweet-user-name">Oluwo Of Iwo</span>
              <div className="tweet-user-meta">@Emperortelu · 12 Feb</div>
            </div>
            <span className="tweet-close">✕</span>
          </div>
          <p className="tweet-content">
            Iwo People are predominantly Yoruba-speaking, culturally rich, religiously diverse, and proud of their deep-rooted heritage.
          </p>

          {/* Actions */}
          <div className="tweet-actions">
            <div><FaReply /> 35</div>
            <div><FaRetweet /> 60</div>
            <div><FaHeart /> 91</div>
          </div>
        </div>
      </div>
    </>
    
  );
};

export default FacebookWidget;
