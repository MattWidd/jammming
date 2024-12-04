import React from 'react';
import './Track.css';

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
    const handleAdd = () => onAdd(track);
    const handleRemove = () => onRemove(track);
  
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{track.name}</h3>
          <p>{track.artist} | {track.album}</p>
        </div>
        {isRemoval ? (
          <button onClick={handleRemove}>REMOVE</button>
        ) : (
          <button onClick={handleAdd}>ADD</button>
        )}
      </div>
    );
  };
  
  export default Track;