import React from "react";
import "./LoadingSpinner.scss";

const SIZES = ['spin--small', 'spin--medium', 'spin--large'];

export const LoadingSpinner = ({
  spinnerSize,
}) => {
  const checkSpinnerSize = SIZES.includes(spinnerSize) ? spinnerSize : SIZES[0];

  return (
    <div className="spinner-container">
      <div className={`loading-spinner ${checkSpinnerSize}`}>
      </div>
    </div>
  );
};