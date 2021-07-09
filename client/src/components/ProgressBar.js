import React, { Component }  from 'react';

import '../styles/Results.css'

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
    <div className="div-1">
        <div className = "progressbar">
            <div style={fillerStyles}>
            <span style={labelStyles}>{`${completed}%`}</span>
            </div>
        </div>
    </div>
    );
  };
  
  export default ProgressBar;