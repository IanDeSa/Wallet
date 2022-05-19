import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import viewWallet from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(viewWallet());
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { value, description } = this.state;
    const { wallet: { currencies } } = this.props;
    console.log(currencies);
    return (
      <section>
        <Header />
        <form>
          <label htmlFor="value-input-id">
            Valor:
            <input
              type="number"
              id="value-input-id"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description-input-id">
            Descrição:
            <input
              type="text"
              id="description-input-id"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="select-codes">
            Moeda:
            <select id="select-codes">
              {(Object.values(currencies).map(
                (code, index) => <option key={ index }>{code}</option>,
              ))}
            </select>
          </label>
          <label htmlFor="select-method">
            Método de Pagamento:
            <select data-testid="method-input" id="select-method">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="select-category">
            Método de Pagamento:
            <select data-testid="tag-input" id="select-category">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
