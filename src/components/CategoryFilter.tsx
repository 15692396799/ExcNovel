import React from 'react';
import { observer } from 'mobx-react';
import categoryStore from './store';

const CategoryFilter: React.FC = observer(() => {
  const { categories, selectedType } = categoryStore;

  const handleFilter = (type: string) => {
    const selectedCategory = categories.find((category) => category.type === type);
    categoryStore.setSelectedType(selectedCategory?.type || 'default');
  };

  const selectedName = categories.find((category) => category.type === selectedType)?.name;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">小说分类</h2>

      {/* 下拉列表 */}
      <div className="dropdown mb-4">
        <button
          className="btn btn-outline-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedType!='default' ? selectedName : 'Select a Category'}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className="dropdown-item me-3 ms-3"
                onClick={() => handleFilter(category.type)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default CategoryFilter;