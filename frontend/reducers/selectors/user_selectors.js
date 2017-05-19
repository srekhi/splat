export const selectAllUsers = (state) => {
  // return Object.values(state.users);
  return Object.keys(state.users).map(key => state.users[key]);
};
