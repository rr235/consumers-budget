import React, { useState, useEffect } from 'react';
import { string, func } from 'prop-types';
import styles from './inputForm.styles.scss';

const InputForm = ({ label, id, onClick, onSubmit, value, onChange }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    setInput(value);
  }, [value]);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        className={styles.input}
        value={input}
        onChange={onChangeHandler}
      />
      <button type="submit" onClick={onClick} className={styles.button}>
        Submit
      </button>
    </form>
  );
};

InputForm.propTypes = {
  label: string.isRequired,
  id: string.isRequired,
  onClick: func,
  onSubmit: func,
};

InputForm.defaultProps = {
  onClick: () => {},
  onSubmit: () => {},
};

export default InputForm;
