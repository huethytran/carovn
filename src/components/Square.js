import React from 'react';

class Square extends React.Component{
    render(){
        if (this.props.value == 'X')
        {
            return(
                <button className="square x" onClick={this.props.onClick}>{this.props.value}</button>
            );
        }
        else
        {
            return(
                <button className="square o" onClick={this.props.onClick}>{this.props.value}</button>
            );
        }
  }
}

export default Square;