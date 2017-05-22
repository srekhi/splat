export const login = user => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user }
  })
);

export const signup = user => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
);

export const fetchNotifications = (user_id) => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${user_id}/notifications`
  })
);

export const createNotification = (channel_id, user_id) => (
  $.ajax({
    method: 'POST',
    url: `/api/notifications/`,
    data: {channel_id: channel_id, user_id: user_id}
  })
);

export const removeNotifications = (channel_id) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/notifications/${channel_id}`,
    data: { channel_id }
  })
);
