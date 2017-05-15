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
          * props: username, logout action creator
          * display username 
          * display 'Spack'
          * logout button 
      - ChannelListContainer:
        + mapStateToProps(from state.channels):
          * receives all public channels for current user (use 'selectAllPublicChannels' selector to get channels)
        + ChannelList:
          * props: channel objects.
            - ChannelListItem
              + props: channel
              * onClick pushes new link to URL for channel show page.
      - DirectMessagesListContainer:
        + mapStateToProps(from state.channels):
          * receives all private channels for current user (use 'selectAllPrivateChannels' selector to get direct messages)
            - DirectMessagesList 
              + props: direct messages 
                * DirectMessageComponent
                  - props: direct message 
    - MainChannelContainer
       - ChannelHeaderContainer
          - mapStateToProps
            + receive channel from state.channels[id] (id comes from URL params)
        - ChannelHeader
          + props: channel name 
          + props: count of users
       - ChannelMessagesContainer
         + mapStateToProps (from state.messages + state.users)
            * receive channel from state.channels[id] (id comes from URL params)
            * receive all messages for this channel (use selector selectAllMessages(channelId)) 
         + ChannelMessages
            * props: channel_messages 
            * ChannelMessageItemContainer 
              - ownProps = channelMessage
              - mapStateToProps(from state.users):
                + grab user associated with this message 
                  *  ChannelMessageItem
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

        
