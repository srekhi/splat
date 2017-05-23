import React from 'react';
import { Link, withRouter }  from 'react-router-dom';
import { Redirect } from 'react-router';
class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    if (e.target.id === "login") {
      this.props.history.push("/login");
    } else if (e.target.id === "sign-up") {
      this.props.history.push("/signup");
    } else if (e.target.id === "demo") {
      let username;
      let password;
      // debugger;
      if (e.target.textContent === "Guest Login 1") {
        username = "drake";
        password = "password";
      } else{
        username = "50-cent";
        password = "password";
      }
      const user = {username, password};
      this.props.login(user);
      this.props.history.push("/");

    } else if (e.target.id === "splat-logo") {
      this.props.history.push("/");
    }
  }
  render(){
    return (
      <nav className="landing-page-nav">
        <section id="logo-container">
          <img id="splat-logo"
            src={"http://res.cloudinary.com/dbbzpmyvc/image/upload/c_scale,q_81,r_0,w_77/v1494891230/slack_zawidf.svg"}
            alt="Splat logo"
            onClick={this.handleClick} />
          <Link id="landing-page-logo-link" to="/">Splat</Link>
        </section>
        <section id="session-control-container">
          <button onClick={this.handleClick} id="demo">Guest Login 1</button>
          <button onClick={this.handleClick} id="demo">Guest Login 2</button>
          <button onClick={this.handleClick} id="login">Log in</button>
          <button onClick={this.handleClick} id="sign-up">Sign up</button>
        </section>
      </nav>
    );
  }
}

export default Navbar;
