import { get, update } from '@reshuffle/db';

/**
 *
 * @param {Object} item` 
 *
 * @return {Array} of object
 */

/* @expose */
export async function setFavSearch(item) {
  return update ('favSearchList', savedSearchList  => {
    const allSearch = {...savedSearchList};
    allSearch[item.id] = item  
    return allSearch
  });
}

/**
 * @return {Array} 
 */

/* @expose */
export async function getFavSearch() {
  const searchlist = await get('favSearchList');
  let result = [];
  for (let search in searchlist) result.push(searchlist[search]);
  return result.reverse();
}