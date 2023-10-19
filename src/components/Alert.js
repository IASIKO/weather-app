import React from "react";
import "./Alert.css";

const Alert = ({ error }) => {
  return (
    <div className="alertContainer">
      <div className="alert">
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Alert;
