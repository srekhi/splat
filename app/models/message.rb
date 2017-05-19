# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  channel_id :integer          not null
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Message < ApplicationRecord
  # need to add an after create hook so that when message is created, it is
  # sent to the appropriate subscriberes.
  after_create_commit { MessageBroadcastJob.perform_later(self, self.channel) }
  validates :user, :channel, :content, presence: true
  belongs_to :user
  belongs_to :channel

end
