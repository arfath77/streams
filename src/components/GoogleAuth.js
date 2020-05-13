import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '992453597344-7ie7ugq1fevclltd4df3pnlj9espj6vt.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })

        })
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton = () => {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn){
            return (
                <div>
                    <button onClick={this.onSignOutClick} className="ui red google button">
                        <i className="icon google" />
                        SignOut
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button onClick={this.onSignInClick} className="ui red google button">
                        <i className="icon google" />
                        SignIn with Google
                    </button>
            </div>
            )
        }
    }
    render(){
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

const mapToStateProps = (state) => {
    return {isSignedIn:state.auth.isSignedIn};
}

export default connect(mapToStateProps,{signIn,signOut})(GoogleAuth);