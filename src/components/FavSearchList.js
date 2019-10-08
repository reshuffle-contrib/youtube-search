import React from 'react';
import FavSearchItem from './FavSearchItem'

const FavSearchList = ({searchList, onItemSelect, selectedIndex, deleteItem}) => {
  if (!searchList) {
    return <div className="col-md-2 list-group">No Favourite keywords</div>;
  }
  const searches = searchList.map((item, index) => {
    return (
      <FavSearchItem
        key={index}
        item={item}
        onItemSelect={ onItemSelect }
        index={index}
        selectedIndex={ selectedIndex }
        deleteItem={ deleteItem }
      />
    );
  });

  return (
    <div className="col-md-2 ">
      {searchList.length > 0 && <div className="title">Favourites</div>}
      <ul className="list-group search-list">
        { searches }
      </ul>
    </div>
  );
}

export default FavSearchList;