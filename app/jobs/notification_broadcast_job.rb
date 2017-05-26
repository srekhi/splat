class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  def perform(channel, message_author)
    # debugger THIS IS BEING HIT PROPERLY
    users = channel.users
    # debugger
    channel_id = channel.id
    users.each do |user|
      next if user.id == message_author.id
      notification = Notification.create(user_id: user.id, channel_id: channel_id)
      user_id = user.id
      notification = Api::NotificationsController.render(
          partial: 'api/notifications/notification',
          locals: { notification: notification, user_id: user_id, channel_id: channel_id }
          )
      ActionCable.server.broadcast("new_channel_#{user_id}",
          notification: JSON.parse(notification))
      end
  end

end
