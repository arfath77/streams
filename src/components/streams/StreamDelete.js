import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import history from '../../history'
import {deleteStream, fetchStream} from '../../actions';
import Modal from '../Modal';

class StreamDelete extends React.Component {
    componentDidMount () {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderContent = () => {
        if (!this.props.stream) {
            return 'Are you sure you want to delete the Stream?'
        }

        return `Are you sure you want to delete the Stream:${this.props.stream.title}?`
    }

    actionButton = () => {
        const id = this.props.match.params.id
        return (<React-Fragements>
            <button onClick={() => this.props.deleteStream(id)} className="ui button negative">
                delete
            </button>
            <Link to="/" className="ui button">
                Cancel
            </Link>
        </React-Fragements>)
    }

    render() {
        return (
            <Modal 
                title = "Delete Stream"
                content = {this.renderContent()}   
                actions = {this.actionButton()}
                onBackgroundClick = {() => history.push('/')}             
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream,deleteStream})(StreamDelete);