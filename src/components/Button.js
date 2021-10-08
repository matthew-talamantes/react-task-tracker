import React from 'react'

const Button = (props) => {

    const onClick = () => {
        window.alert("I've Been Clicked!")
    };

    return (
        <button onClick={onClick} className='btn' style={{ backgroundColor: props.color}}>{props.text}</button>
    )
}

Button.defaultProps = {
    text: 'Submit',
    color: 'grey'
};

export default Button
