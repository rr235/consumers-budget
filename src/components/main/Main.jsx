import React, { Component } from 'react';
import styles from './main.styles.scss';
import Table from '../core/table';

import mockData from './mockData';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.setState({ data: mockData });
  }

  render() {
    // TODO: calculate budget_left
    const { data } = this.state;
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
        <Table data={data} keys={keys} />
      </div>
    );
  }
}

export default Main;
