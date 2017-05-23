class NotificationChannel < ApplicationCable::Channel
  def subscribed
    user_id = params[:user_id]
    stream_from "user_id_#{user_id}" #name of pubsub channel.
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def notify
  end
end
