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
    this.addGiphy = this.addGiphy.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(e){
    e.preventDefault();
    if (e.target.id !== "giphys-container" && e.target.id !== "giphy-form" && e.target.id !== "search-giphy-box") {
      this.props.toggleGiphySearch();
    }
  }

  componentDidMount() {
    this.props.fetchSearchGiphys('');

    document.addEventListener("click", this.handleClick);
  }

  componentWillUnmount(){
    document.removeEventListener("click", this.handleClick);
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

  addGiphy(giphy){
    $("message-content-input").val(giphy);
  }

  selectGiphy(giphy){
    // this.props.addGiphy(giphy);
    this.props.addGiphy(giphy);
    this.props.toggleGiphySearch();
  }

  giphysContainer(){ //box around the resulting gifs.
    const giphys = this.props.giphys.map((giphy, idx) =>
      <GiphyItem key={idx}
                 giphyUrl={giphy.images.fixed_height.url}
                 selectGiphy={this.selectGiphy}/>);
    return (
      <div id="giphys-container">
        <ul id="giphys-list">
          { giphys.slice(0,6) }
        </ul>
        <ul id="giphys-list">
          { giphys.slice(6,12) }
        </ul>
        <ul id="giphys-list">
          { giphys.slice(12,18) }
        </ul>
      </div>
    );
  }

  displayGiphysSearchBox(){
    return (
      <form id="giphy-form" onSubmit={this.handleSubmit}>
        <img
          src="http://res.cloudinary.com/dbbzpmyvc/image/upload/c_scale,w_112/v1495559212/Screen_Shot_2017-05-23_at_10.06.34_AM_yunwdx.png" />
        {this.giphysContainer()}
        <input type="text"
          id="search-giphy-box"
          onChange={this.handleChange}
          value={this.state.searchTerm}
          placeholder="Search for giphys"
          />
      </form>
    );
  }
  render() {
    let giphys = this.props.giphys;

    return (
      <div>
        {this.displayGiphysSearchBox()}
      </div>
    );
  }
}

export default GiphysSearch;
