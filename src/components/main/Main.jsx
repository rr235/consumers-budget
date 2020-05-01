import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './main.styles.scss';
import Table from '../core/table';
import ModalContent from './components/ModalContent';
import {
  fetchCustomers as fetchCustomersAction,
  setSelectedCustomer as setSelectedCustomerAction,
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
  };

  onSubmitHandler = (value) => {
    console.log(value);
  };

  onBudgetChangeHandler = (budget, minBudget) => {
    console.log(budget, minBudget);
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
            onChange={this.onBudgetChangeHandler}
            onClose={this.onModalCloseHandler}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ customers, selectedCustomer }) => ({
  customers,
  selectedCustomer,
});

export default connect(mapStateToProps, {
  fetchCustomers: fetchCustomersAction,
  setSelectedCustomer: setSelectedCustomerAction,
})(Main);
