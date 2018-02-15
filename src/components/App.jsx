import React from 'react';
import Moment from 'moment';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Admin from './Admin';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: {},
      selectedTicket: null
    };
    this.handleAddNewTicketToList = this.handleAddNewTicketToList.bind(this);
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this);
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
      60000
    );
  }

  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime() {
    let newMasterTicketList = Object.assign({}, this.state.masterTicketList);
    Object.keys(newMasterTicketList).forEach(ticketId => {
      newMasterTicketList[ticketId].formattedWaitTime = (newMasterTicketList[ticketId].timeOpen).fromNow(true);
    });
    this.setState({masterTicketList: newMasterTicketList});
  }

  handleAddNewTicketToList(newTicket){
    const newMasterTicketList = Object.assign({}, this.state.masterTicketList,
      {[newTicket.id]: newTicket
    });
    newMasterTicketList[newTicket.id].formattedWaitTime = newMasterTicketList[newTicket.id].timeOpen.fromNow(true);
    this.setState({masterTicketList: newMasterTicketList});
  }

  handleChangingSelectedTicket(ticketId){
    this.setState({selectedTicket: ticketId});
  }

  render(){
    return (
      <div>
        <style jsx global>{`
          html, body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Helvetica, Arial, sans-serif;
          }
          a{
            text-decoration: none;
          }
        `}</style>
        <Header/>
        <Switch>
          <Route exact path='/' render={()=> <TicketList ticketList={this.state.masterTicketList}/> } />
          <Route path='/newticket'render={()=><NewTicketControl onNewTicketCreation={this.handleAddNewTicketToList} />} />
          <Route
            path='/admin'
            render={(props)=>
              <Admin
                ticketList={this.state.masterTicketList}
                currentRouterPath={props.location.pathname}
                onTicketSelection={this.handleChangingSelectedTicket}
                selectedTicket={this.state.selectedTicket} />} />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }

}

export default App;
