import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Card = (props) => {
    const song = props.song;

    return(
        <div className="card-container">
            <img src="public/assets/img/img1.png" alt="" />
            <div className="album">
                <h2>
                    <Link to={`/show-song/${song._id}`}>
                        { song.title }
                    </Link>
                </h2>
                <h3>{song.artist}</h3>
                <p>{song.album}</p>
            </div>
        </div>
        )
    };
    
    export default Card;