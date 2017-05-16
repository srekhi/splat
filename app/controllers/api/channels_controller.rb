class Api::ChannelsController < ApplicationController
  def index #grab the channels for a specific user
    user_id = params[:user_id]
    user = User.find_by(id: user_id)
    @channels = user.channels
    render "api/channels/index"
  end

  def create
    @channel = Channel.new(channel_params)
    if @channel.valid?
      @channel.save
      render "api/channels/show"
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel = Channel.find_by(id: params[:id])
    if @channel
      @channel.destroy
      render json: {}
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
