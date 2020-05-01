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
    ];

    return <Table data={data} keys={keys} />;
  }
}

export default Main;
