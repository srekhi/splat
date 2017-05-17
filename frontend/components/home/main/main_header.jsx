import React from 'react';

class MainHeader extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.fetchChannels(this.props.user.id);
  }

  render(){
    { if (this.props.channel === undefined) return <header></header>; }
    return (
      <header>
        {this.props.channel.name}
     </header>
  );
  }

}

export default MainHeader;
