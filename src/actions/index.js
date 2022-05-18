export const SAVE_USER = 'SAVE_USER';
export const VIEW_WALLET = 'VIEW_WALLET';

export const saveUser = (state) => ({
  type: SAVE_USER,
  payload: {
    email: state.email,
    password: state.password,
  },
});

export const viewWallet = (state) => ({
  type: VIEW_WALLET,
  payload: {
    currencies: state.currencies,
    expenses: state.expenses,
  },
});
