import { makeObservable, observable, action, computed } from 'mobx';

import { Category, Story } from '../../types';

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


