import React, { Component } from "react"
import "./App.css"

const rowdDivideNumber = 4
const rowdDivideNumberMobile = 2
const device = {
  desktop: "desktop",
  mobile: "mobile"
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grids: [],
      gridsMobile: [],
      standardGridBlocks: [],
      standardGridBlocksMobile: []
    }
    this.gridIndexArray = [[], []]
    this.gridMatrix = [[], []]
  }

  addToGrid(col, row, currentDevice) {
    let arr =
      currentDevice === device.desktop
        ? this.state.grids.slice()
        : this.state.gridsMobile.slice()

    arr.push([[col[0][0] + "/" + col[1][0]], [row[0][0] + "/" + row[1][0]]])

    currentDevice === device.desktop
      ? this.setState({ grids: arr })
      : this.setState({ gridsMobile: arr })
  }

  removeFromGrid(matrix, currentDevice) {
    let row1 =
      matrix[0][0][0][0] <= matrix[1][0][0][0]
        ? matrix[0][0][0][0]
        : matrix[1][0][0][0]
    let row2 =
      matrix[0][0][1][0] <= matrix[1][0][1][0]
        ? matrix[0][0][1][0]
        : matrix[1][0][1][0]

    let col1 =
      matrix[1][0][0][0] > matrix[0][0][0][0]
        ? matrix[1][0][0][0]
        : matrix[0][0][0][0]
    let col2 =
      matrix[1][0][1][0] > matrix[0][0][1][0]
        ? matrix[1][0][1][0]
        : matrix[0][0][1][0]

    //could be refactored
    let array = this.state.standardGridBlocks.slice()
    let mArray = this.state.standardGridBlocksMobile.slice()

    for (let i = row1; i <= col1; i++) {
      for (let y = row2; y <= col2; y++) {
        if (currentDevice === device.desktop) {
          let index = i * rowdDivideNumber + y
          array.splice(index, 1, "")
        }
        if (currentDevice === device.mobile) {
          let mIndex = i * rowdDivideNumberMobile + y
          mArray.splice(mIndex, 1, "")
        }
      }
    }

    if (currentDevice === device.desktop) {
      this.setState({ standardGridBlocks: array })
    }
    if (currentDevice === device.mobile) {
      this.setState({ standardGridBlocksMobile: mArray })
    }
  }

  onGridClick(index, matrix, divide, currentDevice) {
    index++
    if (!this.gridIndexArray[0][0]) {
      this.gridIndexArray[0][0] = index
      this.gridMatrix[0][0] = matrix
    } else if (
      !this.gridIndexArray[1][0] &&
      this.gridIndexArray[0][0] !== index
    ) {
      this.gridIndexArray[1][0] = index
      this.gridMatrix[1][0] = matrix

      let col = [
        [this.gridIndexArray[0][0] % divide],
        [this.gridIndexArray[1][0] % divide]
      ]
      if (col[0][0] === 0) {
        col[0][0] = divide
      }
      if (col[1][0] === 0) {
        col[1][0] = divide
      }
      col[0][0] > col[1][0] ? col[0][0]++ : col[1][0]++

      let row = [
        [Math.floor((this.gridIndexArray[0][0] - 1) / divide) + 1],
        [Math.floor((this.gridIndexArray[1][0] - 1) / divide) + 1]
      ]
      row[0][0] > row[1][0] ? row[0][0]++ : row[1][0]++
      this.addToGrid(col, row, currentDevice)
      this.removeFromGrid(this.gridMatrix, currentDevice)
      this.gridIndexArray = [[], []]
    }
  }

  componentWillMount() {
    var arr = []
    var marr = []
    let count = 0
    let mcount = 0
    for (let i = 0; i < 25; i++) {
      for (let y = 0; y < rowdDivideNumber; y++) {
        arr.push(
          <StandardGridBlock
            key={"i" + i + y}
            index={count}
            matrix={[[i], [y]]}
            onClick={this.onGridClick.bind(this)}
          />
        )
        count++
      }
      for (let z = 0; z < rowdDivideNumberMobile; z++) {
        marr.push(
          <StandardGridBlockMobile
            key={"Mi" + i + z}
            index={mcount}
            matrix={[[i], [z]]}
            onClick={this.onGridClick.bind(this)}
          />
        )
        mcount++
      }
    }
    this.setState({ standardGridBlocks: arr })
    this.setState({ standardGridBlocksMobile: marr })
  }

  render() {
    let createdGrids = []
    this.state.grids.map((val, i) =>
      createdGrids.push(
        <CreatedGridBlock
          className={"desktopOnly"}
          key={i + "d"}
          col={val[0]}
          row={val[1]}
          onClick={this.onGridClick.bind(this)}
        />
      )
    )
    this.state.gridsMobile.map((val, i) =>
      createdGrids.push(
        <CreatedGridBlock
          className={"mobileOnly"}
          key={i + "m"}
          col={val[0]}
          row={val[1]}
          onClick={this.onGridClick.bind(this)}
        />
      )
    )
    return (
      <div className="container">
        {createdGrids}
        {this.state.standardGridBlocks}
        {this.state.standardGridBlocksMobile}
      </div>
    )
  }
}

const CreatedGridBlock = props => {
  return (
    <div
      className={"gridBlock " + props.className}
      style={{ gridColumn: props.col, gridRow: props.row }}
    />
  )
}

const StandardGridBlock = props => {
  return (
    <div
      className={"gridBlock standardGridBlock desktopOnly item" + props.index}
      onClick={() =>
        props.onClick(
          props.index,
          props.matrix,
          rowdDivideNumber,
          device.desktop
        )}
    >
      {props.matrix}
    </div>
  )
}

const StandardGridBlockMobile = props => {
  return (
    <div
      className={"gridBlock standardGridBlock mobileOnly item" + props.index}
      onClick={() =>
        props.onClick(
          props.index,
          props.matrix,
          rowdDivideNumberMobile,
          device.mobile
        )}
    >
      {props.matrix}
    </div>
  )
}
export default App
