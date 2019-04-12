import React, { Component } from 'react';

class PlayerFill extends Component {

  state={
    "player1": "",
    "player2": "",
    "player3": "",
    "player4": ""
  }

  handleChange=(event)=>{
    let name = event.target.id
    if (name == "player1") {
      this.setState({
        player1:event.target.value
      })
    }
    if (name == "player2") {
      this.setState({
        player2:event.target.value
      })
    }
    if (name == "player3") {
      this.setState({
        player3:event.target.value
      })
    }
    if (name == "player4") {
      this.setState({
        player4:event.target.value
      })
    }

  }

  handleLog=()=>{
    let playerAr=[]
    for(var key in this.state){
      if (this.state[key] != "") {
        playerAr.push(this.state[key])
      }
    }
    console.log(playerAr);
    this.props.handleSetPlayers(playerAr)
  }

  render() {
    return (
      <div>
        <h2>Player Names + Roll Order</h2>
          <div>
            <input id="player1" onChange={(event)=>this.handleChange(event)} placeholder="player 1"></input><br></br>
            <input id="player2" onChange={(event)=>this.handleChange(event)} placeholder="player 2"></input><br></br>
            <input id="player3" onChange={(event)=>this.handleChange(event)} placeholder="player 3"></input><br></br>
            <input id="player4" onChange={(event)=>this.handleChange(event)} placeholder="player 4"></input><br></br><br></br>
          </div>
          <button type="button" class="btn btn-success" onClick={this.handleLog}>Finalise Player Order</button>
      </div>
    );
  }

}

export default PlayerFill;
