# == Schema Information
#
# Table name: channels
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  private    :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Channel < ApplicationRecord
  validates :name, presence: true
  has_many :memberships
  has_many :messages
  has_many :users, through: :memberships
  has_many :notifications


  after_commit :add_members_immediately


  def add_members_immediately
    # debugger
    # p "Add members channel creation"
    # users = self.users
    # users.each do |user|
    #   p user
    #   p "Add members channel creation"
    #   ChannelListBroadcastJob.perform_later(user, self)
    end
end
