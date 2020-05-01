import React from 'react';
import { arrayOf, shape, string, object } from 'prop-types';

const Table = ({ data, keys }) => {
  const getHead = () =>
    keys.map(({ displayName, name }) => <th key={name}>{displayName}</th>);

  const getCol = (row) => {
    return keys.map(({ name }) => {
      if (row[name]) {
        return <td key={name}>{row[name]}</td>;
      }
      return null;
    });
  };

  const getRow = () => {
    // eslint-disable-next-line react/no-array-index-key
    return data.map((row, index) => <tr key={index}>{getCol(row)}</tr>);
  };

  return (
    <table>
      <thead>
        <tr>{getHead()}</tr>
      </thead>
      <tbody>{getRow()}</tbody>
    </table>
  );
};

Table.propTypes = {
  keys: arrayOf(
    shape({
      name: string,
      displayName: string,
    })
  ),
  data: arrayOf(object),
};

Table.defaultProps = {
  keys: [],
  data: [],
};

export default Table;
