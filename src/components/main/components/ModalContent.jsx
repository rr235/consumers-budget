import React, { useState } from 'react';
import { string, shape, number, func } from 'prop-types';
import Modal from '../../core/modal';
import InputForm from '../../core/inputForm';
import { formatCurrencyEUR } from '../../../helper';

const ModalContent = ({ data, onSubmit, onClose, className }) => {
  const [error, setError] = useState();

  const onChangeHandler = (budget, budgetSpent) => {
    setError(budget < budgetSpent ? 'Budget should be more than the budget already spent.' : '');
  };

  return (
    <Modal onClose={onClose}>
      <div className={className}>
        <div>{`Customer name: ${data.name}`}</div>
        <div>{`Budget spent: ${formatCurrencyEUR(data.budget_spent)}`}</div>
      </div>
      <InputForm
        label="Budget"
        id="budget"
        onSubmit={onSubmit}
        onChange={(value) => onChangeHandler(value, data.budget_spent)}
        value={data.budget}
        errorMessage={error}
      />
    </Modal>
  );
};

ModalContent.propTypes = {
  data: shape({
    name: string,
    budget_spent: number,
  }),
  onSubmit: func.isRequired,
  onClose: func.isRequired,
  className: string,
};

ModalContent.defaultProps = {
  data: {},
  className: '',
};

export default ModalContent;
