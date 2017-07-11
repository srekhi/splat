# Splat
[Live App](https://www.splat.work/)

Splat is a fullstack web application inspired by [Slack](https://slack.com/). It's built with React/Redux on the frontend and Ruby on Rails on the backend with a PostgreSQL datbase. This entire project was conceived, designed, and built within a ten-day period, but I look forward to revisiting and adding more features. 

# Features

## Live updates:
Most important part of any chat application is, of course, real-time updates. Using Action Cable, I designed Splat so that whenever a user authenticates, they're automatically subscribed to three channels:
  1) Live Chat (Cable 1)
      + Whenever a user selects a channel, React parses the URL and grabs the channel ID. Action Cable then subscribes the user to the channel that they're currently visiting. Any updates to this channel trigger an automatic re-render on the React/Redux front-end architecture without requiring the user to refresh the page. 
      
      ```javascript 
        class ChatList extends React.Component {
          constructor(props){
            super(props);
            this.scrollToBottom = this.scrollToBottom.bind(this);
            this.setSocket = this.setSocket.bind(this);
            this.addSocket = this.addSocket.bind(this);
            this.removeSocket = this.removeSocket.bind(this);
            this.toggleEmojiDisplay = this.toggleEmojiDisplay.bind(this);
          }

          componentWillMount(){
            const channelId = this.props.match.params.channelId;
            this.props.fetchMessages(channelId);
            this.props.deleteNotifications(channelId);
            setTimeout(() => {
              const channel = this.props.channel;
              this.setSocket(channelId);
            }, 100);
          }
          
          setSocket(channelId) {
            if (window.App.channel) {
              this.removeSocket();
            }
            this.addSocket(channelId);
           }
          
          removeSocket(){
            window.App.cable.subscriptions.remove(window.App.channel);
          }

          addSocket(channelId) {
            window.App.channel = window.App.cable.subscriptions.create({
              channel: 'RoomChannel',
              channel_id: channelId
            }, {
            connected: () => {},
            disconnected: () => {},
            received: (data) => {
              this.props.receiveMessage(data.message);
            }
          });
        }
      ```
  2) Notifications (Cable 2)
      + Whenever a user joins a channel, they're automatically subscribed to its feed. If they're not currently on the chat, they'll be notified of new messages in the left navigation bar. Notifications are not displayed for the channel that the user is visiting. This is accomplished by building an Action Cable subscription unique to the user's id whenever they load Splat's home page. When a new chat messsage is directed to the user, an after_commit callback is triggered in the message model to fire off a notification broadcast background job for each user in the channel. 
    <p align="center">
    <img src="/docs/notifications.png" />
    </p>
     ```ruby 
      class Message < ApplicationRecord
        validates :user_id, :channel_id, :content, presence: true
        belongs_to :user
        belongs_to :channel
        has_many :emoticons
        after_commit :broadcast_message

        def set_formatted_time
          self.chat_time = Time.now.localtime.strftime("%I:%M %p")
        end

        def broadcast_message
          message_author = self.user
          MessageBroadcastJob.perform_later(self, self.channel_id, message_author)
          NotificationBroadcastJob.perform_later(self.channel_id, message_author)
        end
      end 
      ```
      The broadcast logic is held in ActiveJobs in order to be performed asynchronously.
      ```ruby
      class NotificationBroadcastJob < ApplicationJob
        queue_as :low_priority

        def perform(channel_id, message_author)
          memberships = Membership.where(channel_id: channel_id)
          memberships.each do |membership|
            user_id = membership.user_id
            next if user_id == message_author.id
            notification = Notification.create(user_id: user_id, channel_id: channel_id)
            notification = Api::NotificationsController.render(
                partial: 'api/notifications/notification',
                locals: { notification: notification, user_id: user_id, channel_id: channel_id }
                )
            ActionCable.server.broadcast("new_channel_#{user_id}",
                notification: JSON.parse(notification))
            end
          end
       end 
       ```
      + This job handles both the creation of the notification in the backend server and the delivery of the notification data to the Redux state.
      + Whenever a user clicks on a channel to view the unread messages, an AJAX request fires from the frontend to remove those notifications from the database.
      ![Notification-removal](/docs/notif-delete.gif)
      
  3) Channel List (Cable 3)
      +  The last problem to be solved was the scenario where a user creates a new channel with another (either a direct message or creates a new public channel). The receiving user wouldn't receive that new channel in their channel list without a third Action Cable subscription. Architecturally, this is very similar to Cable 2. When a user visits the Splat home page, they are automatically subscribed to a ChannelList socket that is unique to the user's id. When a new channel is created, the ChannelList socket is triggered for each user in the new channel. React receives the broadcast from the socket, and dispatches the newly minted data to the frontend for display to the user. Below is the MessageBroadcast job that broadcasts new messages to all members of a channel:
      ```ruby
      class MessageBroadcastJob < ApplicationJob
        queue_as :default

        def perform(message, channel_id, user)
          message = Api::MessagesController.render(
            partial: 'api/messages/message',
            locals: { message: message, channel_id: channel_id, user_id: user.id, user: user }
          )
          ActionCable.server.broadcast("channel_#{channel_id}",
                                       message: JSON.parse(message))
        end
      end
     ```
## Giphys/Emojis
  Previous generations were inspired by art from da Vinci and Michaelangelo. In the millenial generation, we have a new, innovative kinds of artistic inspiration: giphys and emojis.
  ![Notification-removal](/docs/giphy-demo.gif)
  ![Emoji-menu](/docs/emoji-menu.png)
  
 By interacting with the [Giphy API](https://api.giphy.com/) the user can send Giphys when words can't quite capture their emotions (show giphy send video + adding of caption). This is architected in the front end by taking the search input from the user and firing an AJAX request to the giphy api with those query parameters. Redux holds a separate slice of state for the giphy API output, which then is displayed to the user in 40px by 40px boxes of happiness.
 ```javascript 
   giphysContainer(){ 
    const giphys = this.props.giphys.map((giphy, idx) =>
      <GiphyItem key={idx}
                 giphyUrl={giphy.images.fixed_height.url}
                 selectGiphy={this.selectGiphy}/>);
    return (
      <div id="giphys-container">
        <ul id="giphys-list">
          { giphys.slice(0,6) }
        </ul>
        <ul id="giphys-list">
          { giphys.slice(6,12) }
        </ul>
        <ul id="giphys-list">
          { giphys.slice(12,18) }
        </ul>
      </div>
    );
  }
  ```
  
  ```javascript
    export const fetchSearchGiphys = (searchTerm) => (
    $.ajax({
      method: 'GET',
      url: `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=18`
    })
  );
  ```
  
  Emojis work in a very similar way. Using React Emoji packages, the application fires an AJAX request when a user reacts to a message. The emoticon database table is simply a join table between messages and users. When a message renders to the user, it fetches the related reactions stored in the join table for display. 

```ruby
  class Emoticon < ApplicationRecord
    belongs_to :user
    belongs_to :message

    validates :user, :message, :icon, presence: true
    validates :icon, uniqueness: { scope: [:user_id, :message_id] }
  end
  
  export const addEmojiToMessage = emoticon => {
    return $.ajax({
      method: 'POST',
      url: `/api/emoticons`,
      data: {emoticon}
    });
  };
  ```
## DMs  
  Whenever you need to share juicy details with a friend, a public channel just won't do it. Luckily, Splat implements direct messaging so all that gossip doesn't have to go to waste.
  
  The direct message architecture is almost identical to the public channel architecture--in fact, they both come from the same model:
  ```ruby
    # Table name: channels
  #
  #  id         :integer          not null, primary key
  #  name       :string           not null
  #  private    :boolean          default(FALSE)
  #  created_at :datetime         not null
  #  updated_at :datetime         not null
 ```
The only difference is that direct message channels are flagged with a private:true booelan. When the user first loads Splat, all channels are loaded in, and the front end renders the direct messages in a separate section from the public channels depending on the channel's 'private' attribute.  You also don't have to worry about scrolling through all the users involved. Splat conveniently offers a filter bar so you can quickly find your friends to message.
  ![DM-demo](/docs/filter-demo.gif)

  ```javascript
      let filteredUsers = this.props.allUsers.filter(
        (user) => {
          return user.username.indexOf(this.state.allUsers) !== -1;
        }
      );
  ```

## Future Direction
Given that this project was completed from scratch in ten days, there were some features that were left off of the priority list. However, I plan to continually revisit and add more features. The below is non-exhaustive list of features I plan to implement:

  + Code snippets / file upload: My personal use of Slack involves heavy usage of these features, and it'd be a great addition to Splat's codebase.
  
  + Message Search: I find Slack's message search very useful for when I need to look up information about a select keyword. This search functionality will allow users to find older messages based on their search input.
