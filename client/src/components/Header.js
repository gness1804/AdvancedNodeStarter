import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RightLinks from './RightLinks';

class Header extends Component {
  renderContent() {
    const { auth } = this.props;
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href={'/auth/google'} className="login-link">Login With Google</a>
          </li>
        );
      default:
        return <RightLinks />;
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <nav className="indigo">
        <div className="nav-wrapper">
          <Link
            to={auth ? '/blogs' : '/'}
            className="left brand-logo"
            style={{ marginLeft: '10px' }}
          >
            Blogster
          </Link>
          {auth ? <p style={{ position: 'absolute', left: '300px' }}>Logged is as: {auth.displayName}</p> : ''}
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
