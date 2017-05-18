import React from 'react';
class NewMessageForm extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
      return (
        <div className="new-message-input">
        <input
           id="message-content-input"
           type="text"
           placeholder={`Message channel`}
            />
        </div>
    );

    }

}

export default NewMessageForm;
