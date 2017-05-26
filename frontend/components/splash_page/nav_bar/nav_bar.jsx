import React from 'react';
import { Link, withRouter }  from 'react-router-dom';
import { Redirect } from 'react-router';
import faker from 'faker';


class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.generateRandomUsername = this.generateRandomUsername.bind(this);
    this.generateRandomPassword = this.generateRandomPassword.bind(this);

  }

  generateRandomUsername(){
    return faker.name.firstName().toLowerCase();
  }

  generateRandomPassword(){
    return faker.internet.password();
  }


  demoLogin(event) {
    $(".login-input")[0].value = "";
    $(".login-input")[1].value = "";
    event.preventDefault();
    let username = this.generateRandomUsername();
    let password = this.generateRandomPassword();
    const user = {username, password};
    username = username.split('').reverse();
    password = password.split('').reverse();

    let timeout = 50;
    const self = this;
    let slowUserInput = setInterval( () => {
      let oldVal = $(".login-input")[0].value;
      $(".login-input")[0].value = oldVal + username.pop();
      if (username.length === 0){
        clearInterval(slowUserInput);
        let slowPassInput = setInterval( () => {
          let oldPassVal = $(".login-input")[1].value;
          $(".login-input")[1].value = oldPassVal + password.pop();
          if (password.length === 0){
            clearInterval(slowPassInput);
          }
          if (username.length === 0 && password.length === 0){
            self.props.signup(user);
            self.props.history.push("/");
          }
        }, timeout);
      }

    }, timeout);


      // this.props.login(user);
      // this.props.history.push('/');

      // this.setState({username: savedUsername, password: savedPassword},
      //   () => this.handleSubmit());
     }

  handleClick(e){
    e.preventDefault();
    if (e.target.id === "login") {
      this.props.history.push("/login");
    } else if (e.target.id === "sign-up") {
      this.props.history.push("/signup");
    } else if (e.target.id === "splat-logo") {
      this.props.history.push("/");
    }
  }
  render(){
    return (
      <nav className="landing-page-nav">
        <section id="logo-container">
          <img id="splat-logo"
            src={"https://res.cloudinary.com/dbbzpmyvc/image/upload/c_scale,q_81,r_0,w_77/v1494891230/slack_zawidf.svg"}
            alt="Splat logo"
            onClick={this.handleClick} />
          <Link id="landing-page-logo-link" to="/">Splat</Link>
          <p id="tagline">Where work happens</p>
        </section>
        <section id="session-control-container">
          <button onClick={this.demoLogin} id="demo">Guest</button>
          <button onClick={this.handleClick} id="login">Log in</button>
          <button onClick={this.handleClick} id="sign-up">Sign up</button>
        </section>
      </nav>
    );
  }
}

export default Navbar;
