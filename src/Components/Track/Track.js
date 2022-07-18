import React from 'react';
import './Track.css';

class Track extends React.Component {

    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }
 
    render() {
        // @Reviewer the "toggling" logic is not very elegant...is there a better way?
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.props.shouldAdd && <a className="Track-action" onClick={this.addTrack}>+</a>}
                {!this.props.shouldAdd && <a className="Track-action" onClick={this.removeTrack}>-</a>}
            </div>
        )
    }
}

export default Track;
