import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';


class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit() {
    event.preventDefault();
    const user = this.state;
    this.props.processForm(user);
  }

  clearState() {
    this.setState({username: "", password: ""});
  }

  demoLogin(event) {
    event.preventDefault();
    // this.clearState();
    const savedUsername = "Drake Graham";
    const savedPassword = "password";
    const user = {username: savedUsername, password: savedPassword};
    this.props.login(user);
    this.props.history.push('/');
    // this.setState({username: savedUsername, password: savedPassword},
    //   () => this.handleSubmit());
   }


  navLink() {
    //USE THIS IN NAV BAR
    if (this.props.formType === 'login') {
      return <Link to="/signup">sign up instead</Link>;
    } else {
      return <Link to="/login">log in instead</Link>;
    }
  }

  renderErrors() {
    let error_exclamation = "";
    if (this.props.errors.length > 0){
      error_exclamation = <i className="fa fa-exclamation" aria-hidden="true"></i>;
    }
    return(
      <section className="errors">
        <ul className="error-list">
          <li>{error_exclamation}</li>
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
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
            <p id="demo-login">Don't have an account? Try our <a onClick={this.demoLogin} href="">demo login!</a></p>
            {this.renderErrors()}
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
