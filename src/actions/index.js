import { FETCH_CUSTOMERS_DATA } from './types';
import mockData from '../mockData';

// eslint-disable-next-line import/prefer-default-export
export const fetchCustomers = () => async (dispatch) => {
  const data = mockData;
  dispatch({
    type: FETCH_CUSTOMERS_DATA,
    payload: data,
  });
};
