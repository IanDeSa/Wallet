import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalExpenseCalculator = () => {
    const { wallet: { expenses } } = this.props;
    const totalExpenses = expenses.reduce((acc, cur) => {
      const { value, currency, exchangeRates } = cur;
      const convertBRL = value * exchangeRates[currency].ask;
      return acc + convertBRL;
    }, 0);
    return totalExpenses.toFixed(2);
  }

  render() {
    const { user } = this.props;
    return (
      <header>
        <div>
          <h3>Trybe</h3>
        </div>
        <div>
          <span data-testid="email-field">{user.email}</span>
        </div>
        <div>
          <label htmlFor="totalField">
            Despesa Total: R$
            <span
              id="totalField"
              data-testid="total-field"
            >
              { this.totalExpenseCalculator() }

            </span>
            <span data-testid="header-currency-field"> BRL</span>
          </label>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => state;

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
