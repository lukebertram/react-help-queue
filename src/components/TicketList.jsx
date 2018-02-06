import React from 'react';
import Ticket from './Ticket';

const masterTicketList = [
  {
    names: 'Thato and Haley',
    location: '3A',
    issue: 'Firebase literally on fire.'
  },
  {
    names: 'Jimbo and Kearney',
    location: 'Attitud Adjustment and Reprogramming Center',
    issue: 'Blood is lost'
  },
  {
    names: 'Dirty Charles and Cool Dennis',
    location: 'Mars Base 7',
    issue: 'Out of Sweet\'n\'Low'
  }
];

function TicketList(){
  return(
    <div>
      <hr/>
      {masterTicketList.map((ticket, index) =>
        <Ticket names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          key={index}/>
      )}
    </div>
  );
}

export default TicketList;
