class RoomChannel < ApplicationCable::Channel
  def subscribed
    debugger
    
    stream_from "room_channel" #name of pubsub channel.
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    ActionCable.server.broadcast 'room_channel', message: data['message']
  end
end
