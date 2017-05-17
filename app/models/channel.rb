# == Schema Information
#
# Table name: channels
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  private    :boolean          default("false")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Channel < ApplicationRecord
  validates :name, uniqueness: true, presence: true
  has_many :memberships
  has_many :messages
  has_many :users, through: :memberships
end
