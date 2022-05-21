export const SAVE_USER = 'SAVE_USER';
export const FETCH_WALLET_SUCESS = 'FETCH_WALLET_SUCESS';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';
export const REQUEST_LOADING = 'REQUEST_LOADING';
export const FETCH_EXCHANGE_RATES_SUCESS = 'FETCH_EXCHANGE_RATES_SUCESS';
export const EXPENSES_LOADING = 'EXPENSES_LOADING';
export const FAILED_EXPENSES = 'FAILED_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SEND_NEW_EXPENSES = 'SEND_NEW_EXPENSES';

export const saveUser = (state) => ({
  type: SAVE_USER,
  payload: {
    email: state.email,
    password: state.password,
  },
});

export const fetchLoading = () => ({
  type: REQUEST_LOADING,
  loading: true,
});

export const receiveCurrencies = (json) => ({
  type: FETCH_WALLET_SUCESS,
  payload: {
    currencies: [...json],
  },
});

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  error,
});

export const fetchWallet = () => async (dispatch) => {
  dispatch(fetchLoading());
  try {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL);
    const resolve = await response.json();
    const currencies = Object.keys(resolve).filter((cur) => !cur.includes('USDT'));
    dispatch(receiveCurrencies(currencies));
  } catch (error) {
    dispatch(requestFailure(error));
  }
};

export const sendExpenses = (state, id, exchangeRates) => ({
  type: FETCH_EXCHANGE_RATES_SUCESS,
  payload: {
    id,
    ...state,
    exchangeRates,
  },
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: {
    id,
  },
});

export const sendNewExpenses = (id, stateEdited) => ({
  type: SEND_NEW_EXPENSES,
  payload: {
    id,
    ...stateEdited,
  },
});

export const fetchExchangeRates = (state, index) => async (dispatch) => {
  dispatch(fetchLoading());
  try {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL);
    const resolve = await response.json();
    delete resolve.USDT;
    dispatch(sendExpenses(state, index, resolve));
  } catch (error) {
    dispatch(requestFailure(error));
  }
};
// https://www.horadecodar.com.br/2020/12/11/remover-propriedade-de-objeto-javascript/
// como eu não achei no course exatamente onde mostra como apagar a chave de um objeto
