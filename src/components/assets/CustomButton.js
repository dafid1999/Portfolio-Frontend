import React from 'react';
import './CustomButton.scss';

const STYLES = ['btn--primary', 'btn--register', 'btn--login', 'btn--outline'];
const SIZES = ['btn--small', 'btn--medium', 'btn--large'];

export const CustomButton = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
      >
      {children}
    </button>
  );
};