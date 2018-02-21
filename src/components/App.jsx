import React from 'react';
import Moment from 'moment';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Admin from './Admin';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Error404 from './Error404';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: null
    };
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
    // let newMasterTicketList = Object.assign({}, this.props.masterTicketList);
    // Object.keys(newMasterTicketList).forEach(ticketId => {
    //   newMasterTicketList[ticketId].formattedWaitTime = (newMasterTicketList[ticketId].timeOpen).fromNow(true);
    // });
    // this.setState({masterTicketList: newMasterTicketList});
  }

  handleChangingSelectedTicket(ticketId){
    this.setState({selectedTicket: ticketId});
  }

  render(){
    // console.table(this.props.masterTicketList);
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
          <Route exact path='/' render={()=> <TicketList ticketList={this.props.masterTicketList}/> } />
          <Route path='/newticket'render={()=><NewTicketControl />} />
          <Route
            path='/admin'
            render={(props)=>
              <Admin
                ticketList={this.props.masterTicketList}
                currentRouterPath={props.location.pathname}
                onTicketSelection={this.handleChangingSelectedTicket}
                selectedTicket={this.state.selectedTicket} />} />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    masterTicketList: state
  }
}

App.propTypes = {
  masterTicketList: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(App));
