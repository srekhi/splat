class RoomChannel < ApplicationCable::Channel
  def subscribed
    channel_id = params[:channel_id] # note for Jake: this can be done in a one-liner
    stream_from "channel_#{channel_id}" #name of pubsub channel.
  end
end
