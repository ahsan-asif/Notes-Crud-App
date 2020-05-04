import React, {Component} from "react";
import {updateNote} from "../actions/noteActions";
import {connect} from "react-redux";

class EditNote extends Component {
  constructor(props) {
    super();
    this.state = {
      title: "",
      body: "",
    };
  }
  componentDidMount() {
    let note = {};
    this.props.notes.map((item) => {
      if (item.id === this.props.match.params.id) {
        note = item;
      }
    });
    this.setState({
      title: note.title,
      body: note.body,
    });
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
    this.props.updateNote(this.props.match.params.id,note);
    this.setState({
      title: "",
      body: "",
    });
    this.props.history.push('/');
  };

  render() {
    return (
      <div className='container'>
        <div className='row text-center'>
          <div className='col-sm-12'>
            <h1>Update Note</h1>
          </div>
          <div className='col-sm-6 offset-sm-3'>
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
                <button className='btn btn-primary col-sm-12'>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownprops) {
  return {
    notes: state.notes.data,
    uid: state.users.uid,
  };
}
export default connect(mapStateToProps, {updateNote})(EditNote);
