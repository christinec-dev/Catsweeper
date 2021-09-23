//necessary dependencies
import React from 'react';
import Square from './Square';
//our popup for when a player wins/loses
import swal from 'sweetalert';

//will compile our main board and game functionalities
export default class Board extends React.Component {
    state = {
        //sets the initial state of our board (the height, width, and num of dogs will be passed to it in Game.js)
        boardSettings: this.initBoardSettings(this.props.height, this.props.width, this.props.dogs),
        //sets the initial state of our Game Status as undefined (not won/loss)
        gameWon: false,
        //number of dogs
        dogCount: this.props.dogs,
    };

    // This function will allow us to get the dog data from our squares
    getDogs(data) {
        //initial array of squares
        let squareArray = [];
        //map over our array of squares to push dogs to it
        data.map(datarow => {
            datarow.map((dataitem) => {
                if (dataitem.isDog) {
                    squareArray.push(dataitem);
                } 
                //explicit return statement
                return "";
            });
            //explicit return statement
            return "";
        });
        //returns our dogs in our squares
        return squareArray;
    }

    // This function will allow us to get the cat data from our squares
    getCats(data) {
        //initial array of squares
        let squareArray = [];
        //map over our array of squares to push cats to it
        data.map(datarow => {
            datarow.map((dataitem) => {
                if (dataitem.isCat) {
                    squareArray.push(dataitem);
                } 
                //explicit return statement
                return "";
            }); 
            //explicit return statement
            return "";
        });
        //returns our cats in our squares
        return squareArray;
    }


    // This function will allow us to get the default door data from our squares
    getHidden(data) {
        //initial array of squares
        let squareArray = [];
        //map over our array of squares to push doors to it
        data.map(datarow => {
            datarow.map((dataitem) => {
                if (!dataitem.isRevealed) {
                    squareArray.push(dataitem);
                }
                 //explicit return statement
                 return "";
                }); 
            //explicit return statement
            return "";
        });
        //returns our cats in our squares
        return squareArray;
    }
    
    //This function will generate a random number that we can assign to each square (to randomise placement of cats and dogs)
    getRandomNumber(dimension) {
        return Math.floor((Math.random() * 1000) + 1) % dimension;
    }

    // This function gets the initial board settings, where everything will be reverted to hidden
    initBoardSettings(height, width, dogs) {
        //data is undefined array to be reused again
        let data = [];
        //will map through height(y) 
        for (let i = 0; i < height; i++) {
            //and push our data values to it
            data.push([]);
            //will map through width(x) 
            for (let j = 0; j < width; j++) {
                //and hide everything at first (we make a clean board)
                data[i][j] = {
                    x: i,
                    y: j,
                    isDog: false,
                    neighbour: 0,
                    isRevealed: false,
                    isEmpty: false,
                    isCat: false,
                };
            }
        }
        //will add dogs and doors to our board when defined
        data = this.addDogs(data, height, width, dogs);
        data = this.getNeighbours(data, height, width);
        return data;
    }

    // This function will place actual dogs on our empty board
    addDogs(data, height, width, dogs) {
        //for each x or y value, we will have no dogs initially
        let valx, valy, dogsAdded = 0;
        //while our dogsAdded (0) are less than our dogs (10)
        while (dogsAdded < dogs) {
            //randomise their position on our x and y positions on the board
            valx = this.getRandomNumber(width);
            valy = this.getRandomNumber(height);
            //and add them until 10 squares are filles 
            if (!(data[valx][valy].isDog)) {
                data[valx][valy].isDog = true;
                dogsAdded++;
            }
        }
        //render this on our board array
        return (data);
    }

    // Gets the number of default doors on our empty board
    getNeighbours(data, height, width) {
        let updatedData = data;
        
        //will loop through board records to add values randomly
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                //if there is no dog
                if (data[i][j].isDog !== true) {
                    let dog = 0;
                    //will find areas on the squares to add new dogs
                    const area = this.traverseBoard(data[i][j].x, data[i][j].y, data);
                    //move across the board in a randomised motion to add dogs
                    area.map(value => {
                        if (value.isDog) {
                            dog++;
                        }
                        //explicit return statement
                        return "";
                    });
                    if (dog === 0) {
                        updatedData[i][j].isEmpty = true;
                    }
                    updatedData[i][j].neighbour = dog;
                }
            }
        }
        //return board with added dogs
        return (updatedData);
    };

    // Looks across squares to find dogs
    traverseBoard(x, y, data) {
        //initial postition of traverse is null
        const pos = [];
        //traverse up
        if (x > 0) {
            pos.push(data[x - 1][y]);
        }
        //traverse down
        if (x < this.props.height - 1) {
            pos.push(data[x + 1][y]);
        }
        //traverse left
        if (y > 0) {
            pos.push(data[x][y - 1]);
        }
        //traverse right
        if (y < this.props.width - 1) {
            pos.push(data[x][y + 1]);
        }
        //traverse top left
        if (x > 0 && y > 0) {
            pos.push(data[x - 1][y - 1]);
        }
        //traverse top right
        if (x > 0 && y < this.props.width - 1) {
            pos.push(data[x - 1][y + 1]);
        }
        //traverse bottom right
        if (x < this.props.height - 1 && y < this.props.width - 1) {
            pos.push(data[x + 1][y + 1]);
        }
        //traverse bottom left
        if (x < this.props.height - 1 && y > 0) {
            pos.push(data[x + 1][y - 1]);
        }
        return pos;
    }

    // Function will reveal the whole board
    revealBoard() {
        //render the updated data in the new board
        let updatedData = this.state.boardSettings;
        //reveal new data items
        updatedData.map((datarow) => {
            datarow.map((dataitem) => {
                dataitem.isRevealed = true; 
                //explicit return statement
                return "";
            }); 
            //explicit return statement
            return "";
        });
        //update the state of the board from initial state to current state
        this.setState({
            boardSettings: updatedData
        })
    }

    // Function will help us identify empty squares
    revealEmpty(x, y, data) {
        //will look across the board 
        let area = this.traverseBoard(x, y, data);
        //and map to find where positions have not yet been revealed/taken
        area.map(value => {
            if (!value.isRevealed && (value.isEmpty || !value.isDog)) {
                data[value.x][value.y].isRevealed = true;
                if (value.isEmpty) {
                    //reveal empty squares
                    this.revealEmpty(value.x, value.y, data);
                }
            }
            //explicit return statement
            return "";
        });
        return data;
    }

    //Function to enable click events for winning/losing states
    handleCellClick(x, y) {
        let win = false;
        // check if revealed. return if true.
        if (this.state.boardSettings[x][y].isRevealed) return null;
        // Alert for when a player clicks on a dog to display game over
        if (this.state.boardSettings[x][y].isDog) {
            this.revealBoard();
            swal("Oopsie, we opened a door and a dog chased away all the kittens! It seems that in our defeat, the dog left us a present. What do you want to do? 🙀", {  
                title: "GAME OVER!",
                buttons: {
                    quit: {
                    text: "Retry",
                    value: "quit",
                    className: "retry-btn"
                    },
                    finish: {
                    text: "Accept Prize? 🎁",
                    value: "finish",
                    className: "retry-btn"
                    }
                },
                })
                .then((value) => {
                switch (value) {
                    case "quit":
                    window.location.reload();         
                    break;

                    case "finish":
                    window.location = "https://youtu.be/gu3KzCWoons";         
                    break;
                
                    default:
                    swal("Let's Catch More Kittens!");
                }
            });
        }
        //updates game state and displays losing alert
        let updatedData = this.state.boardSettings;
        updatedData[x][y].isCat = false;
        updatedData[x][y].isRevealed = true;
        // Alert for when a player clicks on door to display empty square
        if (updatedData[x][y].isEmpty) {
            updatedData = this.revealEmpty(x, y, updatedData);
        }
        // Alert for when a player clicks on all the cats to display game won
        if (this.getHidden(updatedData).length === this.props.dogs) {
            win = true;
            this.revealBoard();
            swal("Yay, we found all the kittens! Now Ms. Crumblebottom can't yell at me. Here's a little thank you.", {  
                title: "GAME WON!",
                buttons: {
                    quit: {
                        text: "Quit Game",
                        value: "quit",
                        className: "retry-btn"
                    },
                    finish: {
                    text: "Accept Prize",
                    value: "finish",
                    className: "retry-btn"
                    }
                },
                })
                .then((value) => {
                switch (value) {
                    case "quit":
                    window.location.reload();         
                    break;

                    case "finish":
                    window.location = "https://youtu.be/QH2-TGUlwu4";         
                    break;
                
                    default:
                    swal("Let's Catch More Kittens!");
                }
            });
        }
        //updates game state and displays winning alert
        this.setState({
            boardSettings: updatedData,
            dogCount: this.props.dogs - this.getCats(updatedData).length,
            gameWon: win,
        });
    }

    //renders our final board to play the game on
    renderBoard(data) {
        //will map over Squares to return data items and event handlers for each square
        return data.map((datarow) => {
            return datarow.map((dataitem) => {
                return (
                <div key={dataitem.x * datarow.length + dataitem.y}>
                    <Square onClick={() => this.handleCellClick(dataitem.x, dataitem.y)} value={dataitem}/>
                    {(datarow[datarow.length - 1] === dataitem) ? <div className="clear" /> : ""}
                </div>);
            })
        });
    }

    // Component method to pass in predefined props
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
            this.setState({
                boardSettings: this.initBoardSettings(nextProps.height, nextProps.width, nextProps.dogs),
                gameWon: false,
                dogCount: nextProps.dogs,
            });
        }
    }

    // Complete Board rendering 
    render() {
        return (
            <div className="board">
                {this.renderBoard(this.state.boardSettings)}
            </div>
        );
    }
}