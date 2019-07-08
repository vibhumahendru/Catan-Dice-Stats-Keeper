import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ReactChartkick, { LineChart, PieChart, ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'
import PlayerFill from './PlayerFill.js'

import sound2 from './assets/sound2.m4a'
import sound3 from './assets/sound3.m4a'
import sound4 from './assets/sound4.m4a'
import sound5 from './assets/sound5.m4a'
import sound6 from './assets/sound6.m4a'
import sound7 from './assets/sound7.m4a'
import sound8 from './assets/sound8.m4a'
import sound9 from './assets/sound9.m4a'
import sound10 from './assets/sound10.m4a'
import sound11 from './assets/sound11.m4a'
import sound12 from './assets/sound12.m4a'


class App extends Component {

  constructor(){
    super()
    this.sound7 = new Audio(sound7)
    this.sound2 = new Audio(sound2)
    this.sound3 = new Audio(sound3)
    this.sound4 = new Audio(sound4)
    this.sound5 = new Audio(sound5)
    this.sound6 = new Audio(sound6)
    this.sound8 = new Audio(sound8)
    this.sound9 = new Audio(sound9)
    this.sound10 = new Audio(sound10)
    this.sound11 = new Audio(sound11)
    this.sound12 = new Audio(sound12)
  }

  state = {
    rolls:[],
    players: null,
    currentPlayer: null,
    nextPlayer: null,
    muted: false
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

    this.setState({
      currentPlayer: this.state.players[this.count],
      nextPlayer: this.state.players[this.nextCount]
    })
    this.count += 1
    this.nextCount +=1
  }

  playSound=(rollNum)=>{
    let soundObj ={
      7:this.sound7,
      2:this.sound2,
      3:this.sound3,
      4:this.sound4,
      5:this.sound5,
      6:this.sound6,
      8:this.sound8,
      9:this.sound9,
      10:this.sound10,
      11:this.sound11,
      12:this.sound12,
    }
    return soundObj[rollNum].play()
  }


  handleRoll=()=>{
    let rollOne = Math.floor(Math.random() * 6) + 1;
    let rollTwo = Math.floor(Math.random() * 6) + 1;
    let rollAr = this.state.rolls
    let combineRoll = rollOne + rollTwo
    this.eachRollCount[combineRoll]+=1
    rollAr.push(combineRoll)
    if (!this.state.muted) {
      this.playSound(combineRoll)
    }
    this.setState({
      rolls: rollAr
    })
    this.handleCurrentPlayer()
  }

  handleSetPlayers=(players)=>{
    this.eachRollCount = {
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

  handleMute=()=>{
    this.setState({
      muted: !this.state.muted
    })
  }

  render() {
    return (
      <div className="App">

        <div className="right-box">
          {this.state.players ? <h2>{this.state.currentPlayer} rolled </h2>: null}
          <div className="num-display">{this.state.rolls[this.state.rolls.length -1]}</div>
          {this.state.players ? <button type="button" class="btn btn-primary" onClick={()=>this.handleRoll()}>Next Roll: {this.state.nextPlayer} </button> : null}
          {!this.state.players ? <PlayerFill handleSetPlayers={this.handleSetPlayers}/> :null}<br></br>
          {!this.state.players ? <button type="button" class="btn btn-info" onClick={this.handleTest}>Test Dice Probability: 1000 rolls</button> :null}
          <div>
          <div id="mute-btn">
          {this.state.muted?<button type="button" class="btn btn-warning" onClick={this.handleMute}>un-Mute</button>:<button type="button" class="btn btn-warning" onClick={this.handleMute}>Mute</button>}

          </div>
          </div>
        </div>

        <div className="left-box">
        <ColumnChart id="users-chart" width="600px" height="300px" data={this.eachRollCount} />
        <h4>Total Rolls: {this.state.rolls.length}</h4>
          <div className="last-rolls">
            <h3>Last Three Rolls</h3>
              <div className="last-three">
                <div className="lastRoll"><h1>{this.state.rolls[this.state.rolls.length -2]}</h1></div>
                <div className="lastRoll"><h4>{this.state.rolls[this.state.rolls.length -3]}</h4></div>
                <div className="lastRoll"><h6>{this.state.rolls[this.state.rolls.length -4]}</h6></div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
