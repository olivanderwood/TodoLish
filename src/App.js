import React, { Component } from 'react';
import './App.css';
import Testdad from './components/Testdad';
import {Container, Col, Row, Input, Button, UncontrolledTooltip} from 'reactstrap';
import classNames from 'classnames';


import logoDelete from './components/icon/delete.png';


class App extends Component {
  constructor (){
    super ();
    this.state = {
    displayStatus:'all', //finish, unfinish
    inputText: '',
    itemList : []
  }

  this.onKeyUp = this.onKeyUp.bind(this);
  this.onChange = this.onChange.bind(this);
  this.onDelButtonClick = this.onDelButtonClick.bind(this);

  this.changeStatusAll = this.changeStatusAll.bind(this);
  this.changeStatusFinish = this.changeStatusFinish.bind(this);
  this.changeStatusUnFinish = this.changeStatusUnFinish.bind(this);

}

  componentWillMount(){
    
    var listNew = JSON.parse(localStorage.getItem('key'))
    if(listNew.length < 1){
      let start = [];
      localStorage.setItem('key', JSON.stringify(start))
    }
    this.setState({
        itemList : listNew,
    })
  }
  


  componentDidUpdate(){
    const {itemList} =this.state;
    localStorage.setItem('key', JSON.stringify(itemList))
  }



  onItemClick(item){
      return(event) => {
        let isCheck = item.isCheck;
        const {itemList} = this.state;
        const value = itemList.indexOf(item);
        this.setState({
          itemList : [
          ...itemList.slice(0,value),
          {
            ...item,
            isCheck: !isCheck
          },
          ...itemList.slice(value + 1)
          ]
        })

      }
  }


  onKeyUp(event){
    if(event.keyCode === 13){
      let text = event.target.value;
      if(!text){return ;}
      text = text.trim();
      if(!text){return ;}
      this.setState({
        inputText:'',
        itemList :[
          ...this.state.itemList,
          {title : text , isCheck : false }
        ]
      })
    }
    if(event.keyCode === 27){
      this.setState({
        inputText:'',
        ...this.state.itemList
      })
    }
  }


  onChange(event){
    
    this.setState({
      inputText : event.target.value,
      ...this.state.itemList
    })
  }

  onDelButtonClick(event){
    const {itemList} = this.state;
    var i = 0

    while(i < itemList.length){

      var checkItem = itemList[i];

      if(checkItem.isCheck === true ){
        const value = itemList.indexOf(checkItem);

        this.setState({
          ...itemList.splice(value,1)
        })
        continue;
      }

      else{i++}
    }

  }


  changeStatusAll(){
    this.setState({
      displayStatus: 'all'
    })
  }

  changeStatusFinish(){
    this.setState({
      displayStatus: 'finish'
    })
  }

  changeStatusUnFinish(){
    this.setState({
      displayStatus: 'unfinish'
    })
  }


  render() {
    const {itemList, displayStatus} = this.state
    var listRender;

    var holdAll =false;
    var holdFinish = false;
    var holdUnfinish =false;

    if(displayStatus === 'all'){
      listRender = itemList;
      holdAll = true;
    }


    //filter item have finish status

    function ReturnFinish(itemFilter){
      if(itemFilter.isCheck === true){
        return true;
      }
      return false;
    }

    if(displayStatus === 'finish'){
      holdFinish =true;
      listRender = itemList.filter(ReturnFinish)

    }
    //end filter

    //filter item have unfinish status

    function ReturnUnfinish(itemFilter){
      if(itemFilter.isCheck === false){
        return true;
      }
      return false;
    }

    if(displayStatus === 'unfinish'){
      holdUnfinish =true;
      listRender = itemList.filter(ReturnUnfinish)
    }
    
    //end filter
    

    if(listRender.length ){      
      return (
        <Container className = "back">

          <Row>
            <Col sm={{ size: 5, offset: 3 }}>

              <div className="App">

                <h1>To-Do</h1>
                <Input 
                  type="text" 
                  placeholder="Add new item" 
                  value = {this.state.inputText}
                  onChange = {this.onChange}
                  onKeyUp = {this.onKeyUp} />

                <div className="Showlist">

                  {
                  listRender.length && listRender.map(
                  (item, index) =>  
                  <Testdad 
                    status = {this.state.displayStatus}
                    key = {index} 
                    name= {item} 
                    onClick = {this.onItemClick(item)} />
                  )}

                </div>
              </div>
            </Col>    
            <Col sm = {{size: 1}} className ="actionMenu">  
              <Button outline color="danger" onClick = {this.onDelButtonClick} id="delete" className="actionButton"><img src={logoDelete} alt="Logo" /></Button>
              <UncontrolledTooltip placement="right" target="delete" id="tooltip" >Delete all your finish work</UncontrolledTooltip>
              <Button onClick = {this.changeStatusAll} className={classNames('actionButton', {'actionButtonOnStatus': holdAll})}> All</Button>
              <Button onClick = {this.changeStatusFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdFinish})}> Finish </Button>
              <Button onClick = {this.changeStatusUnFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdUnfinish})}> Unfinish </Button>
            </Col>
          </Row>    
            
          
          
        </Container>
      )
    }
    if(listRender.length === 0 && displayStatus === 'all'){

      const nothingItem = {title: 'You have nothing to do', isCheck: false} 

      return (
        <Container className = "back">
          <Row>
            <Col sm={{ size: 5, offset: 3 }}>

              <div className="App">
                <h1>To-Do</h1>
                <Input 
                  type="text" 
                  placeholder="Add new item" 
                  value = {this.state.inputText}
                  onChange = {this.onChange}
                  onKeyUp = {this.onKeyUp} />

                <div className="Showlist">

                  <Testdad  name = {nothingItem}  status = 'nothing' key  ="0"/>
              
                </div>
              </div>
              </Col>  
              <Col sm = {{size: 1}} className ="actionMenu">  
                <Button outline color="danger" onClick = {this.onDelButtonClick} id="delete" className="actionButton"><img src={logoDelete} alt="Logo" /></Button>
                <UncontrolledTooltip placement="right" target="delete" id="tooltip" >Delete all your finish work</UncontrolledTooltip>
                <Button onClick = {this.changeStatusAll} className={classNames('actionButton', {'actionButtonOnStatus': holdAll})}> All</Button>
                <Button onClick = {this.changeStatusFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdFinish})}> Finish </Button>
                <Button onClick = {this.changeStatusUnFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdUnfinish})}> Unfinish </Button>
              </Col>
              
            
            
          </Row>
        </Container>
      )
    
    }




    if(listRender.length === 0 && displayStatus === 'finish'){

      const nothingItem = {title: "you don't have finish work", isCheck: false} 

      return (
        <Container className = "back">
          <Row>
            <Col sm={{ size: 5, offset: 3 }}>

              <div className="App">
                <h1>To-Do</h1>
                <Input 
                  type="text" 
                  placeholder="Add new item" 
                  value = {this.state.inputText}
                  onChange = {this.onChange}
                  onKeyUp = {this.onKeyUp} />

                <div className="Showlist">

                  <Testdad  name = {nothingItem}  status = 'nothing' key  ="0"/>
              
                </div>
              </div>
            </Col>
            <Col sm = {{size: 1}} className ="actionMenu">  
              <Button outline color="danger" onClick = {this.onDelButtonClick} id="delete" className="actionButton"><img src={logoDelete} alt="Logo" /></Button>
              <UncontrolledTooltip placement="right" target="delete" id="tooltip" >Delete all your finish work</UncontrolledTooltip>
              <Button onClick = {this.changeStatusAll} className={classNames('actionButton', {'actionButtonOnStatus': holdAll})}> All</Button>
              <Button onClick = {this.changeStatusFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdFinish})}> Finish </Button>
              <Button onClick = {this.changeStatusUnFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdUnfinish})}> Unfinish </Button>
            </Col>
            
          </Row>
         
        </Container>
      )
    
    }



    if(listRender.length === 0 && displayStatus === 'unfinish'){

      const nothingItem = {title: "you don't have unfinish work", isCheck: false} 

      return (
        <Container className = "back">
          
          <Row>
            <Col sm={{ size: 5, offset: 3 }}>

              <div className="App">
                <h1>To-Do</h1>
                <Input 
                  type="text" 
                  placeholder="Add new item" 
                  value = {this.state.inputText}
                  onChange = {this.onChange}
                  onKeyUp = {this.onKeyUp} />

                <div className="Showlist">

                  <Testdad  name = {nothingItem}  status = 'nothing' key  ="0"/>
              

                </div>
                </div>
            
              </Col>
              <Col sm = {{size: 1}} className ="actionMenu">  
                <Button outline color="danger" onClick = {this.onDelButtonClick} id="delete" className="actionButton"><img src={logoDelete} alt="Logo" /></Button>
                <UncontrolledTooltip placement="right" target="delete" id="tooltip" >Delete all your finish work</UncontrolledTooltip>
                <Button onClick = {this.changeStatusAll} className={classNames('actionButton', {'actionButtonOnStatus': holdAll})}> All</Button>
                <Button onClick = {this.changeStatusFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdFinish})}>  Finish </Button>
                <Button onClick = {this.changeStatusUnFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdUnfinish})}> Unfinish </Button>
              </Col>
            </Row>
        </Container>
      )
    
    }
  
  
  }
}

export default App;
