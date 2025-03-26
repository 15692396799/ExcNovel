import React from 'react';
import { observer } from 'mobx-react';
import {categoryStore} from '../stores/category';

const PageController: React.FC = observer(() => {
  const { totalPages, currentPage } = categoryStore;

  const handlePageChange = (page: number) => {
    categoryStore.setCurrentPage(page);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default PageController;