import React, { Component } from 'react';
import './App.css';
import Testdad from './components/Testdad';
import {Container, Col, Input, Button} from 'reactstrap';


class App extends Component {
  constructor (){
    super ();
    this.state = {
    inputText: '',
    itemList : []
  }

  this.onKeyUp = this.onKeyUp.bind(this);
  this.onChange = this.onChange.bind(this);
  this.onDelButtonClick = this.onDelButtonClick.bind(this);
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


  render() {
    const {itemList} = this.state
   
      
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
                itemList.length && itemList.map(
                (item, index) =>  
                <Testdad 
                  key = {index} 
                  name= {item} 
                  onClick = {this.onItemClick(item)} />
                )
                }
              </div>
              <Button color="danger" onClick = {this.onDelButtonClick}>Delete</Button>
            </div>
          
          </Col>
        </Container>
      )

    
  }
}

export default App;
