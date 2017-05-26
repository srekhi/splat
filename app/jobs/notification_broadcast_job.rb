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
