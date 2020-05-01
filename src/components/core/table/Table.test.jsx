import React from 'react';
import renderer from 'react-test-renderer';
import Table from './Table';

const data = [
  { col1: 'row1', cole2: 'row1', cole3: 'row1' },
  { col1: 'row2', cole2: 'row2', cole3: 'row2' },
  { col1: 'row3', cole2: 'row3', cole3: 'row3' },
];

const keys = [
  { name: 'col1', displayName: 'Column 1' },
  { name: 'col3', displayName: 'Column 3' },
];

describe('Table', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Table data={data} keys={keys} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
