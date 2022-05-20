import {
  FETCH_WALLET_SUCESS,
  REQUEST_FAILURE,
  REQUEST_LOADING,
  FETCH_EXCHANGE_RATES_SUCESS,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: null,
  loading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_WALLET_SUCESS:
    return {
      ...state,
      currencies: action.payload.currencies,
      error: null,
      loading: false,
    };
  case REQUEST_LOADING:
    return {
      ...state,
      loading: true,
    };
  case REQUEST_FAILURE:
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  case FETCH_EXCHANGE_RATES_SUCESS:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses].filter((expense) => expense.id !== action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
