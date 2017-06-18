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
end
