import React, { useState } from 'react';
import { observer } from 'mobx-react';
import categoryStore from './store';
import './styles/PopularStories.css'; // 自定义样式文件


const PopularStories: React.FC = observer(() => {
  const { popularStories } = categoryStore; // 假设 popularStories 是一个包含故事数据的数组
  const [hoveredStoryId, setHoveredStoryId] = useState<string | null>(null);

  // 根据屏幕宽度决定网格布局
  const getGridColumns = () => {
    if (window.innerWidth >= 768) {
      return 4; // 大屏幕：4 列
    }
    return 2; // 小屏幕：2 列
  };

  const gridColumns = getGridColumns();
  const gridRows = Math.ceil(popularStories.length / gridColumns);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">热门小说</h2>
      <div
        className="grid-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gap: '1rem',
        }}
      >
        {popularStories.map((story: Story) => (
          <div
            key={story.id}
            className="story-card position-relative"
            onMouseEnter={() => setHoveredStoryId(story.id)}
            onMouseLeave={() => setHoveredStoryId(null)}
          >
            {/* 封面 */}
            <img
              src={story.cover}
              alt={`${story.id} cover`}
              className="img-fluid rounded"
            />

            {/* 点赞数 */}
            <div className="likes-overlay position-absolute top-0 end-0 bg-dark text-white p-1 rounded">
              <i className="bi bi-heart-fill me-1"></i>
              {story.likes}
            </div>

            {/* 悬浮时显示热门书评 */}
            {hoveredStoryId === story.id && (
              <div className="review-overlay position-absolute bottom-0 start-0 w-100 bg-dark text-white p-2 rounded">
                <p className="mb-0">{story.hotReview}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default PopularStories;