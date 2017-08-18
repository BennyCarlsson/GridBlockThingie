import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.grids = [["1/3","1/3"],["4/4","1/3"],["1/2","3/5"]];
  }
  render() {
    let standardGridBlocks = [];
    for (var i = 0; i < 100; i++) {standardGridBlocks.push(<StandardGridBlock key={i} index={i} />)}
    let createdGrids = [];
    this.grids.map((val,i) => createdGrids.push(<CreatedGridBlock key={i} col={val[0]} row={val[1]}/>))
    return (
      <div className="container">
        {createdGrids}
        {standardGridBlocks}
      </div>
    )
  }
}
class CreatedGridBlock extends Component{
  onClick(e){
    console.log("big")
  }
  render(){
    return(
      <div className={"gridBlock item"+this.props.index} 
        style={{gridColumn:this.props.col,gridRow:this.props.row}} onClick={this.onClick.bind(this)}></div>
    )
  }
}
class StandardGridBlock extends Component{
  onClick(e){
    console.log(this.props.index)
  }
  render(){
    return(
      <div className={"gridBlock standardGridBlock item"+this.props.index} onClick={this.onClick.bind(this)}></div>
    )
  }
}

export default App;
