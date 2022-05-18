import { VIEW_WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case VIEW_WALLET:
    return {
      ...state,
      currencies: [action.payload],
      expenses: [action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
