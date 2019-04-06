import React, { Component } from 'react';
import './App.css';
import Testdad from './components/Testdad';
import {Container, Col, Input, Button, UncontrolledTooltip} from 'reactstrap';
import classNames from 'classnames';


import logoDelete from './icon/delete.png';


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
    
    let listNew = JSON.parse(localStorage.getItem('key'))
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
    

    if(listRender.length){      
      return (
        <Container>

          <Col sm={{ size: 4, offset: 4 }}>

            <div className="App">
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

              <Button outline color="danger" onClick = {this.onDelButtonClick} id="delete" className="actionButton"><img src={logoDelete} alt="Logo" /></Button>
              <UncontrolledTooltip placement="bottom" target="delete" id="tooltip" >Delete all your finish work</UncontrolledTooltip>
              <Button onClick = {this.changeStatusAll} className={classNames('actionButton', {'actionButtonOnStatus': holdAll})}> All</Button>
              <Button onClick = {this.changeStatusFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdFinish})}> Finish </Button>
              <Button onClick = {this.changeStatusUnFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdUnfinish})}> Unfinish </Button>
              
            </div>
          
          </Col>
        </Container>
      )
    }
    if(listRender.length === 0 && displayStatus === 'all'){

      const nothingItem = {title: 'You have nothing to do', isCheck: false} 

      return (
        <Container>

          <Col sm={{ size: 4, offset: 4 }}>

            <div className="App">
              <Input 
                type="text" 
                placeholder="Add new item" 
                value = {this.state.inputText}
                onChange = {this.onChange}
                onKeyUp = {this.onKeyUp} />

              <div className="Showlist">

                <Testdad  name = {nothingItem}  status = 'nothing' key  ="0"/>
            

              </div>

              <Button outline color="danger" onClick = {this.onDelButtonClick} id="delete" className="actionButton"><img src={logoDelete} alt="Logo" /></Button>
              <Button onClick = {this.changeStatusAll} className={classNames('actionButton', {'actionButtonOnStatus': holdAll})}> All</Button>
              <Button onClick = {this.changeStatusFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdFinish})}> Finish </Button>
              <Button onClick = {this.changeStatusUnFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdUnfinish})}> Unfinish </Button>
              
            </div>
          
          </Col>
        </Container>
      )
    
    }




    if(listRender.length === 0 && displayStatus === 'finish'){

      const nothingItem = {title: "you don't have finish work", isCheck: false} 

      return (
        <Container>

          <Col sm={{ size: 4, offset: 4 }}>

            <div className="App">
              <Input 
                type="text" 
                placeholder="Add new item" 
                value = {this.state.inputText}
                onChange = {this.onChange}
                onKeyUp = {this.onKeyUp} />

              <div className="Showlist">

                <Testdad  name = {nothingItem}  status = 'nothing' key  ="0"/>
            

              </div>

              <Button outline color="danger" onClick = {this.onDelButtonClick} id="delete" className="actionButton"><img src={logoDelete} alt="Logo" /></Button>
              <Button onClick = {this.changeStatusAll} className={classNames('actionButton', {'actionButtonOnStatus': holdAll})}> All</Button>
              <Button onClick = {this.changeStatusFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdFinish})}> Finish </Button>
              <Button onClick = {this.changeStatusUnFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdUnfinish})}> Unfinish </Button>
              
            </div>
          
          </Col>
        </Container>
      )
    
    }



    if(listRender.length === 0 && displayStatus === 'unfinish'){

      const nothingItem = {title: "you don't have unfinish work", isCheck: false} 

      return (
        <Container>

          <Col sm={{ size: 4, offset: 4 }}>

            <div className="App">
              <Input 
                type="text" 
                placeholder="Add new item" 
                value = {this.state.inputText}
                onChange = {this.onChange}
                onKeyUp = {this.onKeyUp} />

              <div className="Showlist">

                <Testdad  name = {nothingItem}  status = 'nothing' key  ="0"/>
            

              </div>

              <Button outline color="danger" onClick = {this.onDelButtonClick} id="delete" className="actionButton"><img src={logoDelete} alt="Logo" /></Button>
              <Button onClick = {this.changeStatusAll} className={classNames('actionButton', {'actionButtonOnStatus': holdAll})}> All</Button>
              <Button onClick = {this.changeStatusFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdFinish})}>  Finish </Button>
              <Button onClick = {this.changeStatusUnFinish} className={classNames('actionButton', {'actionButtonOnStatus': holdUnfinish})}> Unfinish </Button>
              
            </div>
          
          </Col>
        </Container>
      )
    
    }
  
  
  }
}

export default App;
