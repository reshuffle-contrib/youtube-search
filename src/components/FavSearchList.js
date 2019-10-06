import React from 'react';
import FavSearchItem from './FavSearchItem'

const FavSearchList = ({searchList, onItemSelect}) => {
  if (!searchList) {
    return <div>No Favourite keywords</div>;
  }
  const searches = searchList.map((item, index) => {
    return (
      <FavSearchItem
        key={index}
        item={item}
        onItemSelect={ onItemSelect }
      />
    );
  });

  return (
    <ul className="col-md-2 list-group search-list">
      { searches }
    </ul>
  );
}

export default FavSearchList;