export const SAVE_USER = 'SAVE_USER';
export const VIEW_WALLET = 'VIEW_WALLET';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const saveUser = (state) => ({
  type: SAVE_USER,
  payload: {
    email: state.email,
    password: state.password,
  },
});

export const receiveCurrencies = (json) => ({
  type: VIEW_WALLET,
  payload: {
    currencies: [...json],
  },
});

export const viewWallet = () => async (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const resolve = await response.json();
  const currencies = Object.keys(resolve).filter((cur) => !cur.includes('USDT'));
  dispatch(receiveCurrencies(currencies));
};
