import React from 'react'
import PropTypes from 'prop-types'


const Header = (props) => {
    return (
        <header className='header'>
            <h1>{(props.name) ? <>{props.title} By {props.name}</> : props.title}</h1>
        </header>
    )
}

// Sets default props if no props are passed into Header when it's called.
Header.defaultProps = {
    title: 'Task Tracker'
};

// This is optional, it makes sure that only values of the specified type are passed to the component.
// Wrong types will still render, but will cause an error to be desplayed in the console.
Header.propTypes = {
    title: PropTypes.string
};

export default Header
