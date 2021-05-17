import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdateInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      album: '',
      artist: '',
      genre: '',
      release_date: '',
      record_label: ''
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('https://mtrackeraks.herokuapp.com/api/songs/'+this.props.match.params.id)
      .then(res => {
        // this.setState({...this.state, song: res.data})
        this.setState({
          title: res.data.title,
          album: res.data.album,
          artist: res.data.artist,
          genre: res.data.genre,
          release_date: res.data.release_date,
          record_label: res.data.record_label
        })
      })
      .catch(err => {
        console.log("Error from UpdateInfo");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      title: this.state.title,
      album: this.state.album,
      artist: this.state.artist,
      genre: this.state.genre,
      release_date: this.state.release_date,
      record_label: this.state.record_label
    };

    axios
      .put('https://mtrackeraks.herokuapp.com/api/songs/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/show-song/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateInfo!");
      })
  };


  render() {
    return (
      <div className="UpdateInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/show-list" className="btn btn-outline-warning float-left">
                  Show List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Song</h1>
              <p className="lead text-center">
                  Update Song Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="title">Title</label>
              <input
                type='text'
                placeholder='Title'
                name='title'
                className='form-control'
                value={this.state.title}
                onChange={this.onChange}
              />
            </div>
            <br />

            <div className='form-group'>
            <label htmlFor="album">Album</label>
              <input
                type='text'
                placeholder='album'
                name='album'
                className='form-control'
                value={this.state.album}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="artist">Artist</label>
              <input
                type='text'
                placeholder='Artist'
                name='artist'
                className='form-control'
                value={this.state.artist}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="genre">Genre</label>
              <input
                type='text'
                placeholder='Genre'
                name='genre'
                className='form-control'
                value={this.state.genre}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="release_date">Release Date</label>
              <input
                type='date'
                placeholder='release_date'
                name='release_date'
                className='form-control'
                value={this.state.release_date}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
            <label htmlFor="record_label">Record Label</label>
              <input
                type='text'
                placeholder='record_label'
                name='record_label'
                className='form-control'
                value={this.state.record_label}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Song</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateInfo;