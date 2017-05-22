import React from 'react';
import GiphyItem from './giphys_item';

class GiphysSearch extends React.Component {
  constructor() {
    super();
    this.state = { searchTerm: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.giphysContainer = this.giphysContainer.bind(this);
    this.displayGiphysSearchBox = this.displayGiphysSearchBox.bind(this);
    this.selectGiphy = this.selectGiphy.bind(this);
  }

  componentDidMount() {
    this.props.fetchSearchGiphys('');
  }

  handleChange(e) {
    this.setState({ searchTerm: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let searchTerm = this.state.searchTerm.split(' ').join('+');
    this.props.fetchSearchGiphys(searchTerm).then(() => {
    });
  }

  selectGiphy(giphy){
    this.props.addGiphy(giphy);
    this.props.toggleGiphySearch();
  }

  giphysContainer(){ //box around the resulting gifs.
    const giphys = this.props.giphys.map((giphy, idx) =>
      <GiphyItem key={idx}
                 giphyUrl={giphy.images.fixed_height.url}
                 selectGiphy={this.selectGiphy}/>);
    return (
      <div>
        {giphys}
      </div>
    );
  }

  displayGiphysSearchBox(){
    return (
      <form onSubmit={this.handleSubmit}>
        <img
          src="http://res.cloudinary.com/dbbzpmyvc/image/upload/c_scale,w_112/v1495334300/Screen_Shot_2017-05-20_at_7.38.01_PM_hqseiu.png" />
        <input type="text"
          onChange={this.handleChange}
          value={this.state.searchTerm}
          placeholder="Search for giphys"
          />
        {this.giphysContainer()}
      </form>
    );
  }
  render() {
    let giphys = this.props.giphys;

    return (
      <div>
        <form>
          <input value={this.state.searchTerm} onChange={this.handleChange} />
          <button type="submit" onClick={this.handleSubmit}>Search Giphy</button>
        </form>
        {this.displayGiphysSearchBox()}
      </div>
    );
  }
}

export default GiphysSearch;
