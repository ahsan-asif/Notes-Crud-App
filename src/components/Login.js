import React, {Component} from "react";
import {connect} from "react-redux";
import {googleLogin, twitterLogin} from "../actions/userActions";

class Login extends Component {
  // if you go any component and you will validate any condition before component show then your code will come in below component
  componentWillMount() {
    if (this.props.user !== null) {
      this.props.history.push("/");
    }
  }

  //this type of componet will render automatically whern ever props are updated.
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== null) {
      nextProps.history.push("/");
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row text-center'>
          <div className='col-sm-12'>
            <div className='jumbotron'>
              <h1>DIARY | {new Date().getFullYear()}</h1>
              <h3>
                <i>
                  Login with your favorite <b>Socail Network</b> to start
                  writing!
                </i>
              </h3>
            </div>
          </div>
          <div className='col-sm-6'>
            <button
              className='btn btn-danger btn-lg'
              onClick={this.props.googleLogin}
            >
              Login with Google
            </button>
          </div>
          <br />
          <div className='col-sm-6'>
            <button
              className='btn btn-primary btn-lg'
              onClick={this.props.twitterLogin}
            >
              Login with Twitter
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.users,
  };
}

export default connect(mapStateToProps, {googleLogin, twitterLogin})(Login);
