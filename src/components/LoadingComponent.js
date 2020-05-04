import React, {Component} from "react";
import {connect} from "react-redux";
import {getNotes} from "../actions/noteActions";
import {getUser} from "../actions/userActions";
import {withRouter} from "react-router-dom";

class LoadingComponent extends Component {

  componentWillMount() {
    const {userLoading, noteLoading} = this.props;
    if (noteLoading === undefined) {
      this.props.getNotes();
    }
    if (userLoading === undefined) {
      this.props.getUser(); 
    }
    
  }
  componentWillReceiveProps(nextProps) {
    // wait for user to get authenticated and try to load user
    if (nextProps.noteLoading === -1 && nextProps.user !== null) {
      this.props.getNotes();
    }
  }
  render() {
    const {userLoading, noteLoading, children, user} = this.props;
    if ((!userLoading && !noteLoading) || user === null) {
      return <div>{children}</div>;
    } else {
      return (
        <div>
          <h2>Loading...</h2>
           </div>
      );
    }
  }
}
function mapStateToProps(state, ownProps) {
  return {
    user: state.users,
    userLoading: state.loading.user,
    noteLoading: state.loading.note,
  };
}
export default withRouter(
  connect(mapStateToProps, {getNotes, getUser})(LoadingComponent)
);
