class Api::ChannelsController < ApplicationController
  def index #grab the channels for a specific user
    user_id = current_user.id
    user = User.find_by(id: user_id)
    @channels = user.channels
    render "api/channels/index"
  end

  def show
    @channel = Channel.find_by(id: params[:id])
    @count = @channel.users.count
    render "api/channels/show"
  end

  def create
    #get the users from here and create memberships accordingly.
    @channel = Channel.new(channel_params)
    user_ids = params[:channel][:user_ids]
    if @channel.valid?
      @channel.save
      user_ids.each { |user_id| Membership.create(channel_id: @channel.id, user_id: user_id) }
      render "api/channels/show"
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel = Channel.find_by(id: params[:id])
    if @channel
      @channel.destroy
      render json: @channel.id
    else
      render(
        json: ["Channel not found"],
        status: 404
        )
    end

  end

  def channel_params
    params.require(:channel).permit(:name, :private)
  end
end
