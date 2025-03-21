import React, { Component } from 'react';
import { observer } from 'mobx-react';
import categoryStore from './store';

class CategoryList extends Component {
  render() {
    const { stories} = categoryStore;
    
    return (
      <div className="row">
        {stories.map((novel) => (
          <div key={novel.id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="row g-0">
                {/* 左侧：图片缩略图 */}
                <div className="col-md-4">
                  <img
                    src={novel.image}
                    className="img-fluid rounded-start"
                    alt={novel.title}
                  />
                </div>

                {/* 右侧：文字介绍 */}
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{novel.title}</h5>
                    <p className="card-text">{novel.description}</p>
                    <p className="card-text">
                      <small className="text-muted">Rating: {novel.rating}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default observer(CategoryList);