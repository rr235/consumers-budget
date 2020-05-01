import { SET_SELECTED_CUSTOMER } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case SET_SELECTED_CUSTOMER:
      return action.payload;
    default:
      return state;
  }
}
