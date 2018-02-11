import React from 'react';

function NewTicketForm(){
  let _names = null;
  let _location = null;
  let _issue = null;

  function handleNewTicketFormSubmission(event){
    event.preventDefault();
    console.log(_names.value);
    console.log(_location.value);
    console.log(_issue.value);
    _names.value = '';
    _location.value = '';
    _issue.value = '';
  }
  return (
    <div>
      <form onSubmit={handleNewTicketFormSubmission}>
        <input
          type='text'
          id='names'
          placeholder='Pair Names'
          ref={(input) => _names = input }/><br/>
        <input
          type='text'
          id='location'
          placeholder='Location'
          ref={(input) => _location = input }/><br/>
        <textarea
          id='issue'
          placeholder='Describe your issue.'
          ref={(input) => _issue = input }/><br/>
        <button type='submit'>Hoilp!</button>
      </form>
    </div>
  );
}

export default NewTicketForm;
