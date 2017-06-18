class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.valid?
      @user.save
      login!(@user)
      Channel.where(private: false).each do |channel|
        Membership.create(user_id: @user.id, channel_id: channel.id)
      end
      # Notification.create()
      # IntroductionJob.perform_later(@user)
      intro_dm = Channel.create(name: "dm", private: true)
      sunny = User.find_by(username: "sunny")
      Membership.create(user_id: @user.id, channel_id: intro_dm.id)
      Membership.create(user_id: sunny.id, channel_id: intro_dm.id)
      Message.create(user_id: sunny.id, channel_id: intro_dm.id, content: "Hi, I'm Sunny! Welcome to Splat!")

      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    @users = User.all
    render "api/users/index"
  end
end
