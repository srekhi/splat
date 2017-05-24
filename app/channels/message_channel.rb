class MessageChannel < ApplicationCable::Channel
  def subscribed
    user_id = params[:user_id]
    stream_from "message_list_#{user_id}" #name of pubsub channel.
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def add_to_chat
  end
end
