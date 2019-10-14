import React from 'react';
import FavSearchItem from './FavSearchItem';

const FavSearchList = ({
  searchList,
  onItemSelect,
  selectedIndex,
  deleteItem,
}) => {
  if (!searchList) {
    return <div className='list-group'>No Favorite keywords</div>;
  }
  const searches = searchList.map((item, index) => {
    return (
      <FavSearchItem
        key={index}
        item={item}
        onItemSelect={onItemSelect}
        index={index}
        selectedIndex={selectedIndex}
        deleteItem={deleteItem}
      />
    );
  });

  return (
    <div className=''>
      {searchList.length > 0 && <div className='title'>Bookmarks</div>}
      <ul className='list-group search-list'>{searches}</ul>
    </div>
  );
};

export default FavSearchList;
