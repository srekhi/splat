export const createMessage = message => (
  $.ajax({
    method: 'POST',
    url: '/api/messages',
    data: { message }
  })
);

export const fetchMessagesForChannel = channelId => (
  $.ajax({
    method: 'GET',
    url: `/api/channels/${channelId}/messages`,
  })
);

export const deleteChannel = (id) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/channels/${id}`
  })
);
