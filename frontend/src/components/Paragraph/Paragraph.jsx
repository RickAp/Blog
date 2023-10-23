import React from "react";

const Paragraph = ({
    content,
    color = 'black', 
    size = 'md',
    fontWeight = 'font-[400]',     
    textAlign = 'center', 
}) => {

    const textSizeMap = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
        xxl: 'text-2xl',
        xxxl: 'text-4xl',
    };

    const textSizeClass = textSizeMap[size];

    return (
        <p 
            className={`${color} ${textSizeClass} ${fontWeight} text-${textAlign}`}
        >
            {content}
        </p>
    );
};

export default Paragraph;