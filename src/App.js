import '@reshuffle/code-transform/macro'
import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import NavBar from './components/NavBar';
import FavSearchList from './components/FavSearchList';
import { getFavSearch, setFavSearch } from '../backend/backend.js';

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
      selectedSearchIndex: -1
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

  videoSearch = _.debounce((term,valueFromSearchbox) => { this.searchYoutube(term, valueFromSearchbox) }, 300);

  searchYoutube(term, valueFromSearchbox) {
    if (valueFromSearchbox){
      this.setState({selectedSearchIndex: -1})
    }
    YTSearch({ key: YT_API, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0],
        searchKeyword: term
      });
    });
  }

  updateFavList() {
    const {searchList, searchKeyword} = this.state;
    if (searchKeyword && !( _.find(searchList, {'keyword': searchKeyword}))) {
      setFavSearch({"id": searchList.length, 'keyword': searchKeyword}).then(res => {
        if (res) {
          getFavSearch().then(res => {
            if (res) { this.setState({searchList: res}); }
          });
        }
      });
    }
  }

  selectSearch(selectedItem, index) {
    this.setState({selectedSearchIndex: index})
    this.videoSearch(selectedItem);
  }


  render() {
    return (
      <div>
        <NavBar siteTitle='React Youtube App' />
        <div className="container">
          <SearchBar
            updateFavList={this.updateFavList}
            onChange={(searchTerm, valueFromSearchbox) => {this.videoSearch(searchTerm, valueFromSearchbox)}} />
          <FavSearchList 
            searchList={this.state.searchList}
            onItemSelect={(selectedItem, index) => {this.selectSearch(selectedItem, index)}}
            selectedIndex={this.state.selectedSearchIndex}
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