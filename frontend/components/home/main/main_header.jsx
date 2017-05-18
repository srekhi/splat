import React from 'react';

class MainHeader extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.fetchChannels(this.props.user.id);
    
  }

  render(){
    // return <h1>Test</h1>;
    if (this.props.channel === undefined) return <header>Loading..</header>;
      return (
        <header>
          {this.props.channel.name}
        </header>
      );
  }

}

export default MainHeader;
