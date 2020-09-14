import { FETCH_PRODUCTS, NEW_USER } from '../actions/types';

const initialState = {
  user:{},
  products: [],

};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        users: action.payload
      };
    case NEW_USER:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
}
