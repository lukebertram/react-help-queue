import React from 'react';
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

}

export default App;
