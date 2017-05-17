export const selectAllPublicChannels = (state) => {
  let channels = Object.values(state.channels.channels);
  return channels.filter(channel => channel.private === false);
};
