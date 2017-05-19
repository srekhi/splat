class RoomChannel < ApplicationCable::Channel
  def subscribed
    channel_id = params[:channel_id]
    stream_from "channel_#{channel_id}" #name of pubsub channel.
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    # ActionCable.server.broadcast 'room_channel', message: data['message']
  end
end
