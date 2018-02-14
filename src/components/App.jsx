import React from 'react';
import Moment from 'moment';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: []
    };
    this.handleAddNewTicketToList = this.handleAddNewTicketToList.bind(this);
  }

  handleAddNewTicketToList(newTicket){
    const newMasterTicketList = this.state.masterTicketList.slice();
    newTicket.formattedWaitTime = (newTicket.timeOpen).fromNow(true);
    newMasterTicketList.push(newTicket);
    this.setState({masterTicketList: newMasterTicketList});
  }

  render(){
    return (
      <div>
        <style jsx global>{`
          html, body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `}</style>
        <Header/>
        <Switch>
          <Route exact path='/' render={()=> <TicketList ticketList={this.state.masterTicketList}/> } />
          <Route path='/newticket'render={()=><NewTicketControl onNewTicketCreation={this.handleAddNewTicketToList} />} />
          <Route component={Error404} />
        </Switch>
      </div>
    );
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
    console.log("check 1, 2");
    let newMasterTicketList = this.state.masterTicketList.slice();
    newMasterTicketList.forEach((ticket) =>
      ticket.formattedWaitTime = (ticket.timeOpen).fromNow(true)
    );
    this.setState({masterTicketList: newMasterTicketList})
  }

}

export default App;
