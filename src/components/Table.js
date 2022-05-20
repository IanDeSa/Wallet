import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class Table extends Component {
  handleClickEdit = (id) => {
    const { wallet: { expenses } } = this.props;
    console.log(typeof expenses[id]);
  }

  handleClickDelete = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  }

  render() {
    const { wallet: { expenses } } = this.props;
    return (
      <main>
        <h3>Table</h3>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {expenses.map((expense) => (
            <tbody key={ expense.id }>
              <tr>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>
                  {(
                    expense.exchangeRates[expense.currency].name.split('/Real Brasileiro')
                  )}
                </td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {expense.value * expense.exchangeRates[expense.currency].ask}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleClickEdit(expense.id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClickDelete(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </main>
    );
  }
}

const mapStateToProps = (state) => state;

Table.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
