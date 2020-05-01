import React, { useRef, useEffect } from 'react';
import { node, func } from 'prop-types';
import styles from './modal.styles.scss';

const Modal = ({ children, onClose }) => {
  const refModal = useRef(null);

  useEffect(() => {
    // adds no-scroll on component mount
    document.body.classList.add(styles.noScroll);

    // removes no-scroll on component mount
    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, []);

  // fires close event on background click
  const backgroundClickHandler = (e) => {
    if (e.target.contains(refModal.current)) {
      onClose();
    }
  };

  return (
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    <div
      role="dialog"
      aria-modal="true"
      className={styles.background}
      onClick={backgroundClickHandler}
      ref={refModal}
    >
      <div className={styles.modal}>
        <button type="button" onClick={onClose} className={styles.closeButton}>
          X
        </button>
        {children}
      </div>
    </div>
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
    /* eslint-enable jsx-a11y/click-events-have-key-events */
  );
};

Modal.propTypes = {
  children: node.isRequired,
  onClose: func.isRequired,
};

export default Modal;
