import React from 'react';

const FavSearchItem = ({ item, onItemSelect, index, selectedIndex, deleteItem}) => {

  return(
    <li className={index === selectedIndex ? "list-group-item active" : "list-group-item" }  onClick={() => { onItemSelect(item.keyword, index) }}>
      <div className="video-list media"> 
        <button className="btn btn-sm del-btn" style={{float: "right"}} onClick={() => {deleteItem(item)}} >X</button>
        <div className="media-body">
          <div className="media-heading">{item.keyword}</div>
        </div>
      </div>
    </li>
  );
}

export default FavSearchItem;