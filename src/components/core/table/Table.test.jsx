import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
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
  let component;
  beforeAll(() => {
    component = shallow(<Table data={data} keys={keys} />);
  });

  it('should render correctly', () => {
    const tree = renderer.create(<Table data={data} keys={keys} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show correct number of columns', () => {
    expect(component.find('th')).toHaveLength(2);
  });

  it('should show correct columns', () => {
    const columnHeadings = component.find('th');
    expect(columnHeadings.at(0).text()).toBe('Column 1');
    expect(columnHeadings.at(1).text()).toBe('Column 3');
  });

  it('should show correct number of rows', () => {
    expect(component.find('tr')).toHaveLength(3 + 1); // +1 to account for heading row
  });
});
