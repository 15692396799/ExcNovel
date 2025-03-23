import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import {categoryStore} from './stores/category';
import CategoryFilter from './CategoryFilter';
import CategoryList from './CategoryList';
import PageController from './PageController';
import { Category, Story } from '../types';

interface CategoriesProps {}

const Categories: React.FC<CategoriesProps> = observer(() => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fecthCategoryUrl = 'http://localhost:5000/api/categories';
  const fetchTypeUrl = 'http://localhost:5000/api/stories/type';

  useEffect(() => {
    fetchCategories();
    fetchStories();

    // 监听selectedCategory的变化
    const disposeReaction = reaction(
      () => categoryStore.selectedType,
      (selectedType) => {
        fetchStories();
      }
    );

    // 清理监听器
    return () => {
      disposeReaction();
    };
  }, []);//add selectedCategory to the dependency array?

  const fetchCategories = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const timeout = 5000;

    const fetchPromise = fetch(fecthCategoryUrl, { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        categoryStore.setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch Category aborted');
        } else {
          console.error('Error:', error);
        }
        setLoading(false);
        setError(error);
      });

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

  const fetchStories = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const timeout = 5000;

    const fetchPromise = fetch(
      `${fetchTypeUrl}/${encodeURIComponent(categoryStore.selectedType)}`,
      { signal }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        categoryStore.setStories(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch Stories aborted');
        } else {
          console.error('Error:', error);
        }
        setLoading(false);
        setError(error);
      });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        abortController.abort();
        reject('Request timed out');
      }, timeout);
    });

    Promise.race([fetchPromise, timeoutPromise]).catch((error) => {
      if (error === 'Request timed out') {
        console.log('Request Story Data timed out');
      }
    });
  };

  // const handleCategoryClick = (type: string) => {
  //   const selectedCategory = categoryStore.categories.find((category) => category.type === type) || null;
  //   categoryStore.setSelectedCategory(selectedCategory);
  // };

  const { categories, stories } = categoryStore;

  return (
    <div className="categories-container">
      {/* 过滤器 */}
      <CategoryFilter />

      {/* 加载状态 */}
      {loading && <div className="loading">Loading...</div>}

      {/* 错误信息 */}
      {error && <div className="error">Error: {error.message}</div>}

      {/* 故事列表 */}
      {stories.length !== 0 ? (
        <>
          <CategoryList />
          <PageController />
        </>
      ) : (
        <div className="no-data">暂无数据</div>
      )}
    </div>
  );
});

export default Categories;