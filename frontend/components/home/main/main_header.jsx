import React from 'react';

class MainHeader extends React.Component {
  //get the channel ID from the params.
  constructor(props){
    super(props);
    this.channel = this.props.channel;
  }

  render(){
    return (
      <header>
        {this.channel.name}
     </header>
  );
  }

}

export default MainHeader;
