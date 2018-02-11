import React from 'react';
import PropTypes from 'prop-types';

//I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tanhauser Gate. All those moments will be lost in time, like tears in rain. Time to die.
function ConfirmationQuestions(props){
  return (
    <div>
      <p>Have you seen things we people wouldn't believe?</p>
      <button onClick={props.onTroubleshootingConfirmation}>Yes</button>
    </div>
  );
}

ConfirmationQuestions.propTypes = {
  onTroubleshootingConfirmation: PropTypes.func
}

export default ConfirmationQuestions;
