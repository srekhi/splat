export const selectAllPublicChannels = (state) => {
  let channels = Object.values(state.channels.channels);
  return channels.filter(channel => channel.private === false);
};

export const selectChannelById = (state, channelId) => {
  return (state.channels.channels[channelId]);
};
