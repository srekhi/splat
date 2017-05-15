# Component Hierarchy:

## Before log in: 
### SessionFormContainer: 
  - mapStateToProps(from state.session):
    + receives loggedIn: represents whether currentUser logged in
    + errors (array): list of errors from the state
    + formType (string): 'login' or 'signup' given the ownProps.location.pathname passed by Route component
  - mapDispatchToProps(dispatch, ownProps):
    + processForm: dispatches 'login' or 'signup' action creator depending on URL.
   - SessionForm:
      + state: governed by user form details.
      + props: processForm (invoke when user submits form), formType(used for displaying sign up/login on UI)

## After logging in:
 - Home Container
   - LeftNav:
     - Header Container:
       + mapStateToProps (from state.session):
          * receive currentUser name 
       + mapDispatchToProps
          * receive logout action creator 
       + Header:
          * props: username
          * display username 
          * display 'Spack'
          * render logout form (passing in logout action creator as props) 
          * Logout Form: 
            - props: receive logout 
            - renders button with onClick handler to logout.
      - ChannelListContainer:
        + mapStateToProps(from state.channels):
          * receives all channels for current user (use 'selectAllChannels' selector to get objects)
        + ChannelList (functional):
          * props: channel objects.
          * onClick pushes new link to URL for channel show page.  
    - MainChannelContainer
       - ChannelHeaderContainer
          - mapStateToProps
            + receive channel from state.channels[id] (id comes from URL params)
        - ChannelHeader
          + props: channel name 
          + props: count of users
       - ChannelMessagesContainer
         + mapStateToProps (from state.messages)
            * receive channel from state.channels[id] (id comes from URL params)
            * receive all messages for this channel (use selector selectAllMessages(channelId))
         + ChannelMessages
            * props: channel_messages 
            * ChannelMessageItem
              - props: channelMessage
       - NewMessageContainer
          + mapDispatchToProps
            * receive new message action creator 
         + NewMessage
            * props: newMessage action creator for onSubmit click handler.
     - NewChannelFormContainer
        + mapDispatchToProps
            * receive new channel action creator 
        + mapStateToProps
            * get all users from state (use selector selectAllUsers)
        + NewChannelForm
            * props: new channel action creator, users 
            * state: form inputs
    
## Routes

|Path   | Component   |
|-------|-------------|
| "/sign-up" | "SessionFormContainer" |
| "/log-in" | "SessionFormContainer" |
| "/home" | "HomeContainer" |
| "/channel/:channelId" | "MainChannelContainer" |
| "/new-channel" | "NewChannelFormContainer" |
| "/new-dm" | "NewChannelFormContainer" |

        
