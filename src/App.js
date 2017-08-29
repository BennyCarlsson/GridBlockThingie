import React, { Component } from 'react';
import './App.css';

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
    console.log("row1 "+matrix[0][0][0][0])
    let row1 = matrix[0][0][0][0]
    console.log("row2 "+matrix[0][0][1][0])
    let row2 = matrix[0][0][1][0]

    console.log("col1 "+matrix[1][0][0][0])
    let col1 = matrix[1][0][0][0]
    console.log("col2 "+matrix[1][0][1][0])
    let col2 = matrix[1][0][1][0]

    let array = this.state.standardGridBlocks.slice()
    for(let i = row1;i <= col1;i++){
      for(let y = row2;y <= col2;y++){
        let index = (i*4)+y
        console.log(index)
        array.splice(index,1,"")
      }
    }
     this.setState({standardGridBlocks:array})
    


    /*let low = arr[0][0] < arr[1][0] ? arr[0][0]-1 : arr[1][0]-1
    let high = arr[0][0] > arr[1][0] ? arr[0][0]-1 : arr[1][0]-1
    let col = ((high-(low+4))%4)
    let row = Math.floor((high-(low+4))/4)
    //console.log("col "+col+" row: "+row)
    console.log("col: "+col)
    
    //let array = this.state.standardGridBlocks.slice();
    //array.splice(2,-2)
    //for each row
    for(let i = 0; i < row; i++){
      //for each col
      for(let y = 0; y < col; y++){ //-?    
        //remove colums
        // +/- ?
      }
      //col+4
    }
    //this.setState({standardGridBlocks:array})
  */
  }
  
  onGridClick(index,matrix){
    index++
    if(!this.gridIndexArray[0][0]){
      this.gridIndexArray[0][0] = index
      this.gridMatrix[0][0] = matrix
    }else if(!this.gridIndexArray[1][0] && this.gridIndexArray[0][0] !== index){
      this.gridIndexArray[1][0] = index
      this.gridMatrix[1][0] = matrix

      let col =  [[this.gridIndexArray[0][0]%4],[this.gridIndexArray[1][0]%4]] 
      if(col[0][0] === 0){col[0][0] = 4}
      if(col[1][0] === 0){col[1][0] = 4}
      col[0][0] >col[1][0] ? col[0][0]++ : col[1][0]++

      let row = [[Math.floor((this.gridIndexArray[0][0]-1)/4)+1],
                 [Math.floor((this.gridIndexArray[1][0]-1)/4)+1]]
      row[0][0] > row[1][0] ? row[0][0]++ : row[1][0]++
      this.addToGrid(col,row)
      this.removeFromGrid(this.gridMatrix)
      this.gridIndexArray = [[],[]]
    }
  }
  componentWillMount(){ 
    var arr = []
    let count = 0;
    for (let i = 0; i < 4; i++) {
      for(let y = 0; y < 4; y++){
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
      <div className={"gridBlock standardGridBlock item"+this.props.index}
        onClick={() => this.props.onClick(this.props.index, this.props.matrix)}>
        {this.props.index}
        ,
        {this.props.matrix}
        </div>
    )
  }
}

export default App;
