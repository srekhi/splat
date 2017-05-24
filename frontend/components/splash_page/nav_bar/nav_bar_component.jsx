import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { login, signup } from '../../../actions/session_actions';
import Navbar from './nav_bar';

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    signup: (user) => dispatch(signup(user))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Navbar));
