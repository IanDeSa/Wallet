import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      this.validation();
    });
  }

  handleSubmit = (event) => {
    const { history, dispatch } = this.props;
    event.preventDefault();
    dispatch(saveUser(this.state));
    history.push('/carteira');
  }

  validation = () => {
    const { password, email } = this.state;
    const MIN_LENGTH_PASSWORD = 6;
    if (password.length >= MIN_LENGTH_PASSWORD
      && email.includes('@') && email.includes('.com')) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { disabled, email, password } = this.state;
    return (
      <form onSubmit={ (event) => { this.handleSubmit(event); } }>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ disabled }
        >
          Entrar

        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
