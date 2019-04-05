import React, { Component } from 'react';
import './Testdad.css';
import classNames from 'classnames';

class Testdad extends Component {


    render() {
        const {name, onClick} = this.props;

        return (
            <div onClick ={onClick} className= {classNames('Testdad', {
                'Testdad-check' : name.isCheck
            })}>
                <p>{this.props.name.title}</p>
            </div>
        )

    }
}


export default Testdad;