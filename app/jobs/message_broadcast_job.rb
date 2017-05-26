class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message, channel, user)
    message = Api::MessagesController.render(
      partial: 'api/messages/message',
      locals: { message: message, channel_id: channel.id, user_id: user.id, user: user }
    )

    ActionCable.server.broadcast("channel_#{channel.id}",
                                 message: JSON.parse(message))
  end

end
