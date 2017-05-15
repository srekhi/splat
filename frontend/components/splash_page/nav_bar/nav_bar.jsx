import React from 'react';
import { Link }  from 'react-router-dom';
import { Redirect } from 'react-router-dom';
class Navbar extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    if (e.target.id === "login") {
      <Redirect to="/login" />;
    } else if (e.target.id === "sign-up") {
      <Redirect to="/signup" />;
    } else if (e.target.id === "demo") {
      //handle demo logic here.
    }
  }
  render(){
    return (
      <nav className="landing-page-nav">
        <section>
          <li id="landing-page-logo"><Link to="/"></Link></li>
        </section>
        <section id="session-control-container">
          <button onClick={this.handleClick} id="login">Log in</button>
          <button onClick={this.handleClick} id="sign-up">Sign up</button>
          <button onClick={this.handleClick} id="demo">Demo</button>
        </section>
      </nav>
    );
  }
}

export default Navbar;
