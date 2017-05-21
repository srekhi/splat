# == Schema Information
#
# Table name: memberships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  channel_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Membership < ApplicationRecord
  validates :user_id, :channel_id, presence: true
  belongs_to :user
  belongs_to :channel

  # validates :id, uniqueness: { scope: [:user_id, :message_id] }

end
