//necessary packages for our game
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main';

//main React component
function App() {
  //initial state of our modal is true, so when the page loads it will pop up
  const [show, setShow] = useState(true);
  //will close the modal upon button click
  const handleClose = () => setShow(false);
  //will show our main modal, and render the game upon modal confirm
  return (
    <> 
    {/*renders the modal*/}
      <Modal show={show} onHide={handleClose} modalTransition={{ timeout: 2000 }} centered className="modal">
        <div className="modal-main">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title" >Oh No, I've Lost My Kitties!</Modal.Title>
        </Modal.Header >
        <Modal.Body className="modal-body" >
          <p>Can you please help me? I was petsitting Grumpy Ms. Crumblebottom's cats when a dog came in and chased them away. 
          </p> 
          <p> 
          I think they are scattered accross the apartment building, but we have to be careful of the dogs or else the cats will be gone forever! Please help me find them!
          </p>
          <div className="rules">
          <h5>Game Rules</h5>
          <ul>
            <li>The game works similar to dogsweeper.</li>
            <li>Click on an apartment door to find a kitty.</li>
            <li>Each door will either have a kitty or a doggo.</li>
            <li>Each game outcome will give you a prize.</li>
            <li>If you find a doggo, it's GAME OVER!</li>
            <li>If you find all fifteen kitties, you WIN!</li>
          </ul>
          </div>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={handleClose} className="btn modal-btn">
            Okay, Let's Find The Kittens
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
      {/*renders the game*/}
      <Main/>
    </>
  );
}

//exports it for use in other files
export default App;