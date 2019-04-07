import React, { Component } from 'react';
import './Testdad.css';
import classNames from 'classnames';

import checkIcon from './icon/checkdone.png';
import uncheckIcon from './icon/uncheck.png';

class Testdad extends Component {



    render() {
        const {name, onClick, status} = this.props;


        let url = uncheckIcon;
        if(name.isCheck){
            url = checkIcon;
        }

        if(status === 'all'){
            return (
                <div onClick ={onClick} className= {classNames('Testdad', {
                    'Testdad-check' : name.isCheck
                })}>
                    
                   <p>{this.props.name.title}</p>
                    <img src={url} alt=""/>
                </div>
            )
    
        }

        if(status === 'finish'){
            return (
                <div  className = 'Testdad Testdad-finish' >
                    <p>{this.props.name.title}</p>
                </div>
            )
    
        }



        if(status === 'unfinish'){
            return (
                <div className = 'Testdad Testdad-unfinish' disable>
                    <p>{this.props.name.title}</p>
                </div>
            )
    
        }



        if(status === 'nothing'){
            return (
                <div className = 'Testdad Testdad-nothing' disable>
                    <p>{this.props.name.title}</p>
                </div>
            )
    
        }
    }
}


export default Testdad;