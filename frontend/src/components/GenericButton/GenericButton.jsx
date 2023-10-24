import React from 'react';

const GenericButton = ({ 
    content, 
    backgroundColor, 
    textColor, 
    width, 
    height, 
    hover,
    border,
    onClick,
    disabled,
}) => {
    return (
        <button type='button' disabled={disabled} onClick={onClick} className={`${backgroundColor} ${textColor} ${width} ${height} ${hover} ${border} rounded-lg`}>{content}</button>
    );
};

export default GenericButton;