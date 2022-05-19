import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      expenses: 0,
    };
  }

  render() {
    const { user } = this.props;
    const { expenses } = this.state;
    return (
      <header>
        <div>
          <h3>Trybe</h3>
        </div>
        <div>
          <h3 data-testid="email-field">{user.email}</h3>
        </div>
        <div>
          <h3 data-testid="total-field">{ expenses }</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};
