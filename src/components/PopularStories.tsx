import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
// import categoryStore from './stores/category';
import { Story } from '../types'; // 导入 Story 类型
import '../styles/PopularStories.css'; // 自定义样式文件
import StoryCard from './StoryCard';


const PopularStories: React.FC = observer(() => {
  const [popularStories, setPopularStories] = useState<Story[]>([]);
  const [hoveredStoryId, setHoveredStoryId] = useState<number | null>(null);
  const fetchPopularUrl = 'http://localhost:5000/api/stories/popular';

  //加载数据
  useEffect(() => {
    fetchPopularStories();
  }
    , []);

  const fetchPopularStories = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const timeout = 5000;

    const fetchPromise = fetch(fetchPopularUrl, { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPopularStories(data);
        console.log('fetch popular data successfully!');
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch Popular Stories aborted');
        } else {
          console.error('Error:', error);
        }
      });

    // 超时处理

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        abortController.abort();
        reject('Request timed out');
      }, timeout);
    });

    Promise.race([fetchPromise, timeoutPromise]).catch((error) => {
      if (error === 'Request timed out') {
        console.log('Request Category Data timed out');
      }
    });
  };

  const MAX_ROWS = 3; // 默认最大行数
  const ITEM_HEIGHT = 200; // 每个网格项的预估高度（包括间距）

  const getGridColumns = () => {
    if (window.innerWidth >= 768) {
      return 4; // 大屏幕：4 列
    }
    return 2; // 小屏幕：2 列
  };

  const getGridRows = () => {
    const screenHeight = window.innerHeight; // 获取屏幕高度
    const availableHeight = screenHeight * 0.6; // 假设可用高度为屏幕高度的 60%
    const maxRowsByHeight = Math.floor(availableHeight / ITEM_HEIGHT); // 根据高度计算最大行数
    return Math.min(MAX_ROWS, maxRowsByHeight); // 取默认最大行数和高度计算行数的最小值
  };


  const handleRefresh = () => {
    setPopularStories(fetchNewStories());
  }

  const gridColumns = getGridColumns();
  const gridRows = getGridRows();

    // 模拟获取新一批小说的函数
    const fetchNewStories = () => {
      // 随机打乱数组并返回前 6 个
      const shuffled = popularStories.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, gridColumns*gridRows);
    };
  

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">热门小说</h2>
        <button className="btn btn-primary" onClick={handleRefresh}>
          刷新
        </button>
      </div>
      <div
        className="grid-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gridTemplateRows: `repeat(${gridRows}, 1fr)`,
          gap: '1rem',
        }}
      >
        {popularStories.slice(0, gridColumns * gridRows).map((story) => (
          <div
            key={story.id}
            className="story-card position-relative"
            onMouseEnter={() => setHoveredStoryId(story.id)}
            onMouseLeave={() => setHoveredStoryId(null)}
          >
            {/* 封面 */}
            {/* <img
              src={story.image}
              alt={`${story.id} cover`}
              className="img-fluid rounded"
            /> */}
            <StoryCard story={story}>
            </StoryCard>

            {/* 点赞数 */}
            <div className="likes-overlay position-absolute top-0 end-0 bg-dark text-white p-1 rounded">
              <i className="bi bi-heart-fill me-1"></i>
              {story.likes}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
);
export default PopularStories;