import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.grids = []//[["2/2","2/4"]]
    // = [["1/3","1/3"],["4/4","1/3"],["1/2","3/5"]];
    this.state={newGrid:[],standardGridBlocks:[]}
    this.gridIndexArray= [[],[]];
    
  }
  addToGrid(col, row){
    this.grids.push([col,row])
  }
  onGridClick(index){
    index++
    console.log(index)
    if(!this.gridIndexArray[0][0]){
      this.gridIndexArray[0][0] = index
    }else if(!this.gridIndexArray[1][0] && this.gridIndexArray[0][0] !== index){
      this.gridIndexArray[1][0] = index
      let col =  [[this.gridIndexArray[0][0]%4],[this.gridIndexArray[1][0]%4]] 
      if(col[0][0] === 0){col[0][0] = 4}
      if(col[1][0] === 0){col[1][0] = 4}
      console.log(col)

      let row = [[Math.floor(this.gridIndexArray[0][0]/2)],[Math.floor(this.gridIndexArray[1][0]/2)]]
      console.log(row)
      this.gridIndexArray = [[],[]]
    }
    // %4 for column
    // /4 Math.floor for row
    // delet standard gridblocks from array?
  }
  componentWillMount(){
    var arr = []
    for (var i = 0; i < 100; i++) {
      arr.push(<StandardGridBlock key={i} index={i} 
        addToGrid={this.addToGrid.bind(this)}
        onClick={this.onGridClick.bind(this)}/>)
    }
    this.setState({standardGridBlocks:arr})
  }
  render() {
    let createdGrids = [];
    this.grids.map((val,i) => createdGrids.push(
      <CreatedGridBlock 
        key={i} col={val[0]} row={val[1]}
        addToGrid={this.addToGrid.bind(this)} onClick={this.onGridClick.bind(this)}
      />))
    return (
      <div className="container">
        {createdGrids}
        {this.state.standardGridBlocks}
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
  render(){
    return(
      <div className={"gridBlock standardGridBlock item"+this.props.index} onClick={() => this.props.onClick(this.props.index)}></div>
    )
  }
}

export default App;
