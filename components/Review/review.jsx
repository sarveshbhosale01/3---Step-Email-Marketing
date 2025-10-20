import React from 'react';
import { useNavigate } from 'react-router-dom';
import './review.css';

const Reviews = () => {
  const navigate = useNavigate();
  const reviews = [
    {
      name: "Socials Barack",
      rating: "★★★★★",
      review: "I am so happy to find delight, affordable, efficient, and great customer support. Thanks, delight!",
      platform: "facebook",
      readMore: true
    },
    {
      name: "Kanto",
      rating: "★★★★★",
      review: "This is one of the best products I bought and I don't have anything fixed from.",
      platform: "amazon",
      afterText: "After a while of using"
    },
    {
      name: "Bhosale Comfort",
      rating: "★★★★",
      platform: "google",
      review : "The Developer(Sarvesh) is very good and very helpful. I had a problem with my email specification and he helped me to solve it quickly. I recommend him to everyone.",
    },
    {
      name: "Hateful Sales",
      rating: "★★★★★",
      review: "The place is great! I loved my expertise in sports, the staff is so friendly and professional, I liked you.",
      platform: "google"
    },
    {
      name: "Sergio Flores",
      rating: "★★★★★",
      review: "Todo an order can be app.",
      platform: "facebook"
    },
    {
      name: "Semayps",
      rating: "★★★★★",
      review: "Great keyboard! A really bad keyboard! Get the blue switch one, cut I like to annoy!",
      platform: "amazon",
      readMore: true
    },
    {
      name: "Chefs Jim",
      rating: "★★★★★",
      review: "top run a die! Magnifiques!",
      title: "Number 15",
      platform: "facebook"
    }
  ];

  const platformIcons = {
    google: "G",
    facebook: "F",
    amazon: "A",
    treeborder: "T"
  };

  return (
      <div className="reviews-container">
  {/* Paper planes background */}
  <div className="reviews-planes-background">
    <div className="paper-plane plane1">
      <div className="plane-body">
        <div className="plane-wing"></div>
      </div>
    </div>
    <div className="trail trail1"></div>
    
    <div className="paper-plane plane2">
      <div className="plane-body">
        <div className="plane-wing"></div>
      </div>
    </div>
    <div className="trail trail2"></div>
    
    <div className="paper-plane plane3">
      <div className="plane-body">
        <div className="plane-wing"></div>
      </div>
    </div>
    <div className="trail trail3"></div>
    
    <div className="paper-plane plane4">
      <div className="plane-body">
        <div className="plane-wing"></div>
      </div>
    </div>
    <div className="trail trail4"></div>
    
    <div className="paper-plane plane5">
      <div className="plane-body">
        <div className="plane-wing"></div>
      </div>
    </div>
    <div className="trail trail5"></div>
  </div>

<div className="reviews-card">

      <header className="reviews-header">
        <button className ="feedback-btn" onClick={() => navigate("/Contact")}>
          We would love to hear your feedback
        </button>
        <h1>What our customers say</h1>
        <div className="ratings-overview">
  <div className="overall-rating">
    <span className="rating-label">All Reviews</span>
    <span className="rating-score">4.6</span>
    <div className="stars">
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star-half-alt"></i>
    </div>
  </div>
  <div className="platform-ratings">
    <div className="platform-rating">
      <span className="platform-icon">
        <i className="fab fa-google"></i>
      </span>
      <span className="platform-name">Google</span>
      <span className="rating-score">4.7</span>
    </div>
    <div className="platform-rating">
      <span className="platform-icon">
        <i className="fab fa-facebook-f"></i>
      </span>
      <span className="platform-name">Facebook</span>
      <span className="rating-score">4.9</span>
    </div>
    <div className="platform-rating">
      <span className="platform-icon">
        <i className="fab fa-twitter"></i>
      </span>
      <span className="platform-name">Twitter</span>
      <span className="rating-score">4.5</span>
    </div>
    <div className="platform-rating">
      <span className="platform-icon">
        <i className="fas fa-home"></i>
      </span>
      <span className="platform-name">Angi</span>
      <span className="rating-score">4.6</span>
    </div>
  </div>
</div>
        <div className="divider"></div>
      </header>

      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <div className="reviewer-info">
                <h3 className="reviewer-name">{review.name}</h3>
                {review.title && <span className="review-title">{review.title}</span>}
              </div>
              <div className="review-rating">{review.rating}</div>
            </div>
            
            {review.afterText && (
              <div className="after-text">{review.afterText}</div>
            )}
            
            {review.tags && (
              <div className="review-tags">
                {review.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
            )}
            
            {review.review && (
              <div className="review-content">
                <p>{review.review}</p>
                {review.readMore && (
                  <button className="read-more">Read more</button>
                )}
              </div>
            )}
            
            <div className="review-footer">
              <span className="posted-on">Posted on</span>
              <span className={`platform platform-${review.platform}`}>
                {platformIcons[review.platform]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="load-more-container">
        <button className="load-more">Last More</button>
      </div>
    </div>
    </div>
  );
};

export default Reviews;