class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.valid?
      @user.save
      login!(@user)
      Channel.where(private: false).each do |channel|
        Membership.create(user_id: @user.id, channel_id: channel.id)
      end
      IntroductionJob.perform_later(@user)
      # Notification.create()
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
