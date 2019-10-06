import React from 'react';

const FavSearchItem = ({ item, onItemSelect }) => {

  return(
    <li className="list-group-item" onClick={() => { onItemSelect(item.keyword) }}>
      <div className="video-list media">
        <div className="media-body">
          <div className="media-heading">{item.keyword}</div>
        </div>
      </div>
    </li>
  );
}

export default FavSearchItem;