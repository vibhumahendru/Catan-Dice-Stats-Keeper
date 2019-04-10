import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ReactChartkick, { LineChart, PieChart, ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'
import PlayerFill from './PlayerFill.js'

class App extends Component {

  state = {
    rolls:[],
    players: null,
    currentPlayer: null,
    nextPlayer: null
  }

  count = 0
  nextCount = 1
  eachRollCount = {
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
    7:0,
    8:0,
    9:0,
    10:0,
    11:0,
    12:0
  }
  handleCurrentPlayer = ()=>{
    if (this.count == this.state.players.length) {
      this.count = 0

    }
    if (this.count ==this.state.players.length -1) {
      this.nextCount = 0
    }
    console.log(this.state.players[this.count]);
    this.setState({
      currentPlayer: this.state.players[this.count],
      nextPlayer: this.state.players[this.nextCount]
    })
    this.count += 1
    this.nextCount +=1
  }


  handleRoll=()=>{
    let rollOne = Math.floor(Math.random() * 6) + 1;
    let rollTwo = Math.floor(Math.random() * 6) + 1;
    let rollAr = this.state.rolls
    let combineRoll = rollOne + rollTwo
    this.eachRollCount[combineRoll]+=1
    rollAr.push(combineRoll)

    this.setState({
      rolls: rollAr
    })
    this.handleCurrentPlayer()
  }

  handleSetPlayers=(players)=>{
    this.setState({
      rolls: [],
      players:players
    })
  }

  rollAr = []

  handleTest = ()=>{
    let counter = 0
    while (counter<1000) {
      let rollOne = Math.floor(Math.random() * 6) + 1;
      let rollTwo = Math.floor(Math.random() * 6) + 1;
      let combineRoll = rollOne + rollTwo
      this.rollAr.push(null)
      this.eachRollCount[combineRoll]+=1

      this.setState({
        rolls: this.rollAr
      })
      counter +=1
    }




  }

  render() {
    console.log(this.state.rolls.length);
    return (
      <div className="App">
        <div className="right-box">
          {this.state.players ? <h2>{this.state.currentPlayer} rolled </h2>: null}
          <div className="num-display">{this.state.rolls[this.state.rolls.length -1]}</div>
          {this.state.players ? <button onClick={()=>this.handleRoll()}>Next Roll: {this.state.nextPlayer} </button> : null}
          {!this.state.players ? <PlayerFill handleSetPlayers={this.handleSetPlayers}/> :null}
          {!this.state.players ? <button onClick={this.handleTest}>Test Dice Probability: 1000 rolls</button> :null}
        </div>
        <div className="left-box">
        <ColumnChart id="users-chart" width="600px" height="300px" data={this.eachRollCount} />
        <h4>Total Rolls: {this.state.rolls.length}</h4>
          <div className="last-rolls">
            <h3>Last Three Rolls</h3>
              <div className="last-three">
                <div className="lastRoll">Last Roll<h1>{this.state.rolls[this.state.rolls.length -2]}</h1></div>
                <div className="lastRoll"><h1>{this.state.rolls[this.state.rolls.length -3]}</h1></div>
                <div className="lastRoll"><h1>{this.state.rolls[this.state.rolls.length -4]}</h1></div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
