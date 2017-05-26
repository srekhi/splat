# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  channel_id :integer          not null
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  chat_time  :string
#

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
    # users.each do |user|
      # NotificationBroadcastJob.perform_later()
    #   next if user.id == message_author.id
    #   notification = Notification.create(user_id: user.id, channel_id: channel.id)
    #   user_id = user.id
    #   notification = Api::NotificationsController.render(
    #       partial: 'api/notifications/notification',
    #       locals: { notification: notification, user_id: user_id, channel_id: channel.id }
    #       )
    #   ActionCable.server.broadcast("new_channel_#{user_id}",
    #       notification: JSON.parse(notification))
    #   end
    # NotificationBroadcastJob.perform_later(channel, user)
  # end
end
