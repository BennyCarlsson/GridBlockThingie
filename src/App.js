import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    let gridBlocks = [];
    for (var i = 0; i < 10; i++) {gridBlocks.push(<GridBlock key={i} index={i} />)}
    return (
      <div className="container">
        {gridBlocks}
      </div>
    )
  }
}

class GridBlock extends Component{
  onClick(e){
    console.log(this.props.index)
  }
  render(){
    return(
      <div className={"gridBlock item"+this.props.index} onClick={this.onClick.bind(this)}></div>
    )
  }
}

export default App;
