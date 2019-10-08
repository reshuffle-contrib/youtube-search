import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const{ favStatus, term} = this.props;
    return (
      <div className="search-bar">
        <span className="fav-icon">
          <i onClick={() => { this.props.updateFavList() }} className={favStatus ? "fa fa-star mr-10" : "fa fa-star-o mr-10"} aria-hidden="true"></i>
          </span>
        <input
          id="search-box"
          value={term}
          onChange={(event) => {
            this.props.onChange(event.target.value)
          }}
          placeholder='Search Video'
        />
      </div>
    );
  }
}

export default SearchBar;
