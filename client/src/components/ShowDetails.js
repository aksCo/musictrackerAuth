import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class showDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: {}
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('https://mtrackeraks.herokuapp.com/api/songs/'+this.props.match.params.id)
      .then(res => {
        // console.log("Print-showDetails-API-response: " + res.data);
        this.setState({
          song: res.data
        })
      })
      .catch(err => {
        console.log("Error from ShowDetails");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('https://mtrackeraks.herokuapp.com/api/songs/'+id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowDetails_deleteClick");
      })
  };


  render() {

    const song = this.state.song;
    let Item = <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>{ song.title }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Artist</td>
            <td>{ song.artist }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Album</td>
            <td>{ song.album}</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Record Label</td>
            <td>{ song.record_label }</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Release Date</td>
            <td>{ song.release_date }</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Genre</td>
            <td>{ song.genre }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/show-list" className="btn btn-outline-warning float-left">
                  Show List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Song</h1>
              <p className="lead text-center">
                  View Song Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { Item }
          </div>

          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,song._id)}>Delete Song</button><br />
            </div>

            <div className="col-md-6">
              <Link to={`/edit-song/${song._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Edit Song
              </Link>
              <br />
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default showDetails;
