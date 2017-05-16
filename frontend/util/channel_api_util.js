export const createChannel = channel => (
  $.ajax({
    method: 'POST',
    url: '/api/channels',
    data: { channel }
  })
);

export const fetchChannelsForUser = userId => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/channels`,
  })
);

export const deleteChannel = (id) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/channels/${id}`
  })
);
