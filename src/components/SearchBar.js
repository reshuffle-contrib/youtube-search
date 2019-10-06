import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  onInputChange(term) {
    this.setState({ term: term });
    this.props.onChange(term);
  }

  render() {
    return (
      <div className="search-bar">
        <button 
          className="btn btn-sm mr-5"
          onClick={() => {this.props.updateFavList()}}>
          <i className="fa fa-star mr-5" aria-hidden="true"></i>
          Add to favourites
        </button>
        <input
          value={this.state.term}
          onChange={(event) => {
            this.onInputChange(event.target.value)
          }}
          placeholder='Search Video'
        />
      </div>
    );
  }
}

export default SearchBar;
