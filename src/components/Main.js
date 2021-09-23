import Game from './Game';
import React from 'react';

//We seperate the Main component from the App component so that our Game can be rendered seperately from the modal.
function Main() {
  return (
    <div className="Main">
        <Game/>
    </div>
  );
}

//exports for use in toher files
export default Main;
