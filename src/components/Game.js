//necessary dependencies
import React from 'react';
import Board from './Board';

//our main game component will tie everything together
class Game extends React.Component {

    //initial state of our squares on the board (ie. it will be a 5x5 board with 10 dogs)
    state = {
        //will give us 25 squares, with 10 dogs and 15 cats
        height: 5,
        width: 5,
        dogs: 10,
    };

    render() {
        //render the state of our hard coded values
        const { height, width, dogs } = this.state;
        //will render our fullly functional game board
        return (
            <div className="game">
                <div className="game-board">
                    {/*will pass in the height, width and num of dogs as props*/}
                    <Board height={height} width={width} dogs={dogs} />
                </div>
            </div>
        );
    }
}

//exports for use in other files
export default Game