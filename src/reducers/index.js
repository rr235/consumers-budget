import { combineReducers } from 'redux';
import customers from './customersReducer';
import selectedCustomer from './selectedCustomerReducer';

export default combineReducers({
  customers,
  selectedCustomer,
});
