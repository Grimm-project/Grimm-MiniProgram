import {ACTION_TYPES} from '../actions/actionTypes.js'

const account = (state = [], action) => {
    switch (action.type) {
      case ACTION_TYPES.ACCOUNT_LOGIN:
        return {
          ...state,
          user: action.user
        };
      case ACTION_TYPES.ACCOUNT_LOGOUT:
        return {
          ...state,
          user: {}
        };
      case ACTION_TYPES.ACCOUNT_RESET:
        return {
          ...state,
          accountId: action.accountId
        }
      default:
        return state;
    }
  }
  
  export default account;