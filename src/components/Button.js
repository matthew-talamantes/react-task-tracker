import React from 'react'

const Button = (props) => {
    return (
        <button className='btn'>{props.title}</button>
    )
}

Button.defaultProps = {
    title: 'Submit'
};

export default Button
