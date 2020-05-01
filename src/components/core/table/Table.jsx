import React from 'react';
import { arrayOf, shape, string, object, bool, func } from 'prop-types';
import styles from './table.styles.scss';
import { formatCurrencyEUR } from '../../../helper';

const Table = ({ data, keys, onRowClick }) => {
  const getHead = () => keys.map(({ displayName, name }) => <th key={name}>{displayName}</th>);

  const getCol = (row) => {
    return keys.map(({ name, formatCurrencyEuro }) => {
      if (row[name]) {
        let value = row[name];
        if (formatCurrencyEuro) {
          value = formatCurrencyEUR(value);
        }

        return <td key={name}>{value}</td>;
      }
      return null;
    });
  };

  const getRow = () => {
    return data.map((row, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <tr key={index} onClick={() => onRowClick(row)} tabIndex="0">
        {getCol(row)}
      </tr>
    ));
  };

  return (
    <table className={styles.table}>
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
      formatCurrencyEuro: bool,
    })
  ),
  data: arrayOf(object),
  onRowClick: func,
};

Table.defaultProps = {
  keys: [],
  data: [],
  onRowClick: () => {},
};

export default Table;
