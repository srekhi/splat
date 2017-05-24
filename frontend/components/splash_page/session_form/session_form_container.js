import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { login, logout, signup, clearErrors } from '../../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, { match }) => ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.session.errors,
});

const mapDispatchToProps = (dispatch, { location }) => {
  const formType = location.pathname.slice(1);

  const processForm = (formType === 'login') ? login : signup;
  return {
    processForm: user => dispatch(processForm(user)),
    formType,
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
    signup: (user) => dispatch(signup(user))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));
