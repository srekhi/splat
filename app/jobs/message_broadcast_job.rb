class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message, channel)
    message = Api::MessagesController.render(
      partial: 'api/messages/message',
      locals: { message: message }
    )
    ActionCable.server.broadcast("channel_#{channel.id}",
                                 message: JSON.parse(message))
  end

end
