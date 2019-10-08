import { get, update, create } from '@reshuffle/db';


/* @expose */
export async function setFavSearch(item= {}) {
  return getFavSearch().then(list => {
    if (list) {
      return update("favsli", favList => favList.concat(item));
    } else {
      return create("favsli", [item]).then(() => getFavSearch());
    }
  });
}

/**
 * @return {Array} 
 */

/* @expose */
export async function getFavSearch() {
  return get("favsli");
}

/**
 *
 * @param {Object} item` 
 *
 * @return {Array} of object
 */

/* @expose */
export async function delFavSearch(item) {
  return update("favsli", (favList = []) =>
    favList.filter(todo => todo.keyword !== item)
  );
}