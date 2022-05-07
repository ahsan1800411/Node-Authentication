import { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';
import axios from 'axios';
import {
  USER_LOGIN_BEGIN,
  USER_LOGIN_ERROR,
  USER_LOGIN_SUCCESS,
} from './actions';

export const AppContext = createContext();

const initialState = {
  user: null,
  token: null,
  alertText: '',
  loading: false,
  message: '',
};

export const AppProvider = ({ children }) => {
  const registerUser = async (userData) => {
    dispatch({ type: USER_LOGIN_BEGIN });
    try {
      const { data } = await axios.post('/api/auth/register', userData);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_LOGIN_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ ...state, registerUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
