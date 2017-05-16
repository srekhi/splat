import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { login } from '../../../actions/session_actions';
import Navbar from './nav_bar';

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Navbar));
