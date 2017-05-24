class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  def perform(notification)
    # debugger THIS IS BEING HIT PROPERLY
    user_id = notification.user_id
    notification = Api::NotificationsController.render(
      partial: 'api/notifications/notification',
      locals: { notification: notification }
    )

    ActionCable.server.broadcast("new_channel_#{user_id}",
                                 notification: JSON.parse(notification))
  end

end
