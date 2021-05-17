import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreateSong extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      album:'',
      artist:'',
      genre:'',
      release_date:'',
      record_label:''
    };
  }

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
      .post('https://mtrackeraks.herokuapp.com/api/songs', data)
      .then(res => {
        this.setState({
          title: '',
          album:'',
          artist:'',
          genre:'',
          release_date:'',
          record_label:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in CreateSong!");
      })
  };

  render() {
    return (
      <div className="CreateSong">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/show-list" className="btn btn-outline-warning float-left">
                  Show List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Song</h1>
              <p className="lead text-center">
                  Create New Song
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Song Title'
                    name='title'
                    className='form-control'
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Album'
                    name='album'
                    className='form-control'
                    value={this.state.album}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
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
                  <input
                    type='text'
                    placeholder='Record Label'
                    name='record_label'
                    className='form-control'
                    value={this.state.record_label}
                    onChange={this.onChange}
                  />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateSong;