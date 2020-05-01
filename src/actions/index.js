import axios from 'axios';
import { FETCH_CUSTOMERS_DATA, SET_SELECTED_CUSTOMER, UPDATE_CUSTOMER_DATA } from './types';

export const fetchCustomers = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:5000/customers');
    dispatch({
      type: FETCH_CUSTOMERS_DATA,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setSelectedCustomer = (customer) => (dispatch) => {
  dispatch({ type: SET_SELECTED_CUSTOMER, payload: customer });
};

export const updateCustomerBudget = (customer) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:5000/updateBudget', customer);
    data.success = true;
    dispatch({ type: SET_SELECTED_CUSTOMER, payload: data });
    dispatch({ type: UPDATE_CUSTOMER_DATA, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCustomerData = (customer) => (dispatch) => {
  dispatch({ type: UPDATE_CUSTOMER_DATA, payload: customer });
};
