import '@reshuffle/code-transform/macro'
import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import NavBar from './components/NavBar';
import FavSearchList from './components/FavSearchList';
import { getFavSearch, setFavSearch, delFavSearch } from '../backend/backend.js';

const YT_API = process.env.REACT_APP_YT_API_KEY;



class App extends Component {
  constructor(props) {
    super(props);
    this.updateFavList = this.updateFavList.bind(this);
    this.state = {
      videos: [],
      selectedVideo: null,
      searchList: [],
      searchKeyword: "",
      selectedSearchIndex: -1,
      favStatus: false
    };

    this.searchYoutube('');
  }

  componentDidMount() {
    getFavSearch().then(res => {
      if (res) {
        this.setState({searchList: res})
      }
    });
  }

  videoSearch = _.debounce((term) => { this.searchYoutube(term) }, 300);

  searchYoutube(term) {
    YTSearch({ key: YT_API, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0],
      });
    });
  }

  updateFavList() {
    const {searchList, searchKeyword} = this.state;
    if (searchKeyword && !( _.find(searchList, {'keyword': searchKeyword}))) {
      setFavSearch({'keyword': searchKeyword}).then(res => {
        if (res) {
          getFavSearch().then(res => {
            if (res) { this.setState({searchList: res}); }
          });
        }
      });
    }
  }

  deleteFromFavList(item) {
    delFavSearch(item.keyword).then(res => {
      if (res) {
        getFavSearch().then(res => {
          if (res) { this.setState({searchList: res, selectedSearchIndex: -1, searchKeyword: "", favStatus: false}); }
        });
      }
    });
  }

  selectSearch(selectedItem, index) {
    this.setState({searchKeyword: selectedItem, selectedSearchIndex: index, favStatus: true})
    this.videoSearch(selectedItem);
  }

  onInputChange(searchTerm) {
    this.setState({searchKeyword: searchTerm, selectedSearchIndex: -1, favStatus: false});
    this.videoSearch(searchTerm);
  }

  render() {
    return (
      <div>
        <NavBar siteTitle='React Youtube App' />
        <div className="container">
          <SearchBar
            favStatus={this.state.favStatus}
            term={this.state.searchKeyword}
            updateFavList={this.updateFavList}
            onChange={(searchTerm) => {this.onInputChange(searchTerm)}} />
          <FavSearchList 
            searchList={this.state.searchList}
            onItemSelect={(selectedItem, index) => {this.selectSearch(selectedItem, index)}}
            selectedIndex={this.state.selectedSearchIndex}
            deleteItem={(selectedItem) => {this.deleteFromFavList(selectedItem)}}
            />
          <VideoPlayer video={this.state.selectedVideo} />
          <VideoList
            onVideoSelect={(selectedVideo) => {this.setState({selectedVideo})}}
            videos={this.state.videos}
            />
        </div>
      </div>
    );
  }

}

export default App;