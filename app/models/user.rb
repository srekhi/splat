# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  avatar_url      :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :username, :email, :password_digest, :session_token, presence: true
  # TODO: Comment back in
  # validates :email, :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  has_many :memberships
  has_many :channels, through: :memberships

  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    u = User.find_by(username: username)
    return u if u && u.is_password?(password)
    nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save
  end
end
