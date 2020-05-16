import React from 'react';
import {connect} from 'react-redux';
import {createStream} from '../../actions';
import StreamForm from './StreamForm';
// import Modal from '../Modal';
// import history from '../../history';
// import GoogleAuth from '../GoogleAuth';

class StreamCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }

    renderContent = () => {
        // if (!this.props.isSignedIn){
        //     return (
        //         <Modal 
        //             title="Login Alert!!!"
        //             content="Please login to use this feature"
        //             // actions={<GoogleAuth/>}
        //             onBackgroundClick={()=> history.push('/')}
        //         />
        //     )
        // }

        return (
            <div className="ui container">
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
        )
    }

    render() {
        return (
            <div>{this.renderContent()}</div>
        )
    }
    
}

const mapStateToProps = state => {
    return {isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps, {createStream})(StreamCreate);
