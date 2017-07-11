class MessageChannel < ApplicationCable::Channel
  def subscribed
    user_id = params[:user_id]
    stream_from "message_list_#{user_id}" #name of pubsub channel.
  end
end
