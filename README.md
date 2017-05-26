# Splat
Live application link

Splat is a fullstack web application inspired by Slack [insert link here]. It's built with React/Redux on the frontend and Ruby/Rails on the backend with a Postgresql datbase. This entire project was designed and built within a ten-day period, but I look forward to revisiting in the near future.

# Features 
## Live updates:
Most important of any chat application is, of course, live chat. Using Action Cable, I designed Splat such that whenever a user joins a channel, they're automatically subscribed to its feed. If they're not currently on the chat, they'll be notified of new messages, and if they are currently on the chat, they'll receive new messages in real-time (without getting separate notifications in the left navigation bar). This was implemented with three separate Action Cable configurations:

- Live Chat (Cable 1):
  +  Whenever a user selects a channel, React parses the URL and grabs the channel ID. Action Cable then subscribes the user to the channel that they're currently visiting. Any updates to this channel trigger an automatic re-render on the React/Redux front-end architecture without requiring the user to refresh the page. 
  
- Notifications (Cable 2):
  +  If a user is having a conversation on one channel, they'll be notified in the left navigation bar which other notifications they have and how many unread messages they haven't seen. This is accomplished by building an Action Cable subscription unique to the user's id whenever they load Splat's home page. When a new chat messsage is directed to the user, an after_commit callback is triggered in the message model to fire off a notification broadcast background job for each user in the channel. This job handles both the creation of the notification in the backend server and the delivery of the notification data to the Redux state. 
  
- Channel List (Cable 3):
  + The last problem to be solved was the scenario where a user creates a new channel with another (either a direct message or creates a new public channel). The receiving user wouldn't receive that new channel in their channel list without a third Action Cable subscription. Architecturally, this is very similar to Notifications. When a user visits the Splat home page, they are automatically subscribed to a ChannelList socket that is unique to the user's id. When a new channel is created, the ChannelList socket is triggered for each user in the new channel. React receives the broadcast from the socket, and dispatches the newly minted data to the frontend for display to the user.

## Giphys




* ...
