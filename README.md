# Splat
Live application link

Splat is a fullstack web application inspired by Slack [insert link to actual slack here]. It's built with React/Redux on the frontend and Ruby on Rails on the backend with a Postgresql datbase. This entire project was conceived, designed, and built within a ten-day period, but I look forward to revisiting in the near future. Other technologies and libraries involved:
PostgreSQL
jQuery
Heroku
BCrypt
Figaro
Paperclip
jBuilder
react-modal
react-alert
emoji-mart
react-tooltip

# Features 
## Live updates:
Most important part of any chat application is, of course, live feeds. Using Action Cable, I designed Splat so that whenever a user authenticates, they're automatically subscribed to three channels:
  1) Live Chat (Cable 1)
      + Whenever a user selects a channel, React parses the URL and grabs the channel ID. Action Cable then subscribes the user to the channel that they're currently visiting. Any updates to this channel trigger an automatic re-render on the React/Redux front-end architecture without requiring the user to refresh the page. 
  2) Notifications (Cable 2)
      + Whenever a user joins a channel, they're automatically subscribed to its feed. If they're not currently on the chat, they'll be notified of new messages in the left navigation bar (insert video here). Notifications are not displayed for the channel that the user is visiting. This is accomplished by building an Action Cable subscription unique to the user's id whenever they load Splat's home page. [show the socket code here]. When a new chat messsage is directed to the user, an after_commit callback is triggered in the message model to fire off a notification broadcast background job for each user in the channel. This job handles both the creation of the notification in the backend server and the delivery of the notification data to the Redux state. [show model code + related jobs].
      + Whenever a user clicks on a channel to view the unread messages, an AJAX request fires from the frontend to remove those notifications from the database [insert code snippets and video sample showing this happening live]
  3) Channel List (Cable 3)
      +  The last problem to be solved was the scenario where a user creates a new channel with another (either a direct message or creates a new public channel). The receiving user wouldn't receive that new channel in their channel list without a third Action Cable subscription. Architecturally, this is very similar to Cable 2. When a user visits the Splat home page, they are automatically subscribed to a ChannelList socket that is unique to the user's id. When a new channel is created, the ChannelList socket is triggered for each user in the new channel. React receives the broadcast from the socket, and dispatches the newly minted data to the frontend for display to the user.
      
## Giphys/Emojis
  Previous generations were inspired by art from Da Vinci and Michaelangelo. In the millenial generation, we have a new, innovative kinds of artistic inspiration: giphys and emojis. By interacting with the Giphy API [link https://api.giphy.com/] the user can send Giphys when words can't quite capture their emotions (show giphy send video + adding of caption). This is architected in the front end by taking the search input from the user and firing an AJAX request to the giphy api with those query parameters. Redux holds a separate slice of state for the giphy API output, which then is displayed to the user in 40px by 40px boxes of happiness. (related code samples).

  Emojis work in a very similar way. Using React Emoji packages, the application fires an AJAX request when a user reacts to a message. The emoticon database table is simply a join table between messages and users. When a message renders to the user, it fetches the related reactions stored in the join table for display. 


* ...
