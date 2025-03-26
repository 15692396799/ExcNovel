import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Story } from '../types/story';
import { Card, Badge } from 'react-bootstrap';
import { categoryStore } from '../stores/category';
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
            {/* <img
                src={story.image}
                alt={`${story.id} cover`}
                className={`img-fluid rounded ${imageStyle}`} // 合并传入的 className
                onClick={handleClick}
                style={{ cursor: 'pointer' }} // 添加手型光标
            /> */}
                  {/* 卡片主体 */}
      <Card className="h-100 shadow-sm">
        <div className="ratio ratio-16x9">
          <Card.Img 
            variant="top" 
            src={story.image || 'https://via.placeholder.com/300x200'} 
            alt={story.title}
          />
        </div>
        
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title className="mb-0">{story.title}</Card.Title>
            <Badge bg="secondary" className="ms-2">
              {categoryStore.getCategoryName(story.type)}
            </Badge>
          </div>
          
          <Card.Subtitle className="mb-2 text-muted">
            <small>作者: {story.author || '未知'}</small>
          </Card.Subtitle>
          
          <Card.Text className="flex-grow-1">
            <small className="text-truncate d-block">
              {story.description?.substring(0, 60)}{story.description?.length > 60 ? '...' : ''}
            </small>
          </Card.Text>
          
          {children}
        </Card.Body>
      </Card>

            {/* 自定义内容 */}
            {/* {children} */}

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