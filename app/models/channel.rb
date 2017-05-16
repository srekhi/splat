class Channel < ApplicationRecord
  validates :name, uniqueness: true, presence: true
  
end
