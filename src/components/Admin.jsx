import React from 'react';
import PropTypes from 'prop-types';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';

function Admin(props){
  console.log(`Current Path: ${props.currentRouterPath}`);
  let optionalSelectedTicketContent = null;
  if (props.selectedTicket != null){
    optionalSelectedTicketContent = <TicketDetail selectedTicket={props.ticketList[props.selectedTicket]}/>;
  }
  return(
    <div>
      <h2>Admin</h2>
      {optionalSelectedTicketContent}
      <TicketList
        ticketList={props.ticketList}
        currentRouterPath={props.currentRouterPath}
        onTicketSelection={props.onTicketSelection} />
      <style jsx>{`
        div{
          padding: 10px;
        }
      `}</style>
    </div>
  );
}

Admin.propTypes = {
  ticketList: PropTypes.object,
  currentRouterPath: PropTypes.string.isRequired,
  onTicketSelection: PropTypes.func.isRequired,
  selectedTicket: PropTypes.string
};

export default Admin;
