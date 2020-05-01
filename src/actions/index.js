import axios from 'axios';
import { FETCH_CUSTOMERS_DATA, SET_SELECTED_CUSTOMER } from './types';

const getDataWithBudgetLeft = (data) =>
  data.map((item) => {
    const budgetLeft = item.budget - item.budget_spent;
    return Object.assign(item, { budget_left: budgetLeft });
  });

export const fetchCustomers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/customers`);
    dispatch({
      type: FETCH_CUSTOMERS_DATA,
      payload: getDataWithBudgetLeft(data),
    });
  } catch (error) {
    console.log(error);
  }
};

export const setSelectedCustomer = (customer) => (dispatch) => {
  dispatch({ type: SET_SELECTED_CUSTOMER, payload: customer });
};
