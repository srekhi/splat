class NotificationChannel < ApplicationCable::Channel
  def subscribed
    user_id = params[:user_id]
    stream_from "new_channel_#{user_id}" #name of pubsub channel.
  end
end
