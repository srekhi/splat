export const selectAllPublicChannels = (state, userId) => {
  return state.channels.filter(channel => channel.private === false);
};
