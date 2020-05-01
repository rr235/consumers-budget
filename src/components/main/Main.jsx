import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './main.styles.scss';
import Table from '../core/table';
import Modal from '../core/modal';
import InputForm from '../core/inputForm';
import { formatCurrencyEUR } from '../../helper';
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

  modalCloseHandler = () => {
    this.setState({ showModal: false });
  };

  onSubmitHandler = (value) => {
    console.log(value);
  };

  onBudgetChangeHandler = (budget, minBudget) => {
    console.log(budget, minBudget);
  };

  getModalContent = () => {
    const { selectedCustomer } = this.props;
    return (
      <Modal onClose={this.modalCloseHandler}>
        <div className={styles.modalContent}>
          <div>{`Name: ${selectedCustomer.name}`}</div>
          <div>{`Total Budget: ${formatCurrencyEUR(selectedCustomer.budget)}`}</div>
          <div>{`Budget Spent: ${formatCurrencyEUR(selectedCustomer.budget_spent)}`}</div>
        </div>
        <InputForm
          label="Budget"
          id="budget"
          onSubmit={this.onSubmitHandler}
          onChange={(value) => this.onBudgetChangeHandler(value, selectedCustomer.budget_spent)}
          className={styles.employerSalary}
          value={selectedCustomer.budget}
        />
      </Modal>
    );
  };

  render() {
    // TODO: calculate budget_left
    const { customers } = this.props;
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
        {showModal && this.getModalContent()}
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
