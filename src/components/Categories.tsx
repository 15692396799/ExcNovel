import React, { Component } from 'react';
import { observer } from 'mobx-react';
import categoryStore from './store';
import CategoryFilter from './CategoryFilter';
import CategoryList from './CategoryList';
import PageController from './PageController';
import { Category, Story } from '../types';
// import PageController from './PageController';

interface CategoriesProps {}
interface CategoriesState {
    categories: Category[];
    selectedCategory: Category | null;
    stories: Story[];
    loading: boolean;
    error: Error | null;
}


class Categories extends Component {
  fecthCategoryUrl = 'http://localhost:5000/api/categories';
  fetchTypeUrl = 'http://localhost:5000/api/stories/type';

  componentDidMount() {
    this.fetchCategories();
  }

  componentDidUpdate(prevProps: CategoriesProps, prevState: CategoriesState) {
    if (categoryStore.selectedCategory !== prevState?.selectedCategory) {
      this.fetchStories();
    }
  }

  fetchCategories = () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const timeout = 5000;

    const fetchPromise = fetch(this.fecthCategoryUrl, { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        categoryStore.setCategories(data);
        categoryStore.setLoading(false);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch Category aborted');
        } else {
          console.error('Error:', error);
        }
        categoryStore.setLoading(false);
        categoryStore.setError(error);
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

  fetchStories = () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const timeout = 5000;

    const fetchPromise = fetch(
      `${this.fetchTypeUrl}/${encodeURIComponent(categoryStore.selectedCategory?.type || '')}`,
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
        categoryStore.setLoading(false);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch Stories aborted');
        } else {
          console.error('Error:', error);
        }
        categoryStore.setLoading(false);
        categoryStore.setError(error);
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

  handleCategoryClick = (type: string) => {
    const selectedCategory = categoryStore.categories.find((category) => category.type === type);
    categoryStore.setSelectedCategory(selectedCategory || null);
  };

  render() {
    const { categories, stories, loading, error } = categoryStore;

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
            <PageController  />
          </>
        ) : (
          <div className="no-data">暂无数据</div>
        )}
      </div>
    );
  }
}

export default observer(Categories);