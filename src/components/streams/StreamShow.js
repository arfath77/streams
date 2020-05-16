import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import {fetchStream} from '../../actions';

class StreamShow extends React.Component {
    constructor (props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
        this.renderPlayer();
    }

    componentDidUpdate () {
        this.renderPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    renderPlayer = () => {
        if (!this.props.stream || this.player){
            return 
        }

        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${this.props.match.params.id}.flv`
        });

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    renderContent = () => {
        if (!this.props.stream){
            return <div>Looding...</div>
        }

        return (
            <div>
                <video ref={this.videoRef} style={{width:'100%'}} controls/>
                <div>
                    <h1>{this.props.stream.title}</h1>
                    <h5>{this.props.stream.description}</h5>
                </div>  
            </div>
        )
    }

    render() {
        return (
            <div>{this.renderContent()}</div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {stream:state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);