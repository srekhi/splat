class NotificationChannel < ApplicationCable::Channel
  def subscribed
    channel_id = params[:channel_id]
    stream_from "new_channel_#{user_id}" #name of pubsub channel.
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def notify
  end
end
