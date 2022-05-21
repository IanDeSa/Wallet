import {
  FETCH_WALLET_SUCESS,
  REQUEST_FAILURE,
  REQUEST_LOADING,
  FETCH_EXCHANGE_RATES_SUCESS,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SEND_NEW_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: null,
  loading: false,
  edit: false,
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
  case EDIT_EXPENSE:
    return {
      ...state,
      edit: true,
      selectId: action.payload.id,
    };
  case SEND_NEW_EXPENSES:
    return {
      ...state,
      edit: false,
      expenses: [...state.expenses].map((expense) => (
        expense.id === action.payload.id ? { ...expense, ...action.payload } : expense
      )),
    };
  default:
    return state;
  }
};

export default wallet;
