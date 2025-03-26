// contexts/CategoryContext.tsx
import React, { createContext, useContext } from 'react';
import categories  from '../data/excnov-db.categories.json';

type Category = {
  type: string;
  name: string;
};

type CategoryContextType = {
  categories: Category[];
  getCategoryName: (type: string) => string;
};

const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  getCategoryName: () => '未知分类'
});

export const CategoryProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const getCategoryName = (type: string) => {
    const category = categories.find((c:any) => c.type === type);
    return category ? category.name : '未知分类';
  };

  return (
    <CategoryContext.Provider value={{ categories, getCategoryName }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);