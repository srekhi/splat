import React from 'react';

class GiphyItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <li id="giphy-item">
        <img src={this.props.giphyUrl}
             onClick={() => this.props.selectGiphy(this.props.giphyUrl)}/>
      </li>
    );
  }
}

export default GiphyItem;
