import React, { Component } from 'react';
import { observer } from 'mobx-react';
import categoryStore from './store';


class PageController extends Component {
  handlePageChange = (page) => {
    categoryStore.setCurrentPage(page);
  };

  render() {
    const { totalPages, currentPage } = categoryStore;

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
                onClick={() => this.handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default observer(PageController);