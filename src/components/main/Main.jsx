import React, { Component } from 'react';
import Table from '../table';
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
    const { data } = this.state;
    const keys = [
      { name: 'id', displayName: 'Id' },
      { name: 'name', displayName: 'Name' },
      { name: 'budget', displayName: 'Budget', formatCurrencyEuro: true },
      {
        name: 'budget_spent',
        displayName: 'Budget Spent',
        formatCurrencyEuro: true,
      },
      { name: 'date_of_first_purchase', displayName: 'Date of first purchase' },
    ];

    return <Table data={data} keys={keys} />;
  }
}

export default Main;
