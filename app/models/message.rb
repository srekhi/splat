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
  # need to add an after create hook so that when message is created, it is
  # sent to the appropriate subscriberes.
  after_commit :broadcast_message
  # after_initialize :set_formatted_time
  # after_commit { MessageBroadcastJob.perform_later(self, self.channel) }
  validates :user, :channel, :content, presence: true
  belongs_to :user
  belongs_to :channel
  has_many :emoticons
  #
  # def format_created_at
  #   self.created_at = self.created_at.localtime.strftime("%I:%M %p")
  # end

  def set_formatted_time
    self.chat_time = Time.now.localtime.strftime("%I:%M %p")
  end

  def broadcast_message
    MessageBroadcastJob.perform_later(self, self.channel
    )
    # also need to create the corresponding notiication and broadcast it.
    channel = self.channel
    users = channel.users
    users.each do |user|
      next if user.id === self.user.id
      notif = Notification.create(user_id: user.id, channel_id: self.channel.id)
      NotificationBroadcastJob.perform_later(notif)
    end

  end
end
