import React, {Component} from "react";
import {connect} from "react-redux";
import {saveComment} from "../actions/noteActions";

class SubmitComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBody: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      commentBody: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      uid: this.props.uid,
      commentBody: this.state.commentBody,
    };
    this.props.saveComment(this.props.id, comment);
    this.setState({commentBody: ""});
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <textarea
            type='textarea'
            name='commentBody'
            className='form-control'
            placeholder='Wrtie Comment....'
            value={this.state.commentBody}
            onChange={this.handleChange}
            required
          ></textarea>
        </div>
        <div className='form-group'>
          <button className='btn btn-success'>Add Comment</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    uid: state.users.uid,
  };
}

export default connect(mapStateToProps, {saveComment})(SubmitComment);
