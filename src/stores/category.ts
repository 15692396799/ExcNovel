import { makeObservable, observable, action, computed } from 'mobx';

import {Category} from '../types/category';
import {Story} from '../types/story';

import categoriesData from '../data/excnov-db.categories.json';

class CategoryStore {
  // 分类数据
  categories: Category[] = [];

  // 当前选中的分类
  selectedType : string = 'default';

  // 故事列表
  stories: Story[] = [];

  // 加载状态
  loading: boolean = true;

  // 错误信息
  error: Error | null = null;

  // 分页
  currentPage: number = 1;
  novelsPerPage: number = 6; // 每页显示6本小说

  constructor() {
    makeObservable(this, {
      categories: observable,
      selectedType: observable,
      stories: observable,
      loading: observable,
      error: observable,
      currentPage: observable,
      setCategories: action,
      setSelectedType: action,
      setStories: action,
      setLoading: action,
      setError: action,
      setCurrentPage: action,
      currentNovels: computed,
      totalPages: computed,
    });
    this.loadCategories();
  }

    // 从JSON文件加载分类
    async loadCategories() {
      this.loading = true;
      this.error = null;
      
      try {
        // 模拟异步加载（实际从JSON文件直接导入是同步的）
        await new Promise(resolve => setTimeout(resolve, 300));
        
        this.categories = categoriesData;
        this.loading = false;
      } catch (error) {
        this.error = new Error('加载分类数据错误');
        this.loading = false;
        console.error('加载分类数据错误:', error);
      }
    }
  
    // 获取所有分类
    get allCategories() {
      return this.categories;
    }
  
    // 根据类型获取分类名称
    getCategoryName(type: string): string {
      const category = this.categories.find(c => c.type === type);
      return category ? category.name : '未知分类';
    }

  // 设置分类数据
  setCategories(categories: Category[]) {
    this.categories = categories;
  }

  // 设置选中的分类
  setSelectedType(type: string) {
    this.selectedType = type;
    this.currentPage = 1; // 切换到第一页
  }

  // 设置故事列表
  setStories(stories: Story[]) {
    this.stories = stories;
  }

  // 设置加载状态
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  // 设置错误信息
  setError(error: Error | null) {
    this.error = error;
  }

  // 设置当前页码
  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  // 获取当前页的小说
  get currentNovels(): Story[] {
    const indexOfLastNovel = this.currentPage * this.novelsPerPage;
    const indexOfFirstNovel = indexOfLastNovel - this.novelsPerPage;
    return this.stories.slice(indexOfFirstNovel, indexOfLastNovel);
  }

  // 获取总页数
  get totalPages(): number {
    return Math.ceil(this.stories.length / this.novelsPerPage);
  }
}

// 创建 Store 实例并导出
export const categoryStore = new CategoryStore();


