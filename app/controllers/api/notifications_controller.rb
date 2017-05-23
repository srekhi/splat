class Api::NotificationsController < ApplicationController

  def index
    user = User.find_by(id: params[:user_id])
    @notifications = user.notifications
    render 'api/notifications/index'
  end

  def create
    channel_id = params[:channel_id]
    user_id = params[:user_id]
    @notification = Notification.new
    @notification.user_id = user_id
    @notification.channel_id = channel_id
    if @notification.valid?
      @notification.save
      render 'api/notifications/show'
    else
      render json: @notification.errors.full_messages, status: 422
    end
  end

  def destroy
    # /here I need to get rid of all notifications on this channel that belong to current user
    current_user_id = current_user.id
    channel_id = params[:channel_id]
    @notifications = Notification.where(user_id: current_user_id).where(channel_id: channel_id)
    if @notifications
      @notifications.each { |notification| notification.destroy }
      render json: @notifications
    else
      render(
        json: ["Notifications not found"],
        status: 404
        )
    end
  end

  def notification_params
    params.require(:notification).permit(:user_id, :channel_id)
  end
end
