import React from 'react'

const Button = (props) => {

    return (
        <button onClick={props.onClick} className='btn' style={{ backgroundColor: props.color}}>{props.text}</button>
    )
}

Button.defaultProps = {
    text: 'Submit',
    color: 'grey'
};

export default Button
