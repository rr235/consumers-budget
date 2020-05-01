import React, { Component } from 'react';
import styles from './main.styles.scss';
import Table from '../core/table';
import Modal from '../core/modal';
import InputForm from '../core/inputForm';
import { formatCurrencyEUR } from '../../helper';

import mockData from '../../mockData';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalData: {},
      showModal: false,
    };
  }

  componentDidMount() {
    this.setState({ data: mockData });
  }

  rowClickHandler = (data) => {
    this.setState({ modalData: data, showModal: true });
  };

  modalCloseHandler = () => {
    this.setState({ modalData: {}, showModal: false });
  };

  onSubmitHandler = (value) => {
    console.log(value);
  };

  onBudgetChangeHandler = (budget, minBudget) => {
    console.log(budget, minBudget);
  };

  getModalContent = () => {
    const { modalData } = this.state;
    return (
      <Modal onClose={this.modalCloseHandler}>
        <div className={styles.modalContent}>
          <div>{`Name: ${modalData.name}`}</div>
          <div>{`Total Budget: ${formatCurrencyEUR(modalData.budget)}`}</div>
          <div>{`Budget Spent: ${formatCurrencyEUR(modalData.budget_spent)}`}</div>
        </div>
        <InputForm
          label="Budget"
          id="budget"
          onSubmit={this.onSubmitHandler}
          onChange={(value) => this.onBudgetChangeHandler(value, modalData.budget_spent)}
          className={styles.employerSalary}
          value={modalData.budget}
        />
      </Modal>
    );
  };

  render() {
    // TODO: calculate budget_left
    const { data, showModal } = this.state;
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
        <Table data={data} keys={keys} onRowClick={this.rowClickHandler} />
        {showModal && this.getModalContent()}
      </div>
    );
  }
}

export default Main;
