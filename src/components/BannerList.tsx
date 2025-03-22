import React from 'react';
import '../styles/BannerList.css';
import StoryCard from './StoryCard';
import { Story } from '../types';


interface BannerListProps {
  banners: Story[];
}

const BannerList: React.FC<BannerListProps> = ({ banners }) => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      {/* 轮播指示器 */}
      <div className="carousel-indicators">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* 轮播内容 */}
      <div className="carousel-inner">
        {banners.map((banner, index) => (
          <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"} data-bs-interval="3000">
            <StoryCard story={banner}>
          
            </StoryCard>
            <h5>{banner.title}</h5>
            <p>{banner.description}</p>    
          </div>
        ))}
      </div>

      {/* 轮播控制按钮 */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default BannerList;
