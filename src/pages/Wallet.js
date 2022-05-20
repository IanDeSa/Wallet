import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchWallet, fetchExchangeRates } from '../actions';
import Table from '../components/Table';

const tagDefault = 'Alimentação';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: tagDefault,
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWallet(this.state));
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, wallet: { expenses } } = this.props;
    const index = expenses.length;
    dispatch(fetchExchangeRates(this.state, index));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: tagDefault,
    });
  }

  render() {
    const { value, description } = this.state;
    const { wallet: { currencies } } = this.props;
    return (
      <section>
        <Header />
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="value-input-id">
            Valor:
            <input
              type="number"
              id="value-input-id"
              data-testid="value-input"
              name="value"
              value={ value }
              required
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
              required
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select id="currency" name="currency" onChange={ this.handleChange }>
              {(Object.values(currencies).map(
                (code, index) => <option key={ index } value={ code }>{code}</option>,
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento:
            <select
              data-testid="method-input"
              id="method"
              name="method"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              onChange={ this.handleChange }
            >
              <option value={ tagDefault }>{ tagDefault }</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="submit"
          >
            Adicionar despesa
          </button>
        </form>
        <Table />
      </section>
    );
  }
}

const mapStateToProps = (state) => state;

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
    expenses: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default connect(mapStateToProps)(Wallet);
