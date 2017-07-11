class ChannelListBroadcastJob < ApplicationJob
  queue_as :default

  def perform(user, channel)
    channel = Api::ChannelsController.render(
      partial: 'api/channels/channel',
      locals: { channel: channel, users: channel.users, count: channel.users.length }
    )
    ActionCable.server.broadcast("message_list_#{user.id}",
                                 channel: JSON.parse(channel))
  end

end
