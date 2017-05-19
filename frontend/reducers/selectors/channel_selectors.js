export const selectAllPublicChannels = (state) => {
  // let channels = Object.values(state.channels.channels);
  let channels = Object.keys(state.channels.channels).map(key => state.channels.channels[key]);
  return channels.filter(channel => channel.private === false);
};

export const selectChannelById = (state, channelId) => {
  return (state.channels.channels[channelId]);
};

export const selectAllPrivateChannels = (state) => {
  // let channels = Object.values(state.channels.channels);
  let channels = Object.keys(state.channels.channels).map(key => state.channels.channels[key]);
  return channels.filter(channel => channel.private === true);
};
