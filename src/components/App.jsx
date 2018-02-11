import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';

function App(){
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
        <Route exact path='/' component={TicketList} />
        <Route path='/newticket' component={NewTicketControl} />

        <Route component={Error404} />
      </Switch>
    </div>
  );
}

export default App;
