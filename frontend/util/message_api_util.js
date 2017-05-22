export const createMessage = message => (
  $.ajax({
    method: 'POST',
    url: '/api/messages',
    data: { message }
  })
);

export const deleteMessage = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/messages/${id}`
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

export const updateMessage = message => (
  $.ajax({
    method: 'PATCH',
    url: `/api/messages/${message.id}`,
    data: { message }
  })
);
