import React from 'react'
import ReactDOM from 'react-dom'


var checkForHorizontal = (element) => {
  var color = element.classList[1]
  var x = parseInt(element.id[0])
  var y = element.id[2]
  for(var i = x; i < (x + 4); i++){
    if(document.getElementById((i + ' ' + y)).classList[1] !== color || (color === 'none')) {
      return false
    }
  }
  return true
}

var checkForDiagonalUp = (element) => {
  var color = element.classList[1]
  var x = parseInt(element.id[0])
  var y = parseInt(element.id[2])
  var j = y
  for(var i = x; i < (x + 4); i++){
    if(document.getElementById((i + ' ' + j)).classList[1] !== color || (color === 'none')) {
      return false
    }
    j--
  }
  return true
}

var checkForDiagonalDown = (element) => {
  var color = element.classList[1]
  var x = parseInt(element.id[0])
  var y = parseInt(element.id[2])
  var j = y
  for(var i = x; i < (x + 4); i++){
    if(document.getElementById((i + ' ' + j)).classList[1] !== color || (color === 'none')) {
      return false
    }
    j++
  }
  return true
}



var checkForVertical = (element) => {
  var color = element.classList[1]
  var x = parseInt(element.id[0])
  var y = parseInt(element.id[2])
  for(var i = y; i < (y + 4); i++){
    if(document.getElementById((x + ' ' + i)).classList[1] !== color || (color === 'none')) {
      return false
    }
  }
  return true
}

var applyHChecker = () => {
  for(var x = 1; x < 5; x++){
    for(var y = 1; y < 7; y++){
      if(checkForHorizontal(document.getElementById(x + ' ' + y))){
        return true
      }
    }
  }
  return false
}

var applyVChecker = () => {
  for(var x = 1; x < 8; x++){
    for(var y = 1; y < 4; y++){
      if(checkForVertical(document.getElementById(x + ' ' + y))){
        return true
      }
    }
  }
  return false
}

var applyDDChecker = () => {
  for(var x = 1; x < 5; x++){
    for(var y = 1; y < 4; y++){
      if(checkForDiagonalDown(document.getElementById(x + ' ' + y))){
        return true
      }
    }
  }
  return false
}

var applyDUChecker = () => {
  for(var x = 1; x < 5; x++){
    for(var y = 4; y < 7; y++){
      if(checkForDiagonalUp(document.getElementById(x + ' ' + y))){
        return true
      }
    }
  }
  return false
}

var winChecker = () => {
  if(applyHChecker()){
    return applyHChecker()
  }
  if(applyVChecker()){
    return applyVChecker()
  }
  if(applyDDChecker()){
    return applyDDChecker()
  }
  if(applyDUChecker()){
    return applyDUChecker()
  }
  return false
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'red',
      canClick: true,
      phrase: "'s turn"
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleClick(e) {
    if(this.state.canClick) {
      var id = e.target.id[0]
      for(var i = 6; i > 0; i--){
        var color = document.getElementById(id + ' ' + i).classList[1]
        console.log(color)
        if(color === 'none'){
          document.getElementById(id + ' ' + i).classList.add(this.state.color)
          document.getElementById(id + ' ' + i).classList.remove('none')

          if(this.state.color === 'red') {
            this.setState({
              color: 'blue'
            })
          } else {
            this.setState({
              color: 'red'
            })
          }
          break
        }
      }

      var winner = winChecker()
      if(winner){
        this.setState({
          color: this.state.color,
          canClick: false,
          phrase: ` wins!`
        })
      }
    }
  }

  handleReset () {
    this.setState({
      canClick: true,
      phrase: "'s turn"
    })
    let boxes = document.getElementsByClassName('circle')
    for(let box of boxes) {
      box.classList.remove('red')
      box.classList.remove('blue')
      box.classList.remove('none')
      box.classList.add('none')
    }
  }

  createColumns(id) {
    var columns = [1, 2, 3, 4, 5, 6, 7]
    return <div className='row'>{columns.map((num)=> {
      return <div className='box' id={num} onClick={this.handleClick}>
          <div class='circle none' id={num + ' ' + id} >
          </div>
        </div>
    })}</div >
  }

  createRows() {
    var rows = [1, 2, 3, 4, 5, 6]
    return <div className='wrapper1'>{rows.map((num) => {
      return this.createColumns(num)
    })}</div>
  }

  render() {
    return <div className='board'>

      <div className='gameHeader'>
        <span>Connect 4</span>
        <span>{this.state.color}{this.state.phrase}</span>
        <span onClick={this.handleReset}>RESET</span>
      </div>

      {this.createRows()}

    </div>
  }
}

ReactDOM.render(<Game/>, document.getElementById('App'))