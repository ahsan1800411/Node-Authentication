/* eslint-disable default-case */
import {
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
        alertText: 'Login Succussfully',
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        alertText: action.payload.message,
      };
  }
  throw new Error(`no such  ${action.type} action`);
};
