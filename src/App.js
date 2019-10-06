import '@reshuffle/code-transform/macro'
import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import NavBar from './components/NavBar';
import FavSearchList from './components/FavSearchList';
import { getFavSearch, setFavSearch} from '../backend/backend.js';

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
    };

    this.searchYoutube('');
  }

  componentDidMount() {
    // getFavSearch().then(res => {
    //   if (res) {
    //     this.setState({searchList: res})
    //   }
    // });
  }

  videoSearch = _.debounce((term) => { this.searchYoutube(term) }, 300);

  searchYoutube(term) {
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
    if (searchKeyword) {
      setFavSearch({"id": searchList.length, 'keyword': searchKeyword}).then(res => {
        if (res) {
          getFavSearch().then(res => {
            if (res) { this.setState({searchList: res}); }
          });
        }
      });
    }
  }


  render() {
    return (
      <div>
        <NavBar siteTitle='React Youtube App' />
        <div className="container">
          <SearchBar
            updateFavList={this.updateFavList}
            onChange={(searchTerm) => {this.videoSearch(searchTerm)}} />
          <FavSearchList 
            searchList={this.state.searchList}
            onItemSelect={(selectedItem) => {this.videoSearch(selectedItem)}} 
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