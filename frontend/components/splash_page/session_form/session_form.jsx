import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import faker from 'faker';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      modalOpen: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
    this.generateRandomUsername = this.generateRandomUsername.bind(this);
    this.generateRandomPassword = this.generateRandomPassword.bind(this);
}
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;
    this.props.processForm(user);
  }

  clearState() {
    this.setState({username: "", password: ""});
  }

  generateRandomUsername(){
    let max = 3;
    let min = 0;
    let fakeNames = [faker.name.firstName().toLowerCase(), faker.name.lastName().toLowerCase(), faker.internet.userName().toLowerCase().slice(0,6)];
    let randomIndex = Math.floor(Math.random() * (max - min)) + min;
    return fakeNames[randomIndex];
  }

  generateRandomPassword(){
    return faker.internet.password();
  }

  demoLogin(event) {
    event.preventDefault();
    // this.clearState();

    // const savedUsername = "drake";
    // const savedPassword = "password";
    // const user = {username: savedUsername, password: savedPassword};
    this.clearState();
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
            self.props.signup(user).then(()=> self.props.history.push("/"));
          }
        }, timeout);
      }

    }, timeout);

   }


  navLink() {
    //USE THIS IN NAV BAR
    if (this.props.formType === 'login') {
      return (<span>
        Dont have an account?  <Link to="/signup">Sign up</Link>
    </span>);
    } else {
      return (<span>
        Already have an account?
        <Link to="/login">  Log in</Link>
      </span>);
    }
  }

  renderErrors() {
    let error_exclamation = "";
    if (this.props.errors.length > 0){
      error_exclamation = <i id="splash-page-error-fa" className="fa fa-exclamation" aria-hidden="true"></i>;
    }
    return(
      <section className="errors">
        <ul className="error-list">
          <li>{error_exclamation}</li>
          {this.props.errors.map((error, i) => (
            <li id="db-error-splash" key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  render() {
    let capitalizedFormType = this.props.formType.charAt(0).toUpperCase() + this.props.formType.slice(1);
    if (capitalizedFormType === "Signup") capitalizedFormType = "Sign up";
    return (
        <div id="login-window">
          <form className="session-form" onSubmit={this.handleSubmit}>
            <h1> {capitalizedFormType} </h1>
            <p>Enter your <b>username</b> and <b>password</b></p>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
              />
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
              <button className="login-button" type="submit" value="Submit">{capitalizedFormType}</button>
              <p id="demo-login">{this.navLink()} or continue with a <a onClick={this.demoLogin} href="">guest login!</a></p>
              {this.renderErrors()}
          </form>
        </div>
    );
  }
}

export default withRouter(SessionForm);
