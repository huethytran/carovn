import React from 'react';
import Board from './Board';
import "antd/dist/antd.css";
import { Modal, Button } from 'antd';
class Game extends React.Component{
    constructor(){
        super();
        this.state = {
          squares: Array(400).fill(null),
          xIsNext: true, 
          preStep: -1
        }; // Khởi tạo Game với state là một Array gồm 9 phần tử null
        this.replay = this.replay.bind(this);
      }
      handleClick(i, winner){
        if (this.state.squares[i] == null &&  winner == null )
        {
            this.state.squares[i] = this.state.xIsNext ? 'X' : 'O';
            this.state.xIsNext ? this.setState({xIsNext: false}) : this.setState({xIsNext: true});
            this.setState({preStep: i});
        }
       
      }
      replay(){
        this.setState({
          squares: Array(400).fill(null),
          xIsNext: true, 
          preStep: -1
        });
      }
      render(){
        const squares = this.state.squares.slice();
        const winner = calculateWinner(squares, this.state.preStep);
    let status;
    if(winner){
      status = "Winner is: " + winner; // Nếu winner có giá trị thì sẽ hiển thị người thắng cuộc
      Modal.success({
        title: "Congratulation player " + winner,
        content: (
          <div>
            <p>You are the winner! ^^</p>
          </div>
        ),
        onOk() {},
      });
      return(
        <div className="app">
          
          <div className="game-info">
          <p className="title">Caro VN</p>
          <p>{status}</p>
          <Button type="dashed" size="large" shape="round" onClick={this.replay}>Play Again</Button>
          </div>
          <div className="game"><Board squares={this.state.squares} onClick={i => this.handleClick(i, winner)} xIsNext={this.state.xIsNext} /></div> 
        </div>
      );
    }else{
      status = "Next player is: " + (this.state.xIsNext ? 'X' : 'O');
      return(
        <div className="app">
          
          <div className="game-info">
          <p className="title">Caro VN</p>
        <p>{status}</p>
      </div>
          <div className="game"><Board squares={this.state.squares} onClick={i => this.handleClick(i, winner)} xIsNext={this.state.xIsNext} /></div> 
          
        </div>
      );
    }
        
  }
}
function calculateWinner(squares, preStep) {
  //xet hang ngang
    for (let i = -4; i<=0; i++){
      if ((preStep+i)-(parseInt(preStep/20)*20)>=0)
      {
        if (squares[preStep+i] === squares[preStep+i+1] && squares[preStep+i] === squares[preStep+i+2] && squares[preStep+i] === squares[preStep+i+3] && squares[preStep+i] === squares[preStep+i+4])
          if (isBlocked(squares, preStep, (preStep+i-1)-(parseInt(preStep/20)*20)>=0? preStep+i-1 : -1,(preStep+i+5)/20 === parseInt((preStep+i+5)/20)? -1 : preStep+i+5)=== false)
            return squares[preStep];
      }
  }
  //xet hang doc
  for (let i = -4; i<=0; i++){
    if (preStep+i*20>=0)
    {
      if (squares[preStep+i*20] === squares[preStep+(i+1)*20] && squares[preStep+i*20] === squares[preStep+(i+2)*20] && squares[preStep+i*20] === squares[preStep+(i+3)*20] && squares[preStep+i*20] === squares[preStep+(i+4)*20])
        if (isBlocked(squares, preStep, (preStep+(i-1)*20)>=0? preStep+(i-1)*20 : -1,(preStep+(i+5)*20)>=400? -1 : preStep+(i+5)*20)=== false)
          return squares[preStep];
    }
  }
  //xet hang cheo thu 1
  for (let i = -4; i<=0; i++){
    if (preStep+i*21>=0)
    {
      if (squares[preStep+i*21] === squares[preStep+(i+1)*21] && squares[preStep+i*21] === squares[preStep+(i+2)*21] && squares[preStep+i*21] === squares[preStep+(i+3)*21] && squares[preStep+i*21] === squares[preStep+(i+4)*21])
      {
        if (isBlocked(squares, preStep, (preStep+(i-1)*21)>=0 && parseInt((preStep+(i-1)*21)/10)+2 == parseInt((preStep+i*21)/10)? preStep+(i-1)*21 : -1, (preStep+(i+5)*21)<400 && parseInt((preStep+(i+5)*21)/10)-2 == parseInt((preStep+(i+4)*21)/10)? preStep+(i+5)*21 : -1)=== false)
          return squares[preStep];
      }
    }
  }
  //xet hang cheo thu 2
  for (let i = -4; i<=0; i++){
    if (preStep+i*19>=0)
    {
      if (squares[preStep+i*19] === squares[preStep+(i+1)*19] && squares[preStep+i*19] === squares[preStep+(i+2)*19] && squares[preStep+i*19] === squares[preStep+(i+3)*19] && squares[preStep+i*19] === squares[preStep+(i+4)*19])
      {
        if (isBlocked(squares, preStep, (preStep+(i-1)*19)>=0 && parseInt((preStep+(i-1)*19)/10)+2 == parseInt((preStep+i*19)/10)? preStep+(i-1)*19 : -1, (preStep+(i+5)*19)<400 && parseInt((preStep+(i+5)*19)/10)-2 == parseInt((preStep+(i+4)*19)/10)? preStep+(i+5)*19 : -1)=== false)
          return squares[preStep];
      }
    }
  }
  return null;
}
function isBlocked(squares, preStep, block1, block2)
{
  console.log(block2);
  if (block1===-1)
    if (squares[block2] && squares[block2]!==squares[preStep])
      return true;
  if (block2===-1)
    if (squares[block1] && squares[block1]!==squares[preStep])
      return true;
  if (squares[block1] && squares[block2] && squares[block2] === squares[block1] && squares[block2] !== squares[preStep])
    return true;
  return false;
}
export default Game;