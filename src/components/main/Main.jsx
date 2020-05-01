import React, { Component } from 'react';
import { func, shape, number, string, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import styles from './main.styles.scss';
import Table from '../core/table';
import ModalContent from './components/ModalContent';
import {
  fetchCustomers as fetchCustomersAction,
  setSelectedCustomer as setSelectedCustomerAction,
  updateCustomerBudget as updateCustomerBudgetAction,
  updateCustomerData as updateCustomerDataAction,
} from '../../actions';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    const { fetchCustomers } = this.props;

    fetchCustomers();
  }

  rowClickHandler = (data) => {
    const { setSelectedCustomer } = this.props;
    this.setState({ showModal: true });
    setSelectedCustomer(data);
  };

  onModalCloseHandler = () => {
    this.setState({ showModal: false });
    const { updateCustomerData, selectedCustomer, setSelectedCustomer } = this.props;
    delete selectedCustomer.success;
    updateCustomerData(selectedCustomer);
    setSelectedCustomer({});
  };

  onSubmitHandler = (value) => {
    const { selectedCustomer, updateCustomerBudget } = this.props;
    updateCustomerBudget({ newBudget: value, id: selectedCustomer.id });
  };

  render() {
    const { customers, selectedCustomer } = this.props;
    const { showModal } = this.state;
    const keys = [
      { name: 'name', displayName: 'Company Name' },
      {
        name: 'date_of_first_purchase',
        displayName: 'Date of First Purchase',
      },
      { name: 'budget', displayName: 'Total Budget', formatCurrencyEuro: true },
      {
        name: 'budget_spent',
        displayName: 'Budget Spent',
        formatCurrencyEuro: true,
      },
      {
        name: 'budget_left',
        displayName: 'Budget Left',
        formatCurrencyEuro: true,
      },
    ];

    return (
      <div className={styles.main}>
        <Table data={customers} keys={keys} onRowClick={this.rowClickHandler} />
        {showModal && (
          <ModalContent
            data={selectedCustomer}
            className={styles.modalContent}
            onSubmit={this.onSubmitHandler}
            onClose={this.onModalCloseHandler}
          />
        )}
        {selectedCustomer.success && (
          <div className={styles.successMessage}>Data Updated Successfully</div>
        )}
      </div>
    );
  }
}

const customerShape = shape({
  id: number,
  name: string,
  budget: number,
  budget_spent: number,
  budget_left: number,
  date_of_first_purchase: string,
});

Main.propTypes = {
  fetchCustomers: func.isRequired,
  setSelectedCustomer: func.isRequired,
  updateCustomerBudget: func.isRequired,
  updateCustomerData: func.isRequired,
  selectedCustomer: customerShape,
  customers: arrayOf(customerShape),
};

Main.defaultProps = {
  selectedCustomer: {},
  customers: [],
};

const mapStateToProps = ({ customers, selectedCustomer }) => ({
  customers,
  selectedCustomer,
});

export default connect(mapStateToProps, {
  fetchCustomers: fetchCustomersAction,
  setSelectedCustomer: setSelectedCustomerAction,
  updateCustomerBudget: updateCustomerBudgetAction,
  updateCustomerData: updateCustomerDataAction,
})(Main);
