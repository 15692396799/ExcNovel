import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Story } from '../types';
import '../styles/StoryCard.css';

const StoryCard: React.FC<{ story: Story; children?: React.ReactNode; imageStyle?: string }> = ({ story, children, imageStyle }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    // 点击封面跳转到详情页
    const handleClick = () => {
        navigate(`/story/${story.id}`);
    };

    return (
        <div
            className={`story-card position-relative `} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 封面 */}
            <img
                src={story.image}
                alt={`${story.id} cover`}
                className={`img-fluid rounded ${imageStyle}`} // 合并传入的 className
                onClick={handleClick}
                style={{ cursor: 'pointer' }} // 添加手型光标
            />

            {/* 自定义内容 */}
            {children}

            {/* 悬浮时显示热门书评 */}
            {/* {isHovered && (
        <div className="review-overlay position-absolute bottom-0 start-0 w-100 h-100 bg-dark text-white p-2 rounded">
          <p className="mb-0">{story.hotReview}</p>
        </div>
      )} */}
            {/* 悬浮时显示热门书评 */}
            {isHovered && (
                <div className="review-overlay position-absolute bottom-0 start-0 w-100 h-100 bg-dark text-white p-2 rounded">
                    <p className="mb-0">{story.hotReview}</p>
                </div>
            )}
        </div>
    );
};

export default StoryCard;