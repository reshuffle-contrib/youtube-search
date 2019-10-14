import '@reshuffle/code-transform/macro';
import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import NavBar from './components/NavBar';
import ApiKeyNav from './components/ApiKeyNav';
import FavSearchList from './components/FavSearchList';
import {
  getFavSearch,
  setFavSearch,
  delFavSearch,
} from '../backend/backend.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const YT_API = process.env.REACT_APP_YT_API_KEY;

class App extends Component {
  constructor(props) {
    super(props);
    this.updateFavList = this.updateFavList.bind(this);
    this.state = {
      videos: [],
      selectedVideo: null,
      searchList: [],
      searchKeyword: '',
      selectedSearchIndex: -1,
      favStatus: false,
      apiMissingErr: false,
    };

    this.searchYoutube('');
  }

  componentDidMount() {
    if (!YT_API) {
      this.setState({ apiMissingErr: true });
    }
    getFavSearch().then(res => {
      if (res) {
        this.setState({ searchList: res });
      }
    });
  }

  videoSearch = _.debounce(term => {
    this.searchYoutube(term);
  }, 300);

  searchYoutube(term) {
    if (YT_API) {
      YTSearch({ key: YT_API, term: term }, videos => {
        this.setState({
          videos: videos,
          selectedVideo: videos[0],
        });
      });
    }
  }

  updateFavList() {
    const { searchList, searchKeyword } = this.state;
    if (searchKeyword && !_.find(searchList, { keyword: searchKeyword })) {
      setFavSearch({ keyword: searchKeyword }).then(res => {
        if (res) {
          getFavSearch().then(res => {
            if (res) {
              this.setState({ searchList: res, favStatus: true });
            }
          });
        }
      });
    } else {
      delFavSearch(searchKeyword).then(res => {
        if (res) {
          getFavSearch().then(res => {
            if (res) {
              this.setState({
                searchList: res,
                selectedSearchIndex: -1,
                searchKeyword: '',
                favStatus: false,
              });
            }
          });
        }
      });
    }
  }

  deleteFromFavList(item) {
    delFavSearch(item.keyword).then(res => {
      if (res) {
        getFavSearch().then(res => {
          if (res) {
            this.setState({
              searchList: res,
              selectedSearchIndex: -1,
              searchKeyword: '',
              favStatus: false,
            });
          }
        });
      }
    });
  }

  selectSearch(selectedItem, index) {
    this.setState({
      searchKeyword: selectedItem,
      selectedSearchIndex: index,
      favStatus: true,
    });
    this.videoSearch(selectedItem);
  }

  onInputChange(searchTerm) {
    this.setState({
      searchKeyword: searchTerm,
      selectedSearchIndex: -1,
      favStatus: false,
    });
    this.videoSearch(searchTerm);
  }

  render() {
    return (
      <div>
        <ApiKeyNav />
        <NavBar siteTitle='React Youtube App' />
        <Container fluid>
          <Row noGutters='true'>
            <SearchBar
              favStatus={this.state.favStatus}
              term={this.state.searchKeyword}
              updateFavList={this.updateFavList}
              onChange={searchTerm => {
                this.onInputChange(searchTerm);
              }}
            />
          </Row>
          <Row>
            <Col className='col-2'>
              <FavSearchList
                searchList={this.state.searchList}
                onItemSelect={(selectedItem, index) => {
                  this.selectSearch(selectedItem, index);
                }}
                selectedIndex={this.state.selectedSearchIndex}
                deleteItem={selectedItem => {
                  this.deleteFromFavList(selectedItem);
                }}
              />
            </Col>
            <Col>
              <VideoPlayer
                apiMissingErr={this.state.apiMissingErr}
                video={this.state.selectedVideo}
              />
            </Col>
            <Col className='col-3'>
              <VideoList
                onVideoSelect={selectedVideo => {
                  this.setState({ selectedVideo });
                }}
                videos={this.state.videos}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
