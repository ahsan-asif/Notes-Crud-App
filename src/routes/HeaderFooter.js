import React, {Component} from "react";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import {getUser, logout} from "../actions/userActions";
import {connect} from "react-redux";

class Header extends Component {
  render() {
    return (
      <nav className='navbar navbar-expand-md bg-dark justify-content-center'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            DIARYLOGO
          </Link>
          <button
            type='button'
            className='navbar-toggler'
            data-toggle='collapse'
            data-target='#mynav'
          >
            <span className='navbar-toggler-icon' />
            <span className='navbar-toggler-icon' />
            <span className='navbar-toggler-icon' />
          </button>

          <div className='collapse navbar-collapse' id='mynav'>
            <ul className='navbar-nav '>
              {
                this.props.user === null ? (<li className='nav-item'>
                <Link className='nav-link' to='/login'>
                  Login
                </Link>
              </li>):(<li className='nav-item'>
                <Link className='nav-link' to='/' onClick={()=>this.props.logout()}>
                  Logout
                </Link>
              </li>)
              }

            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.users,
  };
}
export default connect(mapStateToProps, {getUser, logout})(Header);
