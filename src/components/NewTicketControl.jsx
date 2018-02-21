import React from 'react';
import NewTicketForm from './NewTicketForm';
import ConfirmationQuestions from './ConfirmationQuestions';

class NewTicketControl extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      formVisibleOnPage: false
    };
    this.handleTroubleShootingConfirmation = this.handleTroubleShootingConfirmation.bind(this);
  }

  handleTroubleShootingConfirmation() {
    this.setState({formVisibleOnPage: true});
  }

  render(){
    let currentlyVisibleContent = null;
    if (this.state.formVisibleOnPage){
      currentlyVisibleContent = <NewTicketForm />;
    } else {
      currentlyVisibleContent = <ConfirmationQuestions
                                  onTroubleshootingConfirmation={this.handleTroubleShootingConfirmation}/>;
    }
    return(
      <div>
        {currentlyVisibleContent}
      </div>
    );
  }
}

export default NewTicketControl;
