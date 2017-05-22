class Api::NotificationsController < ApplicationController

  def index
    user = User.find_by(id: params[:user_id])
    @notifications = user.notifications
    render 'api/notifications/index'
  end

  def create
    @notification = Notification.new(notification_params)
    if @notification.valid?
      @notification.save
      render 'api/notifications/show'
    else
      render json: @notification.errors.full_messages, status: 422
    end
  end

  def destroy
    @notification = Notification.find_by(id: params[:id])
    if @notification
      @notification.destroy
      render json: @notification.id
    else
      render(
        json: ["Notification not found"],
        status: 404
        )
    end
  end

  def notification_params
    params.require(:notification).permit(:user_id, :channel_id)
  end
end
