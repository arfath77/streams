import React from 'react';
import {editStream, fetchStream} from '../../actions';
import { connect } from 'react-redux';

import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

    componentDidMount () {
        console.log('in component did mount');
        
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render() {
        if (!this.props.stream){
            return <div>Hang Tight content is being Rendered</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm onSubmit={this.onSubmit}  
                    initialValues={{title: this.props.stream.title, description: this.props.stream.description}}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {editStream, fetchStream})(StreamEdit);