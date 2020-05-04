import React, {Component} from "react";
import {connect} from "react-redux";
import SubmitComment from "./SubmitComment";
import Comment from "./Comment";
import {getComments} from "../actions/noteActions";
// import _ from "lodash";

class DetailNote extends Component {
 
  
  componentDidMount() {
    this.props.getComments(this.props.match.params.id);
    console.log(12);
  }

  renderComment = () => {
    console.log("redener",this.props.comments);
    const {comments}= this.props;
    console.log(comments);
    return(
      // comments.forEach(item=>{
      //   console.log(item);
      // })
    // comments.map((com,key)=>{
    //     console.log(0);
    //     return(
    //       <div key={key}> 
    //      <div><b>Comment:</b> {com.commentBody}</div> 
    //       <div> <b>User ID:</b> {com.uid}</div>
    //       </div>
    //     );
    //   })
    <div>s</div>
    );
  };

  render() {
    let note = {};
    const {notes} = this.props;
    notes.map((item) => {
      if (item.id === this.props.match.params.id) {
        note = item;
      }
    });
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6 offset-sm-3 mt-3'>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <SubmitComment id={this.props.match.params.id} />
            <Comment>
            {this.renderComment()}
            </Comment>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    notes: state.notes.data,
    comments: state.notes.comments,
    uid: state.users.uid,
  };
}

export default connect(mapStateToProps, {getComments})(DetailNote);
