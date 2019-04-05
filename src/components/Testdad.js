import React, { Component } from 'react';
import './Testdad.css';
import classNames from 'classnames';

class Testdad extends Component {


    render() {
        const {name, onClick, status} = this.props;

        if(status === 'all'){
            return (
                <div onClick ={onClick} className= {classNames('Testdad', {
                    'Testdad-check' : name.isCheck
                })}>
                    <p>{this.props.name.title}</p>
                </div>
            )
    
        }

        if(status === 'finish'){
            return (
                <div onClick ={onClick} className = 'Testdad Testdad-finish' disable>
                    <p>{this.props.name.title}</p>
                </div>
            )
    
        }



        if(status === 'unfinish'){
            return (
                <div onClick ={onClick} className = 'Testdad Testdad-unfinish' disable>
                    <p>{this.props.name.title}</p>
                </div>
            )
    
        }
    }
}


export default Testdad;