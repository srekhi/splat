class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message, channel_id, user)
    message = Api::MessagesController.render(
      partial: 'api/messages/message',
      locals: { message: message, channel_id: channel_id, user_id: user.id, user: user }
    )

    ActionCable.server.broadcast("channel_#{channel_id}",
                                 message: JSON.parse(message))
  end

end
