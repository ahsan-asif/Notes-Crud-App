import React, {Component} from "react";
import NoteCard from "./NoteCard";
import _ from "lodash";
import {getNotes, saveNotes, deleteNotes} from "../actions/noteActions";
import {getUser} from "../actions/userActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      title: "",
      body: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      title: this.state.title,
      body: this.state.body,
      uid: this.props.uid,
    };

    this.props.saveNotes(note);
    this.setState({
      title: "",
      body: "",
    });
  };

  displayNotes = () => {
    return _.map(this.props.notes.data, (note, key) => {
      return (
        <NoteCard key={key}>
          <h2>
            <Link to={`/${note.id}`}>{note.title}</Link>
          </h2>
          <p>{note.body}</p>

          {note.uid === this.props.uid && (
            <div>
              <button
                className='btn btn-danger'
                onClick={() => this.props.deleteNotes(note.id)}
              >
                Delete
              </button>
              <button className='btn btn-danger ml-5'>
                <Link to={`/${note.id}/edit`}>Update</Link>
              </button>
            </div>
          )}
        </NoteCard>
      );
    });
  };

  render() {
    return (
      <div className='container'>
        <div className='row text-center'>
          <div className='col-sm-12'>
            <h1>Notes App</h1>
          </div>
          <div className='col-sm-3'>
            <img
              className='img img-responsive img-circle'
              alt=""
              height='100px'
              src={this.props.userData.photoURL}
              style={{padding:'20px', borderRadius:'100%'}}
            />
            <h4> Welcome,<br></br> {this.props.userData.displayName}</h4>
          </div>
          <div className='col-sm-6'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control no-border'
                  name='title'
                  placeholder='Title....'
                  value={this.state.title}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <textarea
                  type='text'
                  className='form-control'
                  name='body'
                  placeholder='Body....'
                  value={this.state.body}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <button className='btn btn-primary col-sm-12'>Submit</button>
              </div>
            </form>
            {this.displayNotes()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownprops) {
  return {
    notes: state.notes,
    uid: state.users.uid,
    userData: state.users,
  };
}
export default connect(mapStateToProps, {
  getNotes,
  saveNotes,
  deleteNotes,
  getUser,
})(App);
