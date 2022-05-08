/* eslint-disable default-case */
import {
  CLEAR_ALERT,
  SHOW_ALERT,
  USER_LOGIN_BEGIN,
  USER_LOGIN_ERROR,
  USER_LOGIN_SUCCESS,
} from './actions';
export const reducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        showAlert: true,
        alertText: 'Register Succussfully',
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        showAlert: true,
        alertText: action.payload.message,
      };

    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertText: '',
      };
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
        alertText: 'Please provide all the values',
      };
  }
  throw new Error(`no such  ${action.type} action`);
};
