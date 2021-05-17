import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from './Card';

class ShowList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    };
  }

  componentDidMount() {
    axios
      .get('https://mtrackeraks.herokuapp.com/api/songs')
      .then(res => {
        this.setState({
          songs: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowList');
      })
  };


  render() {
    const songs = this.state.songs;
    console.log("PrintSong: " + songs);
    let songList;

    if(!songs) {
      songList = "there is no record!";
    } else {
      songList = songs.map((song, k) =>
        <Card song={song} key={k} />
      );
    }
    return (
      <div className="ShowList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Song List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create-song" className="btn btn-outline-warning float-right">
                + Add New Song
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
                {songList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowList;