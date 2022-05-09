import { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';
import axios from 'axios';
import {
  CLEAR_ALERT,
  SHOW_ALERT,
  USER_LOGIN_BEGIN,
  USER_LOGIN_ERROR,
  USER_LOGIN_SUCCESS,
} from './actions';

export const AppContext = createContext();

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  token: token ? token : null,
  alertText: '',
  loading: false,
  showAlert: false,
};

export const AppProvider = ({ children }) => {
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 1000);
  };

  const alertShown = () => {
    dispatch({ type: SHOW_ALERT });
    clearAlert();
  };

  const registerUser = async (userData) => {
    dispatch({ type: USER_LOGIN_BEGIN });
    try {
      const { data } = await axios.post('/api/auth/register', userData);

      const { user, token } = data;
      dispatch({ type: USER_LOGIN_SUCCESS, payload: { user, token } });
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } catch (error) {
      dispatch({
        type: USER_LOGIN_ERROR,
        payload: { message: error.response.data.message },
      });
    }
    clearAlert();
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ ...state, registerUser, alertShown }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
