import { FETCH_CUSTOMERS_DATA, UPDATE_CUSTOMER_DATA } from '../actions/types';

const getDataWithBudgetLeft = (data) =>
  data.map((item) => {
    const budgetLeft = item.budget - item.budget_spent;
    return Object.assign(item, { budget_left: budgetLeft });
  });

const updateCustomerData = (customerData, customersList) => {
  const index = customersList.findIndex(({ id }) => id === customerData.id);
  if (index > -1) {
    const updatedList = [...customersList];
    updatedList[index] = customerData;
    updatedList[index].budget_left = updatedList[index].budget - updatedList[index].budget_spent;
    return updatedList;
  }
  return customersList;
};

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_CUSTOMERS_DATA:
      return getDataWithBudgetLeft(action.payload);
    case UPDATE_CUSTOMER_DATA:
      return updateCustomerData(action.payload, state);
    default:
      return state;
  }
}
