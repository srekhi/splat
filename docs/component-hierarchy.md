Component Hierarchy:
====================
SessionFormContainer: 
---------------------
  --mapStateToProps(from state.session):
    - receives loggedIn: represents whether currentUser logged in
    - errors (array) - list of errors from the state
    - formType (string): 'login' or 'signup' given the ownProps.location.pathname passed by Route component.
  --mapDispatchToProps(dispatch, ownProps):
    -processForm: dispatches 'login' or 'signup' action creator depending on URL.
  Nested component:
    SessionForm:
      state: governed by user form details.
      props: processForm (invoke when user submits form), formType(used for displaying sign up/login on UI)
Main Logged In View
------------------
### LeftNav
    - ChannelList (
      - ChannelListItem
