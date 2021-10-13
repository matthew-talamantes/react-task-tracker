import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {

    return (
        <button onClick={props.onClick} className='btn' style={{ backgroundColor: props.color}}>{props.text}</button>
    )
}

Button.defaultProps = {
    text: 'Submit',
    color: 'grey'
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string,
    text: PropTypes.string
};

export default Button
