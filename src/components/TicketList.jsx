import React from 'react';
import Ticket from './Ticket';
import PropTypes from 'prop-types';


function TicketList(props){
  return(
    <div>
      <hr/>
      {Object.keys(props.ticketList).map((ticketId) => {
        let ticket = props.ticketList[ticketId];
        return <Ticket
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          formattedWaitTime={ticket.formattedWaitTime}
          currentRouterPath={props.currentRouterPath}
          key={ticket.id}
          ticketId={ticket.id} />;
      })}
    </div>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.object,
  currentRouterPath: PropTypes.string
};

export default TicketList;
