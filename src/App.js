import React, { Component } from 'react';
import './App.css';
const rowdDivideNumber = 2;
class App extends Component {
  constructor(props) {
    super(props)
    this.state={grids:[],standardGridBlocks:[]}
    this.gridIndexArray= [[],[]];
    this.gridMatrix=[[],[]]
    
  }
  addToGrid(col, row){
    let arr = this.state.grids.slice();
    arr.push([[col[0][0]+"/"+col[1][0]],[row[0][0]+"/"+row[1][0]]])
    this.setState({grids:arr})  
  }
  removeFromGrid(matrix){
    let row1 = matrix[0][0][0][0] <= matrix[1][0][0][0] ? matrix[0][0][0][0] : matrix[1][0][0][0] 
    let row2 = matrix[0][0][1][0] <= matrix[1][0][1][0] ? matrix[0][0][1][0] : matrix[1][0][1][0]

    let col1 = matrix[1][0][0][0] > matrix[0][0][0][0] ? matrix[1][0][0][0] : matrix[0][0][0][0]
    let col2 = matrix[1][0][1][0] > matrix[0][0][1][0] ? matrix[1][0][1][0] : matrix[0][0][1][0]

    let array = this.state.standardGridBlocks.slice()
    for(let i = row1;i <= col1;i++){
      for(let y = row2;y <= col2;y++){
        let index = (i*rowdDivideNumber)+y
        array.splice(index,1,"")
      }
    }
     this.setState({standardGridBlocks:array})
  }
  
  onGridClick(index,matrix){
    index++
    if(!this.gridIndexArray[0][0]){
      this.gridIndexArray[0][0] = index
      this.gridMatrix[0][0] = matrix
    }else if(!this.gridIndexArray[1][0] && this.gridIndexArray[0][0] !== index){
      this.gridIndexArray[1][0] = index
      this.gridMatrix[1][0] = matrix

      let col =  [[this.gridIndexArray[0][0]%rowdDivideNumber],[this.gridIndexArray[1][0]%rowdDivideNumber]] 
      if(col[0][0] === 0){col[0][0] = rowdDivideNumber}
      if(col[1][0] === 0){col[1][0] = rowdDivideNumber}
      col[0][0] >col[1][0] ? col[0][0]++ : col[1][0]++

      let row = [[Math.floor((this.gridIndexArray[0][0]-1)/rowdDivideNumber)+1],
                 [Math.floor((this.gridIndexArray[1][0]-1)/rowdDivideNumber)+1]]
      row[0][0] > row[1][0] ? row[0][0]++ : row[1][0]++
      this.addToGrid(col,row)
      this.removeFromGrid(this.gridMatrix)
      this.gridIndexArray = [[],[]]
    }
  }
  componentWillMount(){ 
    var arr = []
    let count = 0;
    for (let i = 0; i < 25; i++) {
      for(let y = 0; y < rowdDivideNumber; y++){
        arr.push(<StandardGridBlock key={"i"+i+y} index={count} matrix={[[i],[y]]} 
          onClick={this.onGridClick.bind(this)}/>)
          count++
      }
    }
    this.setState({standardGridBlocks:arr})
  }
  render() {
    let createdGrids = [];
    this.state.grids.map((val,i) => createdGrids.push(
      <CreatedGridBlock 
        key={i} col={val[0]} row={val[1]}
        onClick={this.onGridClick.bind(this)}
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
  render(){
    console.log("col: "+this.props.col)
    console.log("row: "+this.props.row)
    return(
      <div className={"gridBlock"} 
        style={{gridColumn:this.props.col,gridRow:this.props.row}}></div>
    )
  }
}
class StandardGridBlock extends Component{
  render(){
    return(
      <div className={"gridBlock standardGridBlock item"+this.props.index}
        onClick={() => this.props.onClick(this.props.index, this.props.matrix)}>  
        {this.props.matrix}
      </div>
    )
  }
}

export default App;
